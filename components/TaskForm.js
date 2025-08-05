import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskForm({ editingTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  
  const { addTask, updateTask } = useTasks();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setCompleted(editingTask.completed);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.length > 100) {
      setError('Title must be less than 100 characters');
      return;
    }

    const taskData = { title: title.trim(), priority, completed };

    if (editingTask) {
      updateTask({ ...editingTask, ...taskData });
    } else {
      addTask(taskData);
    }

    // Reset form
    setTitle('');
    setPriority('Medium');
    setCompleted(false);
    setError('');
    
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          maxLength="100"
          required
        />
      </div>

      <div className="form-group">
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
