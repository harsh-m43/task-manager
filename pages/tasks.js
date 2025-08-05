import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { isAuthenticated } from '../utils/auth';

export default function Tasks() {
  const [editingTask, setEditingTask] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <Layout>
      <div className="tasks-page">
        <TaskForm editingTask={editingTask} onCancel={handleCancelEdit} />
        <TaskList onEdit={handleEdit} />
      </div>
    </Layout>
  );
}
