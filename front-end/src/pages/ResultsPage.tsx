import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import Produtos from "../components/produtos/Produtos";
import { useState } from "react";
import { axiosClient } from "../utils/axios";

interface Anuncio {
  Título: string;
  Preço: string;
  Link: string;
  Imagem: string;
}

// Função de busca usando Axios
const fetchAnuncios = async (produto: string): Promise<Anuncio[]> => {
  // Substitua pela sua constante de chave de token
  const response = await axiosClient.get(
    `/anuncios?pesquisa=${encodeURIComponent(produto)}`
  );
  return response.data; // Retorna os dados diretamente
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    height: "120px",
    width: "100%",
    background: "#4454ff",
    justifyContent: "center",
    gap: "6%",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  barradePesquisa: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "45%",
    maxWidth: "400px",
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
}));

const ResultsPage: React.FC = () => {
  // Estado para gerenciar o termo de busca
  const classes = useStyles();
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // termo de busca efetivo
  const {
    data: anuncios = [],
    isLoading,
    error,
  } = useQuery<Anuncio[], Error>({
    queryKey: ["anuncios", searchTerm],
    queryFn: () => fetchAnuncios(searchTerm || ""), // Fornece uma string vazia se `termoDeBusca` for null
    enabled: !!searchTerm, // Essa configuração só é aplicada se termoDeBusca não for vazio
  });

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(termoDeBusca); // Atualiza apenas o conteúdo abaixo do header
  };

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <h1
            style={{
              color: "white",
              fontWeight: 100,
              marginBottom: "-0.2rem",
              fontSize: "2rem",
            }}
          >
            Wide
          </h1>
          <h1
            style={{
              color: "#000000B5",
              fontWeight: 100,
              marginTop: "-0.2rem",
              fontSize: "2rem",
            }}
          >
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
          <IconButton type="submit" aria-label="search" sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </header>
      <div className={classes.divCards}>
        <div className={classes.divMap}>
          {isLoading ? (
            <p>Carregando...</p>
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
