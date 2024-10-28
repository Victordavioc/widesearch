import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

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
}));

const ResultsPage: React.FC = () => {
  const classes = useStyles();

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
            placeholder="Digite sua busca... "
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </header>
    </div>
  );
};

export default ResultsPage;
