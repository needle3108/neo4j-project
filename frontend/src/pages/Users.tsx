import {grey} from "@mui/material/colors";
import {Alert, Box, Button, Paper, Typography} from "@mui/material";
import Navbar from "../components/Nabvar";
import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef, GridRowSelectionModel} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";

const divStyle = {
    height: '80px',
    position: 'relative',
    textAlign: 'center',
    mt:2
}

const buttonStyle = {
    margin: '15px',
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
    '&:hover': { bgcolor: "rgb(207, 159, 255)"}
}

export default function Users(){
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState<GridRowSelectionModel>([]);
    const [error, setError] = useState<null | string>(null);

    const navigate = useNavigate();

    const columns: GridColDef[] = [
        {field: 'name', headerName: "Imię", width: 250},
        {field: 'surname', headerName: "Nazwisko", width: 250},
        {field: 'email', headerName: "Email", width: 250},
        {field: 'phoneNumber', headerName: "Numer telefonu", width: 250},
    ];

    const paginationModel = { page: 0, pageSize: 10 };

    useEffect(() => {
        fetch("http://64.226.116.227:8080/person/getUsers", {
            method: "GET"
        }).then(response => {
            if(response.status === 200){
                return response.json();
            }
        }).then(data => {
            if(data !== null){
                setUsers(data);
            }
        })
    }, []);

    const handleHistory = () => {
        try{
            if (selectedUser.length === 0){
                throw new Error("Nie wybrano czytelnika!");
            }

            navigate("/userHistory", { state: selectedUser.toString() });
        }
        catch (error) {
            setError((error as Error).message);
            console.error((error as Error).message);
        }
    }

    return(
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <Navbar />
            {error &&
                <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            }
            <Box sx={{justifyContent: 'center', display: 'flex', mt: 4}}>
                <Typography variant="h6" >Lista czytelników</Typography>
            </Box>
            <Box sx={{justifyContent: 'center', display: 'flex', mt: 4}}>
                <Paper sx={{ height: 400, width: 1000}}>
                    <DataGrid
                        disableMultipleRowSelection
                        checkboxSelection
                        getRowId={(row) => row.email}
                        rows={users}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10, 15]}
                        sx={{ border: 0 }}
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setSelectedUser(newRowSelectionModel);
                        }}
                        rowSelectionModel={selectedUser}
                    />
                    <Box sx={divStyle} component="div">
                        <Button onClick={handleHistory} sx={buttonStyle}>Wyświetl historię użytkownika</Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}