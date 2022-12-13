import React, { createContext, useState } from 'react';

/* const url = "http://localhost:5000"; */
const url = "https://pern-delta.vercel.app";

export const userFavContext = createContext();

const FavoriteContext = (props) => {
    const getToken = localStorage.getItem("token");
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [hotelDataFavs, setHotelDataFavs] = useState([]);

    //GET ALL THE FAVORITES
    const getMyFavorites = async () => {
        try {
          const newArray = [];
            const requestOptions = {
                method: 'GET',
                headers: {"Authorization": `Bearer ${getToken}`}
            };
            const response = await fetch(`${url}/favorites/hotelfavs`, requestOptions);
            const jsonData = await response.json();
            jsonData.map(each => {
              newArray.push(each.hotel_id);
            })
            setFavoriteIds(newArray);
        } catch (error) {
          console.log('error.message', error.message);
          console.log("Wasn't able to fetch the favroites due to Server Error. Favoritecontext failed.");
        }
    };

    //ADD A FAVORITE
    const addFavorites = async (id) => {
      try {
        const hotel_id = id;
        const body = {hotel_id};
        const requestOptions = {
          method: 'POST',
          headers: {"Authorization": `Bearer ${getToken}`,
                    "Content-Type": "application/json"},
          body: JSON.stringify(body)
        };
        const response = await fetch(`${url}/favorites/create`, requestOptions);
        const jsonData = await response.json();
        getMyFavorites();
        getHotelDataFavs();
      } catch (error) {
        console.log('error.message', error.message);
        console.log("Wasn't able to add the favroite due to Server Error. Favoritecontext failed.");
      }
    };

    //REMOVE A FAVORITE
    const removeFavorite = async (id) => {
      try {
        const hotel_id = id;
        const body = {hotel_id};
        const requestOptions = {
          method: 'DELETE',
          headers: {"Authorization": `Bearer ${getToken}`,
                    "Content-Type": "application/json"},
          body: JSON.stringify(body)
        };
        const response = await fetch(`${url}/favorites/remove`, requestOptions);
        const jsonData = await response.json();
        getMyFavorites();
        getHotelDataFavs();
      } catch (error) {
        console.log('error.message', error.message);
        console.log("Wasn't able to remove the favroite due to Server Error. Favoritecontext failed.");
      }
    };

    //GET HOTELDATA FROM ONE USER AND HIS FAVORITES
    const getHotelDataFavs = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {"Authorization": `Bearer ${getToken}`}
      };
      const response = await fetch(`${url}/favorites/hoteldata`, requestOptions);
      const jsonData = await response.json();
      setHotelDataFavs(jsonData);
      } catch (error) {
        console.log('error.message', error.message);
        console.log("Wasn't able to fetch the Hoeldata of your favroites due to Server Error. Favoritecontext failed.");
      }
    }

  return (
    <div>
      <userFavContext.Provider value={{
        favoriteIds, addFavorites, removeFavorite, getMyFavorites, getHotelDataFavs, hotelDataFavs }}>
        {props.children}
      </userFavContext.Provider>
    </div>
  )
}

export default FavoriteContext
