import React, { useEffect, useState } from 'react';

const Home = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if user is logged in from local storage
        const storedData = localStorage.getItem('Storage');
        if (storedData) {
            const userData = JSON.parse(storedData);
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setUsername(userData.username);
        }
    }, [loggedIn, setLoggedIn]);

    const onLogout = () => {
        // Perform logout logic
        localStorage.removeItem('Storage');
        setLoggedIn(false);
    };

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome!</div>
            </div>
            {loggedIn ? (
                <div>
                    <div>This is your dashboard.</div>
                    <div className={'dashboardContainer'}>
                        <div className={'dashboardItem'}>
                            <h2>Profile</h2>
                            <p>Username: {username}</p>
                            <p>First Name: {firstName}</p>
                            <p>Last Name: {lastName}</p>
                        </div>
                        <div className={'dashboardItem'}>
                            <h2>Settings</h2>
                            <p>Update your preferences here.</p>
                        </div>
                        <div className={'dashboardItem'}>
                            <h2>Activity</h2>
                            <p>View recent activity.</p>
                        </div>
                        <div className={'dashboardItem'}>
                            <h2>Logout</h2>
                            <button className={'logoutButton'} onClick={onLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Please log in to access this page.</div>
            )}
        </div>
    );
}

export default Home;
