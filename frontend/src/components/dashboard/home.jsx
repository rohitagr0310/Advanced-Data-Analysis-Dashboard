import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const Home = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [file, setFile] = useState();
    const [cells, setCells] = useState();
    const [chartData, setChartData] = useState({});

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

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
                setCells(rowsWithCell);

                // Process data for chart
                const labels = rowsWithCell[0].slice(1); // Assuming first row is labels and first column is not x-axis
                const datasets = [];
                for (let i = 1; i < rowsWithCell.length; i++) {
                    const data = rowsWithCell[i].slice(1).filter((item) => !Number.isNaN(parseFloat(item)))
                    console.log(data)// Assuming data starts from the second column
                    datasets.push({
                        label: `Dataset${i}`, // Assuming first column is label for each dataset
                        data: data,
                        fill: false,
                        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`,
                    });
                }
                console.log({
                    labels: labels,
                    datasets: datasets,
                })
                setChartData({
                    labels: labels,
                    datasets: datasets,
                });
            };
            fileReader.readAsText(file);
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    return (
        <Box className="mainContainer" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box sx={{ width: '48%', height: '500px', overflow: 'scroll' }}>
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
                        {chartData?.labels && <Box sx={{ width: '48%' }}>
                            <Line options={options} data={chartData} />
                        </Box>}
                    </Box>
                </Box>
            ) : (
                <Box>Please log in to access this page.</Box>
            )}
        </Box>
    );
}

export default Home;
