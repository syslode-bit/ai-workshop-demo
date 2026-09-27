import './TaskCard.css';

export default function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div className="task-card">
      <div className="task-card__header-row">
        <h3 className="task-card__title">{task.taskName}</h3>
        <span
          className={`task-card__badge ${task.completed ? 'completed' : 'pending'}`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div className="task-card__details">
        <p><strong>Course:</strong> {task.courseName}</p>
        <p><strong>Topic:</strong> {task.topicName}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Duration:</strong> {task.duration} minutes</p>
      </div>

      <div className="task-card__actions">
        <button type="button" onClick={() => onComplete(task._id)} className="task-card__primary-button">
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>

        <button type="button" onClick={() => onDelete(task._id)} className="task-card__delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}
