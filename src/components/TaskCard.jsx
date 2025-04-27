import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <div className="border p-2 mb-2">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleTaskAction(task._id, 'inprogress')}>In Progress</button>
            <button onClick={() => handleTaskAction(task._id, 'done')}>Done</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
    );
};

const handleTaskAction = async (taskId, status) => {
    await axios.put(`http://localhost:5000/api/tasks/update/${taskId}`, { status });
    // Reload tasks after update
};

const handleDelete = async (taskId) => {
    await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`);
    // Reload tasks after deletion
};

export default TaskCard;
