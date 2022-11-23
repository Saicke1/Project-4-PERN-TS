import React, { createContext, useState } from 'react';

const url = "http://localhost:5000";

export const userCommentsContext = createContext();

const CommentContext = (props) => {

    const [stars, setStars] = useState(0);
    const user_id = 1;

    const createComment = async (comment, hotel_id) => {
       /* Get every data
        console.log('stars in CommentContext', stars);
        console.log('comment in CommentContext', comment);
        console.log('hotelid in CommentContext', hotelid);
        console.log('userid in CommentContext', userid); */

        const rating = stars;
        const comment_text = comment;
        const body = {comment_text, rating, user_id, hotel_id};

        const fetchSettings = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          }
          const res = await fetch(`${url}/comment/create`, fetchSettings);
          /* in res.json() wird durch backend wird bestimmt, dass ich success, email und jwt bekomme*/
          /* const { success, error, jwt } = await res.json(); */
          const finalRes = await res.json();
          /* return { success, error } */
          console.log('finalRes', finalRes);
          if (finalRes){
            setStars(0);
          }
    }

  return (
    <div>
      <userCommentsContext.Provider value={{ stars, setStars, createComment }}>
        {props.children}
      </userCommentsContext.Provider>
    </div>
  )
}

export default CommentContext;
