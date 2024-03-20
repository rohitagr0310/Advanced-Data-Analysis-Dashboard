import React from 'react';

const Home = (props) => {
    const { setLoggedIn, firstName, lastName, username } = props;

    const onLogout = () => {
        // Perform logout logic
        setLoggedIn(false);
    };

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome!</div>
            </div>
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
    );
}

export default Home;
