import React, { useState } from "react";
import FetchHotelsList from "./fetchHotelsList/FetchHotelsList";
import "./HotelsListPage.css";

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
    <div>
      ListPage
      <form onSubmit={handleClick}>
        <input
          type="text"
          value={hotelname}
          onChange={(e) => setHotelName(e.target.value)}
        />
        <button>Click me</button>
      </form>
      <FetchHotelsList />
    </div>
  );
};

export default ListPage;
