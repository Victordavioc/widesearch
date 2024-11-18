import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import Produtos from "../components/produtos/Produtos";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { axiosClient } from "../utils/axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SkeletonProdutos from "../components/produtos/skeletonProdutos";

import logo from '../logo.png'

interface Anuncio {
  Título: string;
  Preço: string;
  Link: string;
  Imagem: string;
}

const fetchAnuncios = async (
  produto: string,
  estado?: string
): Promise<Anuncio[]> => {
  const query = estado
    ? `/anuncios?pesquisa=${encodeURIComponent(
        produto
      )}&estado=${encodeURIComponent(estado)}`
    : `/anuncios?pesquisa=${encodeURIComponent(produto)}`;

  const response = await axiosClient.get(query);
  return response.data;
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  logo: {
    width: "clamp(300px, 30vw, 500px)"
  },
  barradePesquisa: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "45%",
    maxWidth: "400px",
    height: "100px",
    gap: "1rem",
    textAlign: "center",
  },
  divCards: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    padding: "2rem 1rem",
    width: "100%",
    maxWidth: "1500px",
  },
  divMap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "1rem",
    maxWidth: "100%",
  },
  cardSkeleton: {
    width: 300,
    height: 400,
  },
  logocontainer:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "2rem 1rem",
  },
  button:{
    width: "100%",
    backgroundColor: "rgb(65, 154, 225)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    height: "40px",
  }
}));

const ResultsPage: React.FC = () => {
  const classes = useStyles();
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [estado, setEstado] = React.useState("");
  const [searchState, setSearchState] = React.useState("");
  
  const handleChange = (event: SelectChangeEvent) => {
    setEstado(event.target.value as string);
  };

  const {
    data: anuncios = [],
    isLoading,
    error,
  } = useQuery<Anuncio[], Error>({
    queryKey: ["anuncios", searchTerm, searchState],
    queryFn: () => fetchAnuncios(searchTerm || "", searchState),
    enabled: !!searchTerm,
  });

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(termoDeBusca);
    setSearchState(estado);
  };

  return (
    <div className={classes.root}>
      <div className={classes.logocontainer}>
        <img src={logo} alt="" className={classes.logo}/>
      </div>
      <form
    className={classes.barradePesquisa}
    onSubmit={handleSearchSubmit}
  >
    <InputBase
      sx={{  border: '1px solid #ced4da', borderRadius: '5px', width: '100%', height: '40px', padding: '0 10px' }}
      value={termoDeBusca}
      onChange={(e) => setTermoDeBusca(e.target.value)}
      placeholder="Digite sua busca"
    />
    <button type="submit" className={classes.button}>Pesquisar</button>
  </form>

      <div className={classes.divCards}>
        <div className={classes.divMap}>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProdutos key={index} />
            ))
          ) : error ? (
            <p>Erro ao carregar os dados</p>
          ) : (
            anuncios.map((anuncio, index) => (
              <Produtos
                key={index}
                id={index}
                name={anuncio.Título}
                price={anuncio.Preço}
                image_url={anuncio.Imagem}
                link={anuncio.Link}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
