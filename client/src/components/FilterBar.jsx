export default function FilterBar({ filter, onChange }) {
  const items = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div style={styles.bar}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          style={{
            ...styles.button,
            background: filter === item.value ? '#2563eb' : '#eff6ff',
            color: filter === item.value ? '#ffffff' : '#1d4ed8',
            border: filter === item.value ? '1px solid #2563eb' : '1px solid #c7d2fe',
            boxShadow: filter === item.value ? '0 8px 16px rgba(37, 99, 235, 0.18)' : 'none'
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  bar: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap'
  },
  button: {
    borderRadius: '999px',
    padding: '0.7rem 1rem',
    cursor: 'pointer',
    fontWeight: 700,
    transition: 'all 0.2s ease'
  }
};
