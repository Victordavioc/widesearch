import { Opacity } from "@mui/icons-material";
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

const Produtos: FC<ProdutosProps> = ({ name, image_url, price, link }) => {
  const classes = useStyles();

  return (
    <div className={classes.divPrincipal}>
      <img src={image_url} alt={name} className={classes.image} />
      <div className={classes.divName}>
        <h2 className={classes.name}>{name}</h2>
      </div>
      <div className={classes.divPrice}>
        <h3 className={classes.price}>{price},00</h3>
      </div>
      <div className={classes.divvermais}>

      </div>
      <a className={classes.vermais} href={link} target="_blank" rel="noreferrer">
        ver no site
      </a>
    </div>
  );
};

export default Produtos;
