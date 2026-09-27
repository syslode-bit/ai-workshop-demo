import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTaskComplete
} from './services/taskService';

const initialFormData = {
  taskName: '',
  courseName: '',
  topicName: '',
  priority: '',
  duration: ''
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = async (selectedFilter = filter) => {
    setLoading(true);
    try {
      const data = await getTasks(selectedFilter);
      setTasks(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filter);
  }, [filter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.taskName.trim()) {
      setError('Task name is required');
      return;
    }

    if (!formData.courseName.trim()) {
      setError('Course name is required');
      return;
    }

    if (!formData.topicName.trim()) {
      setError('Topic name is required');
      return;
    }

    if (!['low', 'medium', 'high'].includes(formData.priority)) {
      setError('Priority must be low, medium, or high');
      return;
    }

    if (!formData.duration || Number(formData.duration) <= 0) {
      setError('Duration must be a positive number');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await createTask({
        ...formData,
        duration: Number(formData.duration)
      });

      setFormData(initialFormData);
      await fetchTasks(filter);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await toggleTaskComplete(taskId);
      await fetchTasks(filter);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm('Delete this task?');

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTask(taskId);
      await fetchTasks(filter);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dashboard
      tasks={tasks}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onFilterChange={setFilter}
      onComplete={handleComplete}
      onDelete={handleDelete}
      filter={filter}
      error={error}
      submitting={submitting}
      loading={loading}
    />
  );
}

export default App;
