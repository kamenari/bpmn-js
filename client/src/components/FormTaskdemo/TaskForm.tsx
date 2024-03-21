import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (taskName: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskName">タスク名:</label>
      <input
        type="text"
        id="taskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default TaskForm;