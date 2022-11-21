import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Layout from "./views/Layout";
import NoPage from "./views/NoPage";
import Homepage from "./components/homepage/Homepage";
import ListPage from "./components/hotelsListPage/HotelsListPage";
import ProfilePage from "./components/userPages/profilePage/ProfilePage";
import DetailsPage from "./components/detailsPage/DetailsPage";
import LogoutPage from "./components/userPages/logoutPage/LogoutPage";
import LoginPage from "./components/userPages/loginPage/LoginPage";
import RegistrationPage from "./components/userPages/registrationPage/RegistrationPage";
import AuthContext from "./components/context/AuthContext";
import UpdatePage from "./components/userPages/updatePage/UpdatePage";
/* import AuthContextTS from "./components/context/AuthContextTS.tsx"; */

const theme = createTheme({
  typography: {
    fontFamily: ["Dancing Script", "cursive"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="AppContainer">
        <AuthContext>
        {/* <AuthContextTS> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="listHotels" element={<ListPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="details/:userId" element={<DetailsPage />} />
              <Route path="logout" element={<LogoutPage/>} />
              <Route path="login" element={<LoginPage/>} />
              <Route path="registration" element={<RegistrationPage/>} />
              <Route path="update" element={<UpdatePage/>} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        {/* </AuthContextTS> */}
        </AuthContext>
      </div>
    </ThemeProvider>
  );
}

export default App;
