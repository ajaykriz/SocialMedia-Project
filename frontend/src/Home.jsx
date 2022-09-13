import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Rightbar from "./Rightbar";
import Feedbar from "./Feed";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React from "react";
import Add from "./Add";
const Home = ({ mode, setMode }) => {
  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode} />
        <Feedbar />
        <Rightbar />
      </Stack>
      <Add />
    </div>
  );
};

export default Home;
