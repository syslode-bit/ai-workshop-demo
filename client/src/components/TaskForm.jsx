export default function TaskForm({ formData, onChange, onSubmit, error, submitting }) {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <div style={styles.headerRow}>
        <h2 style={styles.heading}>Add Task</h2>
      </div>

      <div style={styles.grid}>
        <input
          type="text"
          name="taskName"
          placeholder="Task name"
          value={formData.taskName}
          onChange={onChange}
          style={styles.input}
        />

        <input
          type="text"
          name="courseName"
          placeholder="Course name"
          value={formData.courseName}
          onChange={onChange}
          style={styles.input}
        />

        <input
          type="text"
          name="topicName"
          placeholder="Topic name"
          value={formData.topicName}
          onChange={onChange}
          style={styles.input}
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={onChange}
          style={styles.input}
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          min="1"
          value={formData.duration}
          onChange={onChange}
          style={styles.input}
        />
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <button type="submit" style={styles.button} disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '18px',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.07)',
    marginBottom: '1.5rem',
    border: '1px solid #e5e7eb'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  heading: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#1f2937'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '0.9rem'
  },
  input: {
    padding: '0.9rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    fontSize: '1rem',
    background: '#f8fafc',
    outline: 'none'
  },
  button: {
    marginTop: '1rem',
    border: 'none',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    padding: '0.85rem 1.1rem',
    cursor: 'pointer',
    fontWeight: 700,
    boxShadow: '0 10px 20px rgba(37, 99, 235, 0.18)'
  },
  error: {
    color: '#dc2626',
    marginTop: '0.75rem',
    marginBottom: 0,
    fontWeight: 600
  }
};
