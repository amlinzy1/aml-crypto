import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import {  makeStyles, ThemeProvider, createTheme } from '@material-ui/core';
const CoinInfo = ({ coin }) => {
const [historicData, setHistoricData] = useState();
const [days, setDays] = useState(1);

const { currency } = CryptoState();


const fetchHistoricData = async () => {
  const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

setHistoricData(data.prices);
};

console.log("data", historicData);

useEffect(() => {
 fetchHistoricData();
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currency, days]);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});


const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down ("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
  <div className={classes.container}>
   
  </div>
  </ThemeProvider>
   );
  };
                           
export default CoinInfo;