import React, { useState, useEffect } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './Tasklist.css';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Tasklist: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      alert("El nombre de la tarea no puede estar vacío.");
      return;
    }
    const newTask: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
      title: newTaskTitle,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const updateTask = (id: number, title: string, completed: boolean) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, title, completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
      <div className="task-input">
        <input
          type="text"
          placeholder="Ingresa el nombre de la tarea"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={addTask}>Agregar Tarea</button>
      </div>
    </div>
  );
}

export default Tasklist;
