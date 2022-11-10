import React from "react";
import "./ListPage.css";

const ListPage = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return (
    <div>
      ListPage<button>Click me</button>
    </div>
  );
};

export default ListPage;
