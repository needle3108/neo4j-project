import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef, GridRowSelectionModel} from "@mui/x-data-grid";
import {grey} from "@mui/material/colors";
import {Alert, Box, Button, Paper, Typography} from "@mui/material";
import Navbar from "../components/Nabvar";

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

export default function ReturnBook(){
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);

    const [selectedUser, setSelectedUser] = useState<GridRowSelectionModel>([]);
    const [selectedBook, setSelectedBook] = useState<GridRowSelectionModel>([]);

    const paginationModel = { page: 0, pageSize: 10 };
    const [error, setError] = useState<null | string>(null);
    const [message, setMessage] = useState<null | string>(null);
    const [areBooksFetched, setAreBooksFetched] = useState<null | string>(null);

    const columnsUser: GridColDef[] = [
        {field: 'name', headerName: "Imię", width: 130},
        {field: 'surname', headerName: "Nazwisko", width: 130},
        {field: 'email', headerName: "Email", width: 130},
        {field: 'phoneNumber', headerName: "Numer telefonu", width: 130},
    ];

    const columnsBook: GridColDef[] = [
        {field: 'id', headerName: "ID", width: 130},
        {field: 'title', headerName: "Tytuł", width: 130},
        {field: 'author', headerName: "Autor", width: 130},
        {field: 'publisher', headerName: "Wydawnictwo", width: 130},
        {field: 'status', headerName: "Status", width: 130},
    ];

    useEffect(() => {
        fetch("http://localhost:8080/person/getUsers", {
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

    useEffect(() => {
        try{
            const formData = new FormData();

            formData.append('email', selectedUser.toString());

            fetch("http://localhost:8080/book/getPersonRentedBooks", {
                method: "POST",
                body: formData
            }).then(response => {
                if(response.status === 200){
                    return response.json();
                }
            }).then(data => {
                if(data !== null){
                    setBooks(data);
                    setAreBooksFetched("YES");
                    if (error !== null){
                        setError(null);
                    }
                }
            })
        }
        catch (error) {
            setError((error as Error).message);
            console.error((error as Error).message);
        }

    }, [selectedUser]);

    const handleReturnBook = () => {
        try{
            if (selectedBook.length === 0){
                throw new Error("Nie wybrano książki!");
            }

            const formData = new FormData();

            formData.append('email', selectedUser.toString());
            formData.append('id', selectedBook.toString());

            fetch("http://localhost:8080/book/returnBook", {
                method: "POST",
                body: formData
            }).then(async response => {
                if (response.status === 200){
                    return response.json();
                }
                const msg = await response.json();
                throw new Error(msg["message"]);
            }).then(data => {
                if (data !== null){
                    setMessage(data["message"]);

                    if (error !== null){
                        setError(null);
                    }
                }
            }).catch((error) => {
                setError((error as Error).message);
                console.error(error);
            })
        }
        catch (error) {
            setError((error as Error).message);
            console.error((error as Error).message);
        }
    }

    return (
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <Navbar />
            {error &&
                <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            }
            {message &&
                <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                    <Alert severity="success">{message}</Alert>
                </Box>
            }
            <Box sx={{justifyContent: 'center', display: 'flex', mt: 4}}>
                <Typography variant="h6" >Zwrot książek</Typography>
            </Box>
            <Box sx={{justifyContent: 'center', display: 'flex', mt: 4}}>
                <Box>
                    <Paper sx={{ height: 400, width: 600, margin: 2}}>
                        <DataGrid
                            disableMultipleRowSelection
                            checkboxSelection
                            getRowId={(row) => row.email}
                            rows={users}
                            columns={columnsUser}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15]}
                            sx={{ border: 0 }}
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setSelectedUser(newRowSelectionModel);
                            }}
                            rowSelectionModel={selectedUser}
                        />
                    </Paper>
                </Box>
                {areBooksFetched &&
                    <Box>
                        <Box>
                            <Paper sx={{ height: 400, width: 650, margin: 2}}>
                                <DataGrid
                                    disableMultipleRowSelection
                                    checkboxSelection
                                    getRowId={(row) => row.id}
                                    rows={books}
                                    columns={columnsBook}
                                    initialState={{ pagination: { paginationModel } }}
                                    pageSizeOptions={[5, 10, 15]}
                                    sx={{ border: 0 }}
                                    onRowSelectionModelChange={(newRowSelectionModel) => {
                                        setSelectedBook(newRowSelectionModel);
                                    }}
                                    rowSelectionModel={selectedBook}
                                />
                            </Paper>
                        </Box>
                        <Box sx={divStyle} component="div">
                            <Button onClick={handleReturnBook} sx={buttonStyle}>Zwróć książkę</Button>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}