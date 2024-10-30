import { makeStyles } from "@mui/styles";
import { FC } from "react";

const useStyles = makeStyles(() => ({
  divPrincipal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "250px",
    height: "450px",
    cursor: "pointer",
    backgroundColor: "white",
    borderRadius: "10px",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
    border: "1px solid #111111",
  },
  image: {
    width: "248px",
    height: "248px",
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  divName: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
  },
  name: {
    fontSize: "1rem",
    fontWeight: "bold",
    maxHeight: "100px",
    marginTop: "1 rem",
    textAlign: "center",
    wordWrap: "break-word", // Adiciona quebra de linha para palavras longas
    wordBreak: "break-word", // Adiciona quebra para palavras contínuas
    width: "240px", // Remove a largura fixa para permitir ajuste dinâmico
  },
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
      <h3>{price},00</h3>
      <a href={link} target="_blank" rel="noreferrer">
        Ver mais
      </a>
    </div>
  );
};

export default Produtos;
