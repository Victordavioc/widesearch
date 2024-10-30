import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { defaultTheme } from "../theme/theme";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  divPrincipal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  titulo: {
    fontSize: "4rem",
    fontWeight: "100",
    [defaultTheme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  barradePesquisa: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "65%",
    maxWidth: "600px",
  },
}));

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <div className={classes.divPrincipal}>
      <h1 className={classes.titulo}>Wide Search</h1>
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
          placeholder="Digite sua busca... "
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon onClick={() => navigate("/results")} />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchPage;
