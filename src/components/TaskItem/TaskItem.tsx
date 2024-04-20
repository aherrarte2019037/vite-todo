// TaskItem.tsx
import React, { useState } from 'react';
import './TaskItem.css';
import { Task } from '../Tasklist/Tasklist';

interface TaskItemProps {
  task: Task;
  updateTask: (id: number, title: string, completed: boolean) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    if (isEditing && editTitle.trim() !== '') {
      updateTask(task.id, editTitle, task.completed);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
      {isEditing ? (
        <input type="text" value={editTitle} onChange={handleChange} />
      ) : (
        <h3>{task.title}</h3>
      )}
      <div>
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
