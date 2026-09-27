import Task from '../models/Task.js';

const createTask = async (req, res, next) => {
  try {
    const { taskName, courseName, topicName, priority, duration } = req.body;

    if (!taskName || !taskName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task name is required'
      });
    }

    if (!courseName || !courseName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Course name is required'
      });
    }

    if (!topicName || !topicName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Topic name is required'
      });
    }

    if (!priority || !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Priority must be low, medium, or high'
      });
    }

    if (!duration || Number(duration) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Duration must be a positive number'
      });
    }

    const task = await Task.create({
      taskName: taskName.trim(),
      courseName: courseName.trim(),
      topicName: topicName.trim(),
      priority,
      duration: Number(duration),
      completed: false
    });

    return res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    return next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { completed } = req.query;
    const filter = {};

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tasks
    });
  } catch (error) {
    return next(error);
  }
};

const toggleTaskComplete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      task: updatedTask
    });
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    return next(error);
  }
};

export { createTask, getTasks, toggleTaskComplete, deleteTask };
