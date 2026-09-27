export default function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div style={styles.card}>
      <div style={styles.headerRow}>
        <h3 style={styles.title}>{task.taskName}</h3>
        <span
          style={{
            ...styles.badge,
            background: task.completed ? '#dcfce7' : '#fef3c7',
            color: task.completed ? '#166534' : '#92400e'
          }}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div style={styles.details}>
        <p><strong>Course:</strong> {task.courseName}</p>
        <p><strong>Topic:</strong> {task.topicName}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Duration:</strong> {task.duration} minutes</p>
      </div>

      <div style={styles.actions}>
        <button type="button" onClick={() => onComplete(task._id)} style={styles.primaryButton}>
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>

        <button type="button" onClick={() => onDelete(task._id)} style={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
    padding: '1.2rem',
    marginBottom: '1rem',
    border: '1px solid #e5e7eb'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem'
  },
  title: {
    margin: 0,
    fontSize: '1.4rem'
  },
  badge: {
    borderRadius: '999px',
    padding: '0.3rem 0.7rem',
    fontSize: '0.7rem',
    fontWeight: 700
  },
  details: {
    display: 'grid',
    gap: '0.3rem',
    color: '#374151'
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem',
    flexWrap: 'wrap'
  },
  primaryButton: {
    border: 'none',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    color: '#ffffff',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    fontWeight: 700
  },
  deleteButton: {
    border: '1px solid #fecaca',
    borderRadius: '10px',
    background: '#fef2f2',
    color: '#b91c1c',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    fontWeight: 700
  }
};
