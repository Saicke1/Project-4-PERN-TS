import React, { useState, useContext } from 'react';
import "./UpdatePage.css";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

const UpdatePage = () => {

  const { update } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  function handleSubmit(e){
    e.preventDefault();
  };

  const handleUpdate = () => {
    update(nickname);
  };

  console.log('email', email);
  console.log('nickname', nickname);

  return (
    <div>
      Update Page
      <form onSubmit={handleSubmit}>
        <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" value={nickname} placeholder="nickname" onChange={(e) => setNickname(e.target.value)}/>
        <Link to="/profile">
          <button onClick={handleUpdate}>Update me</button>
        </Link>
      </form>
    </div>
  )
}

export default UpdatePage
