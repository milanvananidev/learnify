import { Router } from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js'
import { addQuestion, addReply, addReview, editCourse, getAllCourses, getCourseContent, getSingleCourse, uploadCourse } from '../controllers/course.js';

const router = Router();

router.post('/create', isAuthenticated, authorizeRoles("admin"), uploadCourse);
router.put('/edit/:id', isAuthenticated, authorizeRoles("admin"), editCourse);
router.get('/all', getAllCourses);
router.get('/content/:id', isAuthenticated, getCourseContent);
router.post('/question', isAuthenticated, addQuestion);
router.post('/answer', isAuthenticated, addReply);
router.post('/review/:id', isAuthenticated, addReview);
router.get('/:id', getSingleCourse);

export default router;