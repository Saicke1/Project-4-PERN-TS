import client from "../dbConfig.js";


//GET ALL COMMENTS
export const getAllComments = async (req, res) => {
  const { id } = req.params;
    try {
      const users = await client.query(`SELECT users.user_id, email , nickname , picture , comment_id, comment_text, comment_title, rating, comment_date
      FROM comments , users
      WHERE comments.hotel_id = $1 AND users.user_id = comments.user_id
      ORDER BY comments.comment_date`, [id]);
      res.status(200).json(
        users.rows,
      );
    } catch (error) {
      res.status(500).json({
        error: error,
        msg: "server failed",
      });
    }
  };

  //CREATE A COMMENT
  export const createComment = async (req, res) => {
    /* console.log('req.user', req.user); */

    /* EXAMPLE WHAT YOU SEE IN REQ.USER:
    req.user {
    user_id: 11,
    email: 'katia@mail.de',
    password: '$2b$10$8FqzqziINmNg7gjkd4vtE.PIqWorm4/K5TpGRwKh7dxFcjhgR0bha',
    nickname: 'Kati',
    picture: null,
    created_at: 2022-11-23T23:00:00.000Z,
    profiletext: null
    } */

    try {
      const userid = req.user.user_id;
    /* console.log('user', userid); */
    const { comment_text, rating, comment_title, hotel_id } = req.body
    const newComment = await client.query(`INSERT INTO comments (comment_text, rating, comment_title, hotel_id, user_id)
                                          VALUES ($1,$2,$3,$4,$5) RETURNING *`,
                                          [comment_text, rating, comment_title, hotel_id, userid]
        /* , (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "Database error",
            success: false
          })
        }
        else {
          res.status(200).send({
            success: true,
          });
        }
      } */);
      res.json(newComment.rows[0]);
    } catch (error) {
      console.log('error.message', error.message);
      res.status(500).send("Server Error.");
    }
  };

    //GET COMMENTS WRITTEN FROM ONE USER
    export const commentsFromOneUser = async (req, res) => {
      try {
        console.log('req', req.payload.email);
        const userComments = await client.query(`SELECT users.user_id, users.email, users.nickname, users.picture,
        comments.comment_id, comments.comment_text, comments.rating, comments.comment_date, comments.comment_title,
        comments.hotel_id FROM users
        JOIN comments ON users.user_id = comments.user_id
        WHERE email = $1;`, [req.payload.email]);
        console.log('userComments', userComments);
        res.json(userComments.rows);
      } catch (error) {
        console.log('error.message', error.message);
        res.status(500).send("Server Error.");
      }
    };

    //UPDATE A COMMENT
    export const updateComment = async (req, res) => {
      try {
        console.log('req.user', req.user);
        /* Beispiel was im req.user zu sehen ist, wenn du jwtAuth nutzt: (password nicht, weil ich das ausgeschlossen habe)
        req.user {
        user_id: 11,
        email: 'katia@mail.de',
        nickname: 'Kati',
        picture: 'https://staudt-gmbh.com/wp-content/uploads/2018/07/person-dummy-300x300.jpg',
        created_at: 2022-11-23T23:00:00.000Z,
        profiletext: null
      } */

        /* Beispiel was im req.payload zu sehen ist, wenn du authMiddleware nutzt:
        { email: 'katia@mail.de', userid: 11, iat: 1669622315 } */

        const { comment_id, comment_text, comment_title, rating } = req.body;

       const updateComment = await client.query(`UPDATE comments
                                                 SET comment_text = $1, comment_title = $2, rating = $3
                                                 WHERE comment_id = $4
                                                 AND user_id = $5 RETURNING *`,
                                                 [comment_text, comment_title, rating, comment_id, req.user.user_id]);
          if(updateComment.rows.length === 0){
            return res.json("This comment is not your comment.");
          }
         res.json("Comment was updated.");
      } catch (error) {
        console.log('error.message', error.message);
        res.status(500).send("Server Error.");
      }
    };

    //DELETE A COMMENT
    export const deleteComment = async (req, res) => {
      try {
        /* Beispiel was im req.user zu sehen ist, wenn du jwtAuth nutzt: (password nicht, weil ich das ausgeschlossen habe)
        console.log('req.user', req.user);
        req.user {
          user_id: 11,
          email: 'katia@mail.de',
          nickname: 'Kati',
          picture: 'https://staudt-gmbh.com/wp-content/uploads/2018/07/person-dummy-300x300.jpg',
          created_at: 2022-11-23T23:00:00.000Z,
          profiletext: null
        } */
      const { comment_id } = req.body;
      const eraseComment = await client.query(`DELETE FROM comments
                                               WHERE user_id = $1
                                               AND comment_id = $2 RETURNING *`, [req.user.user_id, comment_id]);

      if(eraseComment.rows.length === 0){
        return res.json("This comment is not your comment.");
      }
     
        res.json("The comment was deleted.");
      } catch (error) {
        console.log('error.message', error.message);
        res.status(500).send("Server Error.");
      }
    };