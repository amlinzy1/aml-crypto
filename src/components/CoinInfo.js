import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api'
import { Classnames } from 'react-alice-carousel';
import { CircularProgress } from '@material-ui/core';
const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
const [days, setDays] = useState(1);

const { currency } = CryptoState();

const fetchHistoricData = async () => {
  const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

setHistoricData(data.prices);
};

useEffect(() => {
 fetchHistoricData();

}, [currency, days]);

  return <div className={Classnames.container}></div>;

 
};

export default CoinInfo;