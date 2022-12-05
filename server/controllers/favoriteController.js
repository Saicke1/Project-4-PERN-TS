import client from "../dbConfig.js";

//GET ALL THE FAVORITES FROM ONE USER
export const getAllFavs = async (req, res) => {
    try {
        const getFavorites = await client.query(`SELECT fav_id, hotel_id, user_id
        FROM favorites
        WHERE user_id = $1`, [req.user.user_id]);
        console.log('getFavorites', getFavorites);
        res.json(getFavorites.rows);
    } catch (error) {
        console.log('error.message', error.message);
        console.log("The favoriteController wasn't able to get your favorites.")
    }
};

//GET THE HOTEL IDs FROM THE FAVORITES FROM ONE USER
export const getHotelFavs = async (req, res) => {
    try {
        const getHotelFavorites = await client.query(`SELECT hotel_id
        FROM favorites
        WHERE user_id = $1`, [req.user.user_id]);
        console.log('getHotelFavorites', getHotelFavorites);
        res.json(getHotelFavorites.rows);
    } catch (error) {
        console.log('error.message', error.message);
        console.log("The favoriteController wasn't able to get your favorites.")
    }
};

//CREATE A NEW FAVORITE
export const createFav = async (req, res) => {
    try {
        const userid = req.user.user_id;
        const { hotel_id } = req.body;
        const newFavorite = await client.query(`INSERT INTO favorites (user_id, hotel_id)
                                          VALUES ($1,$2) RETURNING *`, [userid, hotel_id]);
        res.json(newFavorite.rows[0]);
    } catch (error) {
        console.log('error.message', error.message);
        console.log("The favoriteController wasn't able to create your favorite.");
    }
};

//REMOVE A FAVORITE
export const removeFav = async (req, res) => {
    try {
        const userid = req.user.user_id;
        const { hotel_id } = req.body;
        const removeFav = await client.query(`DELETE FROM favorites
                                               WHERE user_id = $1
                                               AND hotel_id = $2 RETURNING *`, [userid, hotel_id]);

      if(removeFav.rows.length === 0){
        return res.json("This favroite is not your favorite.");
      }
     
        res.json("The favorite was removed.");
    } catch (error) {
        console.log('error.message', error.message);
        console.log("The favoriteController wasn't able to remove your favorite.");
    }
};

//GET THE FAVORITES AND THE HOTELDATA FROM ONE USER
export const hotelDataFavs = async (req, res) => {
    try {
        const favHotelData = await client.query(
            `SELECT *
            FROM favorites
            LEFT OUTER JOIN hotels
            ON favorites.hotel_id = hotels.hotelid
            WHERE user_id = $1
            ORDER BY hotels.hotelname;`, [req.user.user_id]);
        res.status(200).json(
            favHotelData.rows,
          );
    } catch (error) {
        console.log('error.message', error.message);
        console.log("The favoriteController wasn't able to get your favorites with the hotel data.");
    }
}