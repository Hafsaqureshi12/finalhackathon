import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    return (
        <div className="flex justify-between">
            <div>
                <h2>To Do</h2>
                {tasks.filter(task => !task.completed).map(task => <TaskCard key={task._id} task={task} />)}
            </div>
            <div>
                <h2>In Progress</h2>
                {tasks.filter(task => task.inprogress).map(task => <TaskCard key={task._id} task={task} />)}
            </div>
            <div>
                <h2>Done</h2>
                {tasks.filter(task => task.completed).map(task => <TaskCard key={task._id} task={task} />)}
            </div>
        </div>
    );
};

export default TaskBoard;
