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
    setSearchState(estado); // Atualiza o termo de busca efetivo
  };
  const [estado, setEstado] = React.useState("");
  const [searchState, setSearchState] = React.useState(""); // termo de busca efetivo
  const handleChange = (event: SelectChangeEvent) => {
    setEstado(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <h1
          style={{
            color: "black",
            fontWeight: 100,
            marginBottom: "-0.2rem",
            fontSize: "2rem",
          }}
        >
          Wide
        </h1>
        <h1
          style={{
            color: "black",
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
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="submit"
          aria-label="search"
          sx={{ p: "0px", minWidth: "100px" }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brasil</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={estado}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={0}>Brasil</MenuItem>
              <MenuItem value={10}>GO</MenuItem>
              <MenuItem value={20}>SP</MenuItem>
              <MenuItem value={30}>MG</MenuItem>
              <MenuItem value={40}>RJ</MenuItem>
              <MenuItem value={50}>BA</MenuItem>
              <MenuItem value={60}>RS</MenuItem>
              <MenuItem value={70}>PR</MenuItem>
              <MenuItem value={80}>PE</MenuItem>
              <MenuItem value={90}>CE</MenuItem>
              <MenuItem value={100}>PA</MenuItem>
              <MenuItem value={110}>MA</MenuItem>
              <MenuItem value={120}>SC</MenuItem>
              <MenuItem value={130}>PB</MenuItem>
              <MenuItem value={140}>ES</MenuItem>
              <MenuItem value={150}>AM</MenuItem>
              <MenuItem value={160}>AL</MenuItem>
              <MenuItem value={170}>PI</MenuItem>
              <MenuItem value={180}>RN</MenuItem>
              <MenuItem value={190}>MT</MenuItem>
              <MenuItem value={200}>DF</MenuItem>
              <MenuItem value={210}>MS</MenuItem>
              <MenuItem value={220}>SE</MenuItem>
              <MenuItem value={230}>RO</MenuItem>
              <MenuItem value={240}>TO</MenuItem>
              <MenuItem value={250}>AC</MenuItem>
              <MenuItem value={260}>AP</MenuItem>
              <MenuItem value={270}>RR</MenuItem>
            </Select>
          </FormControl>
        </IconButton>
        <IconButton type="submit" aria-label="search" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>

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
