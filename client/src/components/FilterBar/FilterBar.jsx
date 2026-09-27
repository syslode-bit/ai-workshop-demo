import './FilterBar.css';

export default function FilterBar({ filter, onChange }) {
  const items = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="filter-bar">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={`filter-bar__button ${filter === item.value ? 'active' : ''}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
