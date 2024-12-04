import {AppBar, Box, createTheme, IconButton, ThemeProvider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(96,58,120)',
        }
    }
});

export default function Navbar(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{margin: 1}}>
                <AppBar position="static" sx={{
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, rgba(96,58,120,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)',
                }}>
                    <IconButton
                        onClick={() => handleClick()}
                        aria-label="Strona główna"
                        sx={{
                            color: "white",
                        }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Lucida Handwriting"}} fontStyle="inherit">
                            Biblioteka
                        </Typography>
                    </IconButton>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}