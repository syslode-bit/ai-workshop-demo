const API_URL = 'http://localhost:5000/api/tasks';

export async function getTasks(filter = 'all') {
  let query = '';

  if (filter === 'pending') {
    query = '?completed=false';
  } else if (filter === 'completed') {
    query = '?completed=true';
  }

  const response = await fetch(`${API_URL}${query}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch tasks');
  }

  return data.tasks;
}

export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create task');
  }

  return data.task;
}

export async function toggleTaskComplete(taskId) {
  const response = await fetch(`${API_URL}/${taskId}/complete`, {
    method: 'PATCH'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to toggle task status');
  }

  return data.task;
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete task');
  }

  return data;
}
