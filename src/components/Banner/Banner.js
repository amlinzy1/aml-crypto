import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';


const useStyles=makeStyles(() => ({
 banner: {
    backgroundImage: "url(./clouds-sky-anime.jpg)",
 },
 bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
 },
 tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    textAlign: "center",
 },
}));

const Banner = () => {
  const classes = useStyles();
  
  return (

   <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
        <Typography
        variant="h2"
        style={{
            fontWeight: "bold",
            color: "blueviolet",
            marginBottom: 15,
            fontFamily: "Space Grotesk",
        }}
       >
         AML Crypto
       </Typography> 
       <Typography
        variant="subtitle2"
        style={{
            color: "white",
            textTransform: "capitalize",
            fontFamily: "Space Grotesk",
        }}
       >
         Don't just settle for any Crypto, go AML Crypto
         </Typography>
        </div>
        <Carousel />
      </Container>
  </div>
  );
};

export default Banner;
