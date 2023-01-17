import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, makeStyles   } from '@material-ui/core';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Classnames } from 'react-alice-carousel';


const CoinsTable = () => {
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);
const [search, setSearch] = useState("");
const navigate = useNavigate();

 const { currency } = CryptoState();

const fetchCoins = async() => {
    setLoading(true);
    const  { data }  = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
};

console.log(coins);
 
useEffect(() => {
    fetchCoins();
}, [currency]);

const handleSearch= () => {
    return coins.filter(
        (coin) => 
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
};
   
  return (
     <Container style={{ textAlign: "center" }}>
        <Typography
        variant="h4"
        style={{ margin: 18, fontFamily: "Space Grotesk" }}
        >
         Crypto Prices by Market Cap
        </Typography>

        <TextField 
        label="Crypto Currencies.." 
        variant="outlined" 
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
          />

        <TableContainer>
            {
                loading ? (
                     <LinearProgress style={{ backgroundColor: "purple" }} />
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor: "#9e55cf" }}>
                           <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                              <TableCell
                              style={{
                                color: "black",
                                fontWeight: "700",
                                fontFamily: "Space Grotesk",
                              }}
                              key={head}
                              align={head === "Coin" ? "" : "right"}
                              >
                                {head}
                              </TableCell>  
                            ))}
                           </TableRow>
                           </TableHead>
                                           
                        <TableBody>
                        {handleSearch().map((row) => {
                          const profit = row.price_change_percentage_24th > 0;
                              
                          return (
                            <TableRow
                            onClick={() => navigate(`/coins/${row.id}`)}
                            className={Classnames.row}
                            key={row.name}
                            >
                               <TableCell 
                               component="th"
                               scope="row"
                               styles={{
                                display: "flex",
                                gap: 15,
                               }}
                               >
                                <img
                                  src={row.image}
                                  alt={row.name}
                                  height="50"
                                  style={{ marginBottom: 10 }}
                                />
                                 <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "black" }}>
                              {row.name}
                            </span>
                          </div>
                               </TableCell>
                            </TableRow>
                          );
                        })}
                        </TableBody>
                    </Table>
            )}
        </TableContainer>
     </Container>   
  );
};

export default CoinsTable;
