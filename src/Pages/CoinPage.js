import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress, Typography } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from '../components/Banner/Carousel';
import HtmlParser from 'react-html-parser';
import { makeStyles } from '@material-ui/styles';

const CoinPage = () => {
const { id } = useParams();
const [coin, setCoin] = useState();

const { currency, symbol } = CryptoState();

const fetchCoin = async() => {
  const { data } = await axios.get(SingleCoin(id));

  setCoin(data);
};

console.log(coin);

useEffect(() => {
  fetchCoin();
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
  },
  sidebar: {
     width: "30%",
     
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Space Grotesk",
  },
}));

const classes = useStyles();

if (!coin) return <LinearProgress style={{ backgroundColor: "purple" }} />;

  return (
   <div className={classes.container}>
     <div className={classes.sidebar}>
    <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
           <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {HtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.heading}>
            Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
            variant="h5"
            style={{
              fontFamily: "Space Grotesk",
            }}
            >
             {coin?.market_cap_rank}
            </Typography>
        </span>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.heading}>
             Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
            variant="h5"
            style={{
              fontFamily: "Space Grotesk",
            }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
             )}
            </Typography>
        </span>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.heading}>
            Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
            variant="h5"
            style={{
              fontFamily: "Space Grotesk",
            }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
        </span>
        </div>
    </div>

 <CoinInfo coin={coin} />
</div>
  );
};

export default CoinPage;