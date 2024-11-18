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

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
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
              <MenuItem value={""}>Brasil</MenuItem>
              <MenuItem value={"go"}>GO</MenuItem>
              <MenuItem value={"sp"}>SP</MenuItem>
              <MenuItem value={"mg"}>MG</MenuItem>
              <MenuItem value={"rj"}>RJ</MenuItem>
              <MenuItem value={"ba"}>BA</MenuItem>
              <MenuItem value={"rs"}>RS</MenuItem>
              <MenuItem value={"pr"}>PR</MenuItem>
              <MenuItem value={"pe"}>PE</MenuItem>
              <MenuItem value={"ce"}>CE</MenuItem>
              <MenuItem value={"pa"}>PA</MenuItem>
              <MenuItem value={"ma"}>MA</MenuItem>
              <MenuItem value={"sc"}>SC</MenuItem>
              <MenuItem value={"pb"}>PB</MenuItem>
              <MenuItem value={"es"}>ES</MenuItem>
              <MenuItem value={"am"}>AM</MenuItem>
              <MenuItem value={"al"}>AL</MenuItem>
              <MenuItem value={"pi"}>PI</MenuItem>
              <MenuItem value={"rn"}>RN</MenuItem>
              <MenuItem value={"mt"}>MT</MenuItem>
              <MenuItem value={"df"}>DF</MenuItem>
              <MenuItem value={"ms"}>MS</MenuItem>
              <MenuItem value={"se"}>SE</MenuItem>
              <MenuItem value={"ro"}>RO</MenuItem>
              <MenuItem value={"to"}>TO</MenuItem>
              <MenuItem value={"ac"}>AC</MenuItem>
              <MenuItem value={"ap"}>AP</MenuItem>
              <MenuItem value={"rr"}>RR</MenuItem>
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
