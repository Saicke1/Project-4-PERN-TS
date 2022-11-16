import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditHotel from "../editHotel/EditHotel.js";
import "./FetchHotelsList.css";

const FetchHotelsList = () => {
  const [hotels, setHotels] = useState([]);

  //delete function
  const deleteHotel = async (id) => {
    try {
      const deleteHotel = await fetch(`http://localhost:5000/hotel/${id}`, {
        method: "DELETE",
      });

      /* console.log(deleteHotel); */
      if (deleteHotel.ok) {
        /* setHotels(hotels.filter(each => each.hotelid !== id)); */
        getHotels();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //get all Hotels
  const getHotels = async () => {
    try {
      const response = await fetch("http://localhost:5000/hotel/all");
      const jsonData = await response.json();
      setHotels(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div>
      List of Hotels
      <table>
        <thead>
          <tr>
            <th>Hotel</th>
            <th>update</th>
            <th>Delete</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => {
            return (
              <tr key={hotel.hotelid}>
                <td>{hotel.hotelname}</td>
                <td>
                  <EditHotel hotel={hotel} />
                </td>
                <td>
                  <button onClick={() => deleteHotel(hotel.hotelid)}>
                    Delete me
                  </button>
                </td>
                <td>
                  <Link to="/details">
                    <button>Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FetchHotelsList;
