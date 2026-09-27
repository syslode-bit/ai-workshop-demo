import './Dashboard.css';
import Navbar from '../../components/Navbar/Navbar';
import TaskForm from '../../components/TaskForm/TaskForm';
import FilterBar from '../../components/FilterBar/FilterBar';
import TaskList from '../../components/TaskList/TaskList';

export default function Dashboard({
  tasks,
  formData,
  onChange,
  onSubmit,
  onFilterChange,
  onComplete,
  onDelete,
  filter,
  error,
  submitting,
  loading
}) {
  return (
    <div className="dashboard-page">
      <Navbar />

      <TaskForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        submitting={submitting}
      />

      <FilterBar filter={filter} onChange={onFilterChange} />

      {loading ? (
        <div className="dashboard-page__loading-box">Loading tasks...</div>
      ) : (
        <TaskList tasks={tasks} onComplete={onComplete} onDelete={onDelete} />
      )}
    </div>
  );
}
