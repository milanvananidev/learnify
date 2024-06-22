import CourseModel from '../models/course.js';
import NotificationModel from '../models/notification.js';
import { createCourse } from '../services/course.js';
import ErrorHandler from '../utils/error.js';
import { v2 as cloudinary } from 'cloudinary';
import { redis } from '../utils/redis.js';
import mongoose from 'mongoose';

export const uploadCourse = async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if (thumbnail) {
            const cloud = await cloudinary.uploader.upload(thumbnail, {
                folder: 'courses'
            });

            data.thumbnail = {
                public_id: cloud.public_id,
                url: cloud.secure_url
            }
        }

        createCourse(data, res);
    } catch (error) {
        return next(new ErrorHandler('Internal server error', 500))
    }
};

export const editCourse = async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if (thumbnail) {
            await cloudinary.uploader.destroy(thumbnail.public_id);

            const cloud = await cloudinary.uploader.upload(thumbnail, {
                folder: 'courses'
            });

            data.thumbnail = {
                public_id: cloud.public_id,
                url: cloud.secure_url
            }
        }

        const courseID = req.params.id;

        const course = await CourseModel.findByIdAndUpdate(courseID, {
            $set: data,
        }, { new: true });

        res.status(200).json({
            success: true,
            course
        })

    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
};

export const getSingleCourse = async (req, res, next) => {
    try {

        const courseID = req.params.id;

        const cachedData = await redis.get(courseID);

        if (cachedData) {
            const course = JSON.parse(cachedData);
            return res.status(200).json({
                success: true,
                course
            })
        }

        const course = await CourseModel.findById(courseID).select("-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.link");

        redis.set(courseID, JSON.stringify(course));

        res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}

export const getAllCourses = async (req, res, next) => {
    try {
        const cachedData = await redis.get('allCourses');

        if (cachedData) {
            const courses = JSON.parse(cachedData);
            return res.status(200).json({
                success: true,
                courses
            })
        }

        const courses = await CourseModel.find({}).select("-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.link");

        redis.set('allCourses', JSON.stringify(courses))

        res.status(200).json({
            success: true,
            courses
        });
    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}

// only for purchased users
export const getCourseContent = async (req, res, next) => {
    try {
        const userCourses = req.user?.courses;
        const courseID = req.params.id;

        const courseExits = userCourses.find((course) => course._id.toString() === courseID);

        if (!courseExits) {
            return next(new ErrorHandler("You are not eligible to acces this course", 400));
        }

        const course = await CourseModel.findById(courseID);

        const content = course.courseData;

        res.status(200).json({
            success: true,
            content
        })

    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}

export const addQuestion = async (req, res, next) => {
    try {
        const { question, courseID, contentID } = req.body;

        const course = await CourseModel.findById(courseID)

        if (!mongoose.Types.ObjectId.isValid(contentID)) {
            return next(new ErrorHandler("Invalid contnet ID"))
        }

        const courseContent = course?.courseData?.find((item) => item._id.equals(contentID));

        if (!courseContent) {
            return next(new ErrorHandler("Invalid contnet ID"))
        }

        // create a question

        const newQuestion = {
            user: req.user,
            question,
            questionReplies: []
        };

        courseContent.questions.push(newQuestion);

        await NotificationModel.create({
            user: req.user._id,
            title: 'New Question',
            message: `You have a new question in ${courseContent.title}`
        })

        await course?.save();

        res.status(200).json({
            success: true,
            course
        })

    } catch (err) {
        next(new ErrorHandler("Internal server error", 500))
    }
};

export const addReply = async (req, res, next) => {
    try {
        const { answer, courseID, contentID, questionID } = req.body;

        const course = await CourseModel.findById(courseID)

        if (!mongoose.Types.ObjectId.isValid(contentID)) {
            return next(new ErrorHandler("Invalid contnet ID", 400))
        }

        const courseContent = course?.courseData?.find((item) => item._id.equals(contentID));

        if (!courseContent) {
            return next(new ErrorHandler("Invalid contnet ID", 400))
        }

        const question = courseContent?.questions?.find((item) => item._id.equals(questionID));

        if (!question) {
            return next(new ErrorHandler("Invalid question ID", 400))
        }

        const newAns = {
            user: req.user,
            answer
        }

        question.questionReplies.push(newAns);

        // if user reply
        if (req.user._id === question.user._id) {
            await NotificationModel.create({
                user: req.user._id,
                title: 'New Question Reply',
                message: `You have a new question reply in ${courseContent.title}`
            })
        } else {
            // send notification or email to user if anyone reply in their question 
        }

        await course?.save();

        res.status(200).json({
            success: true,
            course
        })

    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}

export const addReview = async (req, res, next) => {
    try {
        const userCourseList = req.user.courses;
        const courseID = req.params.id;

        const courseExist = userCourseList?.some((course) => course._id.toString() === courseID);

        if (!courseExist) {
            next(new ErrorHandler("Not eligible", 400))
        }

        const course = await CourseModel.findById(courseID);

        const { review, rating } = req.body;

        const newReview = {
            user: req.user,
            comment: review,
            rating
        }

        course.reviews.push(newReview);

        await course?.save();

        let avg = 0;

        course.reviews.map((rev) => {
            avg += rev.rating
        });

        course.ratings = avg / course.reviews.length;

        course.save();

        const notification = {
            title: "New review recived",
            message: `${req.user?.firstName + ' ' + req.user.lastName} has given review on ${course.name}`
        }

        res.status(200).json({
            success: true,
            course
        })

    } catch (error) {
        console.log(error)
        next(new ErrorHandler("Internal server error", 500))
    }
}