import React, { createContext, useState } from 'react';

const url = "http://localhost:5000";

export const userCommentsContext = createContext();

const CommentContext = (props) => {

    const [stars, setStars] = useState(0);
    const [comments, setComments] = useState([]);
    const getToken = localStorage.getItem("token");

    //GET ALL THE COMMENTS
    const getAllComments = async (hotel_id) => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {"Authorization": `Bearer ${getToken}`}
        };
  
        const response = await fetch(`http://localhost:5000/comments/all/${hotel_id}`, requestOptions);
        const jsonData = await response.json();
        console.log('fetched data from the new comments route >>>', jsonData);
        setComments(jsonData);
      } catch (error) {
          console.log('error.message', error.message);
          console.log("Wasn't able to fetch the comments due to Server Error.")
      }
    };

    //CREATE A NEW COMMENT
    const createComment = async (comment, commentTitle, newHotelId) => {
      try {
        /* Änder die values in die Konstanten mit den richtigen Namen für die Tabelle um */
        const rating = stars;
        const comment_text = comment;
        const comment_title = commentTitle;
        const hotel_id = newHotelId;
        /* create the req.body for the backend */
        const body = {comment_text, rating, comment_title, hotel_id};

        const Settings = {
          method: "POST",
          headers: { "Authorization": `Bearer ${getToken}`, "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }

        const response = await fetch(`${url}/comments/create`, Settings);
        const jsonData = await response.json();
        console.log('jsonData', jsonData);
        setStars(0);
        getAllComments(hotel_id.toString());
      } catch (error) {
        console.log('error.message', error.message);
        console.log("No success, the comment wasn't created.")
      }
    };

    //DELETE A COMMENT
    const deleteComment = async (comment_id, hotel_id) => {
      try {
        const body = {comment_id};

        const settings = {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${getToken}`, "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }

        const response = await fetch(`${url}/comments/delete`, settings);
        const jsonData = await response.json();
        console.log('jsonData', jsonData);
        getAllComments(hotel_id);
      } catch (error) {
        console.log('error.message', error.message);
        console.log("The comment wasn't deleted. Something went wrong.");
      }
    }

    //UPDATE A COMMENT
    const updateComment = async (comment_id, comment, commentTitle, hotel_id) => {
      try {
        /* Änder die values in die Konstanten mit den richtigen Namen für die Tabelle um */
        const rating = stars;
        const comment_text = comment;
        const comment_title = commentTitle;
        /* create the req.body for the backend */
        const body = {comment_text, comment_title, rating, comment_id};

        const settings = {
          method: "PUT",
          headers: { "Authorization": `Bearer ${getToken}`, "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }

        const response = await fetch(`${url}/comments/update`, settings);
        const jsonData = await response.json();
        console.log('jsonData', jsonData);
        getAllComments(hotel_id);
      } catch (error) {
        console.log('error.message', error.message);
        console.log("The comment wasn't updatet. Something went wrong.");
      }
      
    }

  return (
    <div>
      <userCommentsContext.Provider value={{ stars, setStars, comments, getAllComments, createComment, deleteComment, updateComment }}>
        {props.children}
      </userCommentsContext.Provider>
    </div>
  )
}

export default CommentContext;
