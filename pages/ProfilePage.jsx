import React, { useContext } from 'react';
import { AuthContext } from '../content/AuthContext';

const ProfilePage = () => {
    const { authData } = useContext(AuthContext);

    if (!authData) {
        return <div>Please log in</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {authData.username}</p>
            <p>Email: {authData.email}</p>
        </div>
    );
};

export default ProfilePage;
