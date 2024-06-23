import { Router } from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js'
import { addQuestion, addReply, addReview, deleteCourse, editCourse, getAllCourses, getCourseContent, getCourses, getSingleCourse, uploadCourse } from '../controllers/course.js';

const router = Router();

router.post('/create', isAuthenticated, authorizeRoles("admin"), uploadCourse);
router.put('/edit/:id', isAuthenticated, authorizeRoles("admin"), editCourse);
router.get('/all', getAllCourses);
router.get('/content/:id', isAuthenticated, getCourseContent);
router.post('/question', isAuthenticated, addQuestion);
router.post('/answer', isAuthenticated, addReply);

// Admin Routes
router.get('/all-admin', isAuthenticated, authorizeRoles("admin"), getCourses);
router.delete('/:id', isAuthenticated, authorizeRoles("admin"), deleteCourse);

// For dynamic value
router.post('/review/:id', isAuthenticated, addReview);
router.get('/:id', getSingleCourse);

export default router;