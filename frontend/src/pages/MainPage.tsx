import {Box, Button} from "@mui/material";
import {grey} from "@mui/material/colors";
import Navbar from "../components/Nabvar";

const buttonStyle = {
    margin: '15px',
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
    '&:hover': { bgcolor: "rgb(207, 159, 255)"}
}

export default function MainPage(){
    return (
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <Navbar />
            <Box sx={{textAlign: 'center', mt: 5}}>
                <Button sx={buttonStyle}>Dodaj czytelnika</Button>
                <Button sx={buttonStyle}>Dodaj książkę</Button>
                <Button sx={buttonStyle}>Wyświetl wypożyczone książki</Button>
            </Box>
        </Box>
    )
}