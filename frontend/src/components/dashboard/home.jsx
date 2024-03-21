import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Resizable } from 'react-resizable';

const ResizablePaper = ({ width, height, onResize, children }) => (
    <Resizable
        width={width}
        height={height}
        onResize={onResize}
        resizeHandles={['se']}
        minConstraints={[200, 200]}
        maxConstraints={[200, 200]}
    >
        <Paper style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>{children}</Paper>
    </Resizable>
);

const Home = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [csvData, setCsvData] = useState(null);
    const [cardSize, setCardSize] = useState({ width: 400, height: 300 });

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        // Perform logout logic
        localStorage.removeItem('Storage');
        setLoggedIn(false);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Parse CSV data here
                const csv = e.target.result;
                setCsvData(csv);
            };
            reader.readAsText(file);
        }
    };

    const handleResize = (event, { size }) => {
        setCardSize({ width: size.width, height: size.height });
    };

    return (
        <div className="mainContainer">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuClick}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <input
                            accept=".csv"
                            style={{ display: 'none' }}
                            id="upload-csv"
                            type="file"
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="upload-csv">
                            <MenuItem component="span">Upload CSV</MenuItem>
                        </label>
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                    {loggedIn && (
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <div className="csvContainer">
                <ResizablePaper width={cardSize.width} height={cardSize.height} onResize={handleResize}>
                    <div className="csvPaper">
                        <Typography variant="h5" gutterBottom>
                            CSV Data
                        </Typography>
                        {csvData ? (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {csvData.split('\n')[0].split(',').map((header, index) => (
                                                <TableCell key={index}>{header}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {csvData.split('\n').slice(1).map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {row.split(',').map((cell, cellIndex) => (
                                                    <TableCell key={cellIndex}>{cell}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography variant="body1">Upload a CSV file to display data.</Typography>
                        )}
                    </div>
                </ResizablePaper>
            </div>
        </div>
    );
}

export default Home;
