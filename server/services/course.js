import CourseModel from '../models/course.js';
import ErrorHandler from '../utils/error.js';

export const createCourse = async (data, res) => {
    try {
        const course = await CourseModel.create(data);
        res.status(201).json({
            success: true,
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}