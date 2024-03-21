import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

const HomeTest = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [file, setFile] = useState();
    const [cells, setCells] = useState();

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
        localStorage.clear();
        setLoggedIn(false);
    };

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                const rows = text.toString().split('\n')
                const rowsWithCell = rows.map((row) => row.split(','))
                setCells(rowsWithCell)
            };
            fileReader.readAsText(file);
        }
    };

    return (
        <Box className="mainContainer" sx={{ padding: '20px' }}>
            <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
                <div>Welcome!</div>
            </Box>
            {loggedIn ? (
                <Box>
                    <Box sx={{ marginBottom: '20px' }}>This is your dashboard.</Box>
                    <Box sx={{ marginBottom: '20px' }}>
                        <div>Upload CSV File</div>
                        <form>
                            <input
                                type={"file"}
                                id={"csvFileInput"}
                                accept={".csv"}
                                onChange={handleOnChange}
                            />

                            <button
                                onClick={(e) => {
                                    handleOnSubmit(e);
                                }}
                            >
                                IMPORT CSV
                            </button>
                        </form>
                    </Box>
                    <Box>
                        <table>
                            <thead>
                                <tr>
                                    {cells && Array.isArray(cells) && cells[0]?.map((item) => (
                                        <th key={item}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cells && Array.isArray(cells) && cells.map((row, index) => (
                                    <tr key={row[0] + index}>
                                        {row && row.map((item) => (
                                            <td key={item}>{item}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            ) : (
                <Box>Please log in to access this page.</Box>
            )}
        </Box>
    );
}

export default HomeTest;
