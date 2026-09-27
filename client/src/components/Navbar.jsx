export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <span style={styles.badge}>Study Planner</span>
        <h1 style={styles.title}>Stay on top of your study goals</h1>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    padding: '1.5rem 1.5rem 1.75rem',
    borderRadius: '18px',
    marginBottom: '1.5rem',
    boxShadow: '0 12px 24px rgba(37, 99, 235, 0.18)'
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  badge: {
    alignSelf: 'flex-start',
    background: 'rgba(255,255,255,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '999px',
    padding: '0.35rem 0.7rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  },
  title: {
    margin: 0,
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    lineHeight: 1.2
  }
};
