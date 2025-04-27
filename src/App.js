import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './content/AuthContext'
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <AuthContext>
            <Router>
                <Routes>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/" exact component={HomePage} />
                </Routes>
            </Router>
        </AuthContext>
    );
}

export default App;
