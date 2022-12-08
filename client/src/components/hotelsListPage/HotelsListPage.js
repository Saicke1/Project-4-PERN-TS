import React from "react";
import FetchHotelsList from "./fetchHotelsList/FetchHotelsList";
import "./HotelsListPage.css";
import Typography from "@material-ui/core/Typography";

const ListPage = () => {
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
