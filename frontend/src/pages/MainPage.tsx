import {Alert, Box, Button, TextField} from "@mui/material";
import {grey} from "@mui/material/colors";
import Navbar from "../components/Nabvar";
import React, {useState} from "react";

const buttonStyle = {
    margin: '15px',
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
    '&:hover': { bgcolor: "rgb(207, 159, 255)"}
}

const textFieldStyle = {
    left: '10%',
    mr: '20px',
    mt: '20px',
    width: '20%'
}

const divStyle = {
    height: '80px',
    position: 'relative',
    textAlign: 'center',
    mt:2
}

export default function MainPage(){
    const [message, setMessage] = useState<null | string>(null);
    const [error, setError] = useState<null | string>(null);
    const [addNewUser, setAddNewUser] = useState(false);
    const [addNewBook, setAddNewBook] = useState(false);

    //Person properties
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    //Book properties
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");

    const handleAddNewUser = (event: React.FormEvent<HTMLFormElement>) => {
        try{
            event.preventDefault();

            const formData = new FormData();

            formData.append('name', name);
            formData.append('surname', surname);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);

            fetch("http://64.226.116.227:8080/person/addUser", {
                method: "POST",
                body: formData
            }).then(async response => {
                if (response.status === 200){
                    return response.json();
                }
                const msg = await response.json();
                throw new Error(msg["message"]);
            }).then(data => {
                if(data !== null){
                    setMessage(data["message"]);
                    setAddNewUser(false);
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

    const handleAddNewBook = (event: React.FormEvent<HTMLFormElement>) => {
        try{
            event.preventDefault();

            const formData = new FormData();

            formData.append('title', title);
            formData.append('author', author);
            formData.append('publisher', publisher);

            fetch("http://64.226.116.227:8080/book/addBook", {
                method: "POST",
                body: formData
            }).then(async response => {
                if (response.status === 200){
                    return response.json();
                }
                const msg = await response.json();
                throw new Error(msg["message"]);
            }).then(data => {
                if(data !== null){
                    setMessage(data["message"]);
                    setAddNewBook(false);
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
            {message &&
                <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                    <Alert severity="success">{message}</Alert>
                </Box>
            }
            {error &&
                <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            }
            <Box sx={{textAlign: 'center', mt: 5}}>
                <Button onClick={() => setAddNewUser(!addNewUser)} sx={buttonStyle}>Dodaj czytelnika</Button>
                <Button onClick={() => setAddNewBook(!addNewBook)} sx={buttonStyle}>Dodaj książkę</Button>
                <Button href="/users" sx={buttonStyle}>Wyświetl czytelników</Button>
                <Button href="/books" sx={buttonStyle}>Wyświetl książki</Button>
                <Button href="/rentBook" sx={buttonStyle}>Wypożycz książkę</Button>
                <Button href="/returnBook" sx={buttonStyle}>Zwróć książkę</Button>
            </Box>
            {addNewUser &&
                <form autoComplete="off" onSubmit={handleAddNewUser}>
                    <TextField
                        label="Imię"
                        onChange={e => setName(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        sx={textFieldStyle}
                        value={name}
                    />
                    <TextField
                        label="Nazwisko"
                        onChange={e => setSurname(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        sx={textFieldStyle}
                        value={surname}
                    />
                    <TextField
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        type="email"
                        sx={textFieldStyle}
                        value={email}
                    />
                    <TextField
                        label="Numer telefonu"
                        onChange={e => setPhoneNumber(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        sx={textFieldStyle}
                        value={phoneNumber}
                    />
                    <Box sx={divStyle} component="div">
                        <Button type="submit" sx={buttonStyle}>Dodaj czytelnika</Button>
                    </Box>
                </form>
            }
            {addNewBook &&
                <form autoComplete="off" onSubmit={handleAddNewBook}>
                    <TextField
                        label="Tytuł"
                        onChange={e => setTitle(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        sx={textFieldStyle}
                        value={title}
                    />
                    <TextField
                        label="Autor"
                        onChange={e => setAuthor(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        sx={textFieldStyle}
                        value={author}
                    />
                    <TextField
                        label="Wydawnictwo"
                        onChange={e => setPublisher(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        sx={textFieldStyle}
                        value={publisher}
                    />
                    <Box sx={divStyle} component="div">
                        <Button type="submit" sx={buttonStyle}>Dodaj książkę</Button>
                    </Box>
                </form>
            }
        </Box>
    )
}