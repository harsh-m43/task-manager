"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { isAuthenticated } from '../../utils/auth';
import { TaskProvider } from '../../context/TaskContext';

export default function TasksPage() {
  const router = useRouter();
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleEdit = (task) => setEditingTask(task);
  const handleCancelEdit = () => setEditingTask(null);

  return (
    <TaskProvider>
      <Layout>
        <TaskForm editingTask={editingTask} onCancel={handleCancelEdit} />
        <TaskList onEdit={handleEdit} />
      </Layout>
    </TaskProvider>
  );
}
