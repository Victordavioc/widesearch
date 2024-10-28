import { makeStyles } from "@mui/styles";
import { FC } from "react";

const useStyles = makeStyles(() => ({
  divPrincipal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "300px",
    height: "450px",
    cursor: "pointer",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  image: {
    width: "298px",
    height: "298px",
    objectFit: "contain",
  },
  divName: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginTop: "1 rem",
    textAlign: "center",
    wordWrap: "break-word", // Adiciona quebra de linha para palavras longas
    wordBreak: "break-word", // Adiciona quebra para palavras contínuas
    width: "270px", // Remove a largura fixa para permitir ajuste dinâmico
  },
}));

interface CustomPrintCardProps {
  id: number;
  name: string;
  image_url: string;
}

const CustomPrintCard: FC<CustomPrintCardProps> = ({ name, image_url }) => {
  const classes = useStyles();

  return (
    <div className={classes.divPrincipal}>
      <img src={image_url} alt={name} className={classes.image} />
      <div className={classes.divName}>
        <h2 className={classes.name}>{name}</h2>
      </div>
    </div>
  );
};

export default CustomPrintCard;
