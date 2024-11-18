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
import olxLogo from "../olx-logo.svg"
import logo from '../logo.png'

interface Anuncio {
  Título: string;
  Preço: string;
  Link: string;
  Imagem: string;
}

// Função de busca usando Axios
const fetchAnuncios = async (
  produto: string,
  estado?: string
): Promise<Anuncio[]> => {
  // Monta a URL com ou sem o estado, dependendo da presença do parâmetro
  const query = estado
    ? `/anuncios?pesquisa=${encodeURIComponent(
        produto
      )}&estado=${encodeURIComponent(estado)}`
    : `/anuncios?pesquisa=${encodeURIComponent(produto)}`;

  const response = await axiosClient.get(query);
  return response.data; // Retorna os dados diretamente
};
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  background-color: rgb(65, 154, 225);
  color: white;
  border: none;
  border-radius: 5px;
  height: 50px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: 0.3s;

  }
`;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: "100vh",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  barradePesquisa: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "space",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "45%",
    maxWidth: "400px",
    height: "30vh",
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
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 0fr))",
    gap: "2rem",
    marginTop: "1rem",
    maxWidth: "100%",
  },
  cardSkeleton: {
    width: 300,
    height: 400,
  },
}));

const ResultsPage: React.FC = () => {
  // Estado para gerenciar o termo de busca
  const classes = useStyles();
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // termo de busca efetivo
  const [estado, setEstado] = React.useState("");
  const [searchState, setSearchState] = React.useState(""); // termo de busca efetivo
  const handleChange = (event: SelectChangeEvent) => {
    setEstado(event.target.value as string);
  };
  const {
    data: anuncios = [],
    isLoading,
    error,
  } = useQuery<Anuncio[], Error>({
    queryKey: ["anuncios", searchTerm, searchState],
    queryFn: () => fetchAnuncios(searchTerm || "", searchState), // Fornece uma string vazia se `termoDeBusca` for null
    enabled: !!searchTerm, // Essa configuração só é aplicada se termoDeBusca não for vazio
  });

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(termoDeBusca); // Atualiza apenas o conteúdo abaixo do header
    setSearchState(estado); // Atualiza o termo de busca efetivo
  };

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <h1 style={{ color: "black", fontWeight: 100, fontSize: "2rem" }}>
          Wide
        </h1>
        <h1 style={{ color: "black", fontWeight: 100, fontSize: "2rem" }}>
          Search
        </h1>
      </div>
      <Paper
        component="form"
        className={classes.barradePesquisa}
        onSubmit={handleSearchSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={termoDeBusca}
          onChange={(e) => setTermoDeBusca(e.target.value)}
          placeholder="Digite sua busca..."
          inputProps={{ "aria-label": "search" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" aria-label="search" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <div className={classes.divCards}>
        <div className={classes.divMap}>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonProdutos key={index} />
            ))
          ) : error ? (
            <p>Erro ao carregar os dados: {}</p>
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
