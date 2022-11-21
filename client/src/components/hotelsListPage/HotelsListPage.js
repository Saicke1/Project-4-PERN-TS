import React, { useState } from "react";
import FetchHotelsList from "./fetchHotelsList/FetchHotelsList";
import "./HotelsListPage.css";
import Typography from "@material-ui/core/Typography";

const ListPage = () => {
  const [hotelname, setHotelName] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const body = { hotelname };
      const response = await fetch("http://localhost:5000/hotel/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      /*  if (response.ok) {
        getHotels();
      } */
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="hotelsListContainer">
      <Typography variant="h3" gutterBottom className="colorTitle">
        Our Happy Hotels
      </Typography>
      <FetchHotelsList />
    </div>
  );
};

export default ListPage;
