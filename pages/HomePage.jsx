import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../content/AuthContextS';
import TaskBoard from '../components/TaskBoard';

const HomePage = () => {
    const { authData } = useContext(AuthContext);
    
    if (!authData) {
        return <div>Please log in</div>;
    }

    return (
        <div>
            <h1>Welcome, {authData.username}</h1>
            <TaskBoard />
        </div>
    );
};

export default HomePage;
