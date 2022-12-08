import React, { useContext } from "react";
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
import UpdatePage from "./components/userPages/updatePage/UpdatePage";
import CommentContext from "./components/context/CommentContext";
import { authContext } from "./components/context/AuthContext";
import FavoriteContext from "./components/context/FavoriteContext";
import Favoritepage from "./components/userPages/favoritePage/FavoritePage";
import CommentPage from "./components/userPages/commentPage/CommentPage";

const theme = createTheme({
  typography: {
    fontFamily: ["Dancing Script", "cursive"].join(","),
  },
});

function App() {
  const { isLoggedIn } = useContext(authContext);
  console.log('isLoggedIn from App.js', isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <div className="AppContainer">
          <CommentContext>
          <FavoriteContext>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="listHotels" element={<ListPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="details/:hotel_id" element={<DetailsPage />} />
              <Route path="logout" element={<LogoutPage/>} />
              <Route path="login" element={<LoginPage/>} />
              <Route path="registration" element={<RegistrationPage/>} />
              <Route path="update" element={<UpdatePage/>} />
              <Route path="favorites" element={<Favoritepage/>} />
              <Route path="comments" element={<CommentPage/>}/>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </FavoriteContext>
        </CommentContext>
      </div>
    </ThemeProvider>
  );
}

export default App;
