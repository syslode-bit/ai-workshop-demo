import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';

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
    <div style={styles.page}>
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
        <div style={styles.loadingBox}>Loading tasks...</div>
      ) : (
        <TaskList tasks={tasks} onComplete={onComplete} onDelete={onDelete} />
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '980px',
    margin: '0 auto',
    padding: '1.25rem'
  },
  loadingBox: {
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    padding: '1rem 1.25rem',
    color: '#475569',
    fontWeight: 600
  }
};
