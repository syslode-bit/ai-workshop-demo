import express from 'express';
import {
  createTask,
  getTasks,
  toggleTaskComplete,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:id/complete', toggleTaskComplete);
router.delete('/:id', deleteTask);

export default router;
