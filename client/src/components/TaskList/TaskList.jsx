import './TaskList.css';
import TaskCard from '../TaskCard/TaskCard';

export default function TaskList({ tasks, onComplete, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="task-list__empty-state">
        <p className="task-list__empty-text">No tasks available for this filter.</p>
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
