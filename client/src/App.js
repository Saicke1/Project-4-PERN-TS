import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Layout from "./views/Layout";
import NoPage from "./views/NoPage";
import Homepage from "./components/homepage/Homepage";
import ListPage from "./components/listPage/ListPage";

const theme = createTheme({
  typography: {
    fontFamily: ["Dancing Script", "cursive"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="AppContainer">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="listHotels" element={<ListPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
