import './TaskForm.css';

export default function TaskForm({ formData, onChange, onSubmit, error, submitting }) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <div className="task-form__header-row">
        <h2 className="task-form__heading">Add Task</h2>
      </div>

      <div className="task-form__grid">
        <input
          type="text"
          name="taskName"
          placeholder="Task name"
          value={formData.taskName}
          onChange={onChange}
          className="task-form__input"
        />

        <input
          type="text"
          name="courseName"
          placeholder="Course name"
          value={formData.courseName}
          onChange={onChange}
          className="task-form__input"
        />

        <input
          type="text"
          name="topicName"
          placeholder="Topic name"
          value={formData.topicName}
          onChange={onChange}
          className="task-form__input"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={onChange}
          className="task-form__input"
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
          className="task-form__input"
        />
      </div>

      {error && <p className="task-form__error">{error}</p>}

      <button type="submit" className="task-form__button" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
