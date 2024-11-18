import { Opacity } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FC } from "react";

const useStyles = makeStyles(() => ({
  divPrincipal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "270px",
    height: "450px",
    paddingTop: "10px",
    cursor: "pointer",
    backgroundColor: "white",
    border: "1px solid #D3D3D3",
    borderRadius: "10px",
    transition: "all 0.3s",
    

    "&:hover": {
      transform: "scale(1.005)",
      opacity: "0.95",
      transition: "all 0.3s",
    },
    
  },
  image: {
    width: "248px",
    height: "200px",
    objectFit: "cover",
    aspectRatio: "1/2",

  },
  divName: {
    padding: "10px",
    display: "flex",
    width: "100%",
    alignItems: "start",
    justifyContent: "start",
    height: "100px",
  },
  name: {
    fontSize: "1rem",
    fontWeight: "500",
    maxHeight: "100px",
    wordWrap: "break-word", // Adiciona quebra de linha para palavras longas
    wordBreak: "break-word", // Adiciona quebra para palavras contínuas
    width: "240px", // Remove a largura fixa para permitir ajuste dinâmico
  },
  price: {
    textAlign: "start",
    color: "black",
  },
  divPrice: {
    display: "flex",
    width: "100%",
    alignItems: "start",
    justifyContent: "start",
    padding: "10px",
  },
  vermais: {
    backgroundColor: "lightgray",
    width: "100%",
    textDecoration: "none",
    color: "black",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "10px",
    transition: "all 0.3s",
    borderBottomLeftRadius: "10px ",
    borderBottomRightRadius: "10px",
    "&:hover": {
      color: "lightblue",
      transition: "all 0.3s",

    },
    divvermais: {
      backgroundColor: "lightgray",
    }
  }
}));

interface ProdutosProps {
  name: string;
  image_url: string;
  price: string;
  link: string;
  id: number;
}

const SkeletonProdutos = () => {
  const classes = useStyles();

  return (
    <div className={classes.divPrincipal}>
      <Skeleton variant="rectangular" width={248} height={200}/>
      <div className={classes.divName}>
        <Skeleton variant="text" width={240}/>
      </div>
      <div className={classes.divPrice}>
        <Skeleton variant="text" width={50}/>
      </div>
      <div >

      </div>
      <Skeleton variant="rectangular" width={270} height={40}/>
    </div>
  );
};

export default SkeletonProdutos;
