import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const useStyles = makeStyles(()=>({
  title: {
    flex: 1,
    color: "purple",
    fontFamily: "Space Grotesk",
    fontWeight: "bold",
    cursor:"pointer",
  }
}))

const Header = () => {

  const classes = useStyles();
 const navigate = useNavigate();

const { currency, setCurrency } = CryptoState();

console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#4caf50",
      },
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='secondary' position='static'>
     <Container>
      <Toolbar>
        <Typography
         onClick={() => navigate('/')}
        className={classes.title}
        variant='h6'
        >
          Aml Crypto
          </Typography>

        <Select 
        variant='outlined' 
        style={{
          width: 100,
          height: 40,
          marginRight: 15,
        }}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value={"USD"}>USD</MenuItem>
        </Select>
      </Toolbar>
     </Container>
    </AppBar>
    </ThemeProvider>
  ); 
};

export default Header;