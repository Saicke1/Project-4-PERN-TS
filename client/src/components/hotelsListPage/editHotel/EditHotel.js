import React, { Fragment, useState } from "react";
import "./EditHotel.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditHotel = ({ hotel }) => {
  const [hotelname, setHotelName] = useState(hotel.hotelname);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //edit hotel name
  const updateHotelName = async (e) => {
    e.preventDefault();

    try {
      const body = { hotelname };
      const response = await fetch(
        `http://localhost:5000/hotel/${hotel.hotelid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      /* console.log(response); */
      window.location = "/listHotels";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id={`id${hotel.hotelid}`}
        onClick={() => setHotelName(hotel.hotelname)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please update the hotelname
          </Typography>
          <p>You can overwrite it</p>
          <input
            type="text"
            value={hotelname}
            onChange={(e) => setHotelName(e.target.value)}
          />
          <Button onClick={(e) => updateHotelName(e)}>Change</Button>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default EditHotel;
