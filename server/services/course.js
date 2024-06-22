import CourseModel from '../models/course.js';

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