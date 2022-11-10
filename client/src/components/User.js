import React from "react";

const User = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      /* const response = await fetch("http://localhost:5000/users/all");
      const jsonData = await response.json();
      console.log(jsonData);  */

      const result = await fetch(
        "http://localhost:5000/users/all",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      This is the User Page
      <button onClick={handleClick}>Click me for console.</button>
    </div>
  );
};

export default User;
