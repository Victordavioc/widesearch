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
    width: "clamp(300px, 30vw, 500px)"
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
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
    maxWidth: "100%",
  },
  cardSkeleton: {
    width: 300,
    height: 401,
  },
  logocontainer:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "2rem 1rem",
  },
  engine: {
    width: "50px",
    marginLeft: "1rem"
  },
  engineContainer: {
    display: "flex"
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
      <div className={classes.engineContainer}>
      <p>pesquisando anúncios da plataforma</p><img src={olxLogo} alt="" className={classes.engine}/>
      </div>
      <form
    className={classes.barradePesquisa}
    onSubmit={handleSearchSubmit}
  >
    <InputBase
      sx={{  border: '1px solid #ced4da', borderRadius: '5px', width: '100%', height: '60px', padding: '0 10px' }}
      value={termoDeBusca}
      onChange={(e) => setTermoDeBusca(e.target.value)}
      placeholder="Digite sua busca"
    />

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

    <Button type="submit" >Pesquisar</Button>
  </form >

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
