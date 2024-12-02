import {AppBar, Box, createTheme, ThemeProvider, Typography} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(96,58,120)',
        }
    }
});

export default function Navbar(){
    return(
        <ThemeProvider theme={theme}>
            <Box sx={{margin: 1}}>
                <AppBar position="static" sx={{
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, rgba(96,58,120,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)',
                }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Lucida Handwriting"}} fontStyle="inherit">
                        Biblioteka
                    </Typography>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}