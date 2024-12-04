import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {grey} from "@mui/material/colors";
import {Box, Paper, Typography} from "@mui/material";
import Navbar from "../components/Nabvar";

export default function UserHistory(){
    const location = useLocation();
    const email = location.state;

    const [userHistory, setUserHistory] = useState([]);

    const paginationModel = { page: 0, pageSize: 10 };

    const columns: GridColDef[] = [
        {field: 'id', headerName: "ID", width: 250},
        {field: 'title', headerName: "Tytuł", width: 250},
        {field: 'author', headerName: "Autor", width: 250},
        {field: 'publisher', headerName: "Wydawnictwo", width: 250},
        {field: 'status', headerName: "Status", width: 250},
    ];

    useEffect(() => {
        const formData = new FormData();

        formData.append('email', email);

        fetch("http://64.226.116.227:8080/person/userHistory", {
            method: "POST",
            body: formData
        }).then(response => {
            if(response.status === 200){
                return response.json();
            }
        }).then(data => {
            if(data !== null){
                setUserHistory(data);
            }
        })
    }, []);

    return(
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <Navbar />
            <Box sx={{justifyContent: 'center', display: 'flex', mt: 4}}>
                <Typography variant="h6" >Historia czytelnika</Typography>
            </Box>
            <Box sx={{justifyContent: 'center', display: 'flex', mt: 4}}>
                <Paper sx={{ height: 400, width: 1250}}>
                    <DataGrid
                        disableRowSelectionOnClick
                        getRowId={(row) => row.id}
                        rows={userHistory}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10, 15]}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </Box>
        </Box>
    )
}