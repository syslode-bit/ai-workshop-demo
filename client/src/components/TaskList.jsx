import TaskCard from './TaskCard';

export default function TaskList({ tasks, onComplete, onDelete }) {
  if (!tasks.length) {
    return (
      <div style={styles.emptyState}>
        <p style={styles.emptyText}>No tasks available for this filter.</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

const styles = {
  emptyState: {
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px dashed #cbd5e1',
    padding: '1.5rem',
    textAlign: 'center'
  },
  emptyText: {
    margin: 0,
    color: '#475569'
  }
};
