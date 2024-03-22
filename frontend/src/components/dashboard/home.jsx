import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
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
import { styled } from '@mui/system';
import { Navigate } from 'react-router-dom';

const MainContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
});

const DashboardContainer = styled(Box)({
    marginBottom: '20px',
    textAlign: 'center',
});

const UploadContainer = styled(Box)({
    marginBottom: '20px',
});

const ChartContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
});

const TableContainer = styled(Box)({
    width: '48%',
    height: '500px',
    overflow: 'scroll',
});

const Home = (props) => {
    const { loggedIn, setLoggedIn } = props;
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

    }, [loggedIn, setLoggedIn]);

    const onLogout = () => {
        if (localStorage.getItem('status')) {

            localStorage.setItem('status', false);
        }
        setLoggedIn(false);
    };

    const onLogin = () => {
        <Navigate to={'/login'} />
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

                const labels = rowsWithCell[0].slice(1); // Assuming first row is labels and first column is not x-axis
                const datasets = [];
                for (let i = 1; i < rowsWithCell.length; i++) {
                    const data = rowsWithCell[i].slice(1).filter((item) => !Number.isNaN(parseFloat(item)))
                    datasets.push({
                        label: `Dataset${i}`,
                        data: data,
                        fill: false,
                        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`,
                    });
                }
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
                text: 'Line Chart',
            },
        },
    };

    return (
        <MainContainer>
            <DashboardContainer>
                <Typography variant="h5">Welcome!</Typography>
            </DashboardContainer>
            {loggedIn ? (
                <Box>
                    <DashboardContainer>This is your dashboard.</DashboardContainer>
                    <Button variant="contained" onClick={onLogout}>Logout</Button>
                    <UploadContainer>
                        <Typography variant="h6">Upload CSV File</Typography>
                        <form>
                            <input
                                type={"file"}
                                id={"csvFileInput"}
                                accept={".csv"}
                                onChange={handleOnChange}
                            />
                            <Button variant="contained" onClick={handleOnSubmit}>IMPORT CSV</Button>
                        </form>
                    </UploadContainer>
                    <ChartContainer>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {cells && Array.isArray(cells) && cells[0]?.map((item) => (
                                            <TableCell key={item}>{item}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cells && Array.isArray(cells) && cells.map((row, index) => (
                                        <TableRow key={row[0] + index}>
                                            {row && row.map((item) => (
                                                <TableCell key={item}>{item}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {chartData?.labels && (
                            <Box width="48%" height="800px">
                                <Line options={options} data={chartData} />
                            </Box>
                        )}
                    </ChartContainer>
                </Box>
            ) : (
                <>
                    <Box>Please log in to access this page.</Box>
                    <Button variant="contained" onClick={onLogin}>Login</Button>
                </>
            )}
        </MainContainer>
    );
}

export default Home;
