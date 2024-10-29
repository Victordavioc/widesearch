import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@mui/material";
import Produtos from "../components/produtos/Produtos";
import { useState } from "react";

interface Anuncio {
  Título: string;
  Preço: string;
  Link: string;
}

// Função de busca usando Axios
const fetchAnuncios = async (produto: string): Promise<Anuncio[]> => {
  const response = await fetch(
    `http://localhost:3000/api/anuncios?pesquisa=${encodeURIComponent(produto)}`
  );
  if (!response.ok) throw new Error(`Erro: ${response.status}`);
  return response.json();
};

interface AnunciosComponentProps {}

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
  },
  divMap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(295px, 0fr))",
    gap: "2rem",
    marginTop: "1rem",
    maxWidth: "100%",
  },
}));

const ResultsPage: React.FC = () => {
  const classes = useStyles();

  // Estado para gerenciar o termo de busca
  const [termoDeBusca, setTermoDeBusca] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(""); // Estado para o valor do input

  const {
    data: anuncios = [],
    isLoading,
    error,
  } = useQuery<Anuncio[], Error>({
    queryKey: ["anuncios", termoDeBusca],
    queryFn: () => fetchAnuncios(termoDeBusca || ""), // Fornece uma string vazia se `termoDeBusca` for null
    enabled: !!termoDeBusca, // Essa configuração só é aplicada se termoDeBusca não for vazio
  });

  const handleSearch = () => {
    setTermoDeBusca(inputValue); // Atualiza o termo de busca com o valor do input
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch(); // Atualiza o termo de busca ao pressionar Enter
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os dados: {error.message}</p>;

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
          sx={{
            borderRadius: "15px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Digite sua busca..."
            inputProps={{ "aria-label": "search" }}
            value={inputValue} // Controla o valor do input
            onChange={(e) => setInputValue(e.target.value)} // Atualiza o estado ao digitar
            onKeyDown={handleKeyDown} // Manipulador para pressionar a tecla Enter
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon onClick={handleSearch} />
          </IconButton>
        </Paper>
      </header>
      <Card className={classes.divCards}>
        <div className={classes.divMap}>
          {anuncios.map((anuncio, index) => (
            <div key={index} style={{ position: "relative" }}>
              <Produtos
                id={index}
                name={anuncio.Título}
                price={anuncio.Preço}
                image_url="https://via.placeholder.com/300"
                link={anuncio.Link}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ResultsPage;
