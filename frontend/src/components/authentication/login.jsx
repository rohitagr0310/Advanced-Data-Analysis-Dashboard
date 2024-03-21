import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const [response, setResponse] = useState('');

    const onButtonClick = () => {
        if (!isRegistering) {
            setUsernameError('')
            setPasswordError('')

            if ('' === username) {
                setUsernameError("Please enter a username")
                return
            }

            if ('' === password) {
                setPasswordError('Please enter a password')
                return
            }

            if (password.length < 7) {
                setPasswordError('The password must be 8 characters or longer')
                return
            }

            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        setResponse(data.error);
                    } else {
                        localStorage.setItem('userId', data.user[0]);
                        localStorage.setItem('username', data.user[1]);
                        localStorage.setItem('firstName', data.user[2]);
                        localStorage.setItem('lastName', data.user[3]);
                        localStorage.setItem('password', data.user[4]);

                        navigate('/');
                    }
                })
                .catch(error => {
                    setResponse(error)
                    console.error('Error:', error);
                });

        } else {
            setUsernameError('')
            setPasswordError('')

            if ('' === username) {
                setUsernameError("Please enter a username")
                return
            }

            if ('' === password) {
                setPasswordError('Please enter a password')
                return
            }

            if (password.length < 7) {
                setPasswordError('The password must be 8 characters or longer')
                return
            }
            if (password !== repeatPassword) {
                setRepeatPasswordError('Passwords do not match');
                return;
            }

            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, firstName, lastName, username }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        setResponse(data.error);
                    } else {
                        navigate('/login');
                    }
                })
                .catch(error => {
                    setResponse(error)
                    console.error('Error:', error);
                });
        }
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
        setPassword('');
        setFirstName('');
        setLastName('');
        setUsername('');
        setUsernameError('');
        setRepeatPassword('');
        setPasswordError('');
        setRepeatPasswordError('');
    };

    return (
        <div className="login-mainContainer">
            <div className="login-titleContainer">{isRegistering ? 'Register' : 'Login'}</div>
            <br />
            {response && <div className="login-inputContainer">
                <label className="login-errorLabel">{response}</label>
            </div>}
            {isRegistering && (
                <>
                    <div className="login-inputContainer">
                        <input
                            value={firstName}
                            placeholder="Enter your first name"
                            onChange={(ev) => setFirstName(ev.target.value)}
                            className="login-inputBox"
                        />
                    </div>
                    <br />
                    <div className="login-inputContainer">
                        <input
                            value={lastName}
                            placeholder="Enter your last name"
                            onChange={(ev) => setLastName(ev.target.value)}
                            className="login-inputBox"
                        />
                    </div>
                    <br />
                </>
            )}
            <div className="login-inputContainer">
                <input
                    value={username}
                    placeholder="Enter your username"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className="login-inputBox"
                />
                <label className="login-errorLabel">{usernameError}</label>
            </div>
            <br />
            <div className="login-inputContainer">
                <input
                    value={password}
                    placeholder="Enter your password"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="login-inputBox"
                    type="password"
                />
                <label className="login-errorLabel">{passwordError}</label>
            </div>
            <br />
            {isRegistering && (
                <>
                    <div className="login-inputContainer">
                        <input
                            value={repeatPassword}
                            placeholder="Repeat your password"
                            onChange={(ev) => setRepeatPassword(ev.target.value)}
                            className="login-inputBox"
                            type="password"
                        />
                        <label className="login-errorLabel">{repeatPasswordError}</label>
                    </div>
                    <br />
                </>
            )}

            <div className="login-inputContainer">
                <input className="login-inputButton" type="button" onClick={onButtonClick} value={isRegistering ? 'Register' : 'Log in'} />
            </div>
            <br />
            <div className="login-inputContainer">
                <button className="login-inputButton" onClick={toggleForm}>
                    Switch to {isRegistering ? 'Login' : 'Register'}
                </button>
            </div>
        </div>
    );
};

export default Login;
