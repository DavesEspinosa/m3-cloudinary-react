import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";


function Home() {
  return (
    <>
      <Link to={"/signup"}>
        <div style={{ marginBottom: "4em" }}>
          <Button color="primary">Sign Up</Button>
        </div>
      </Link>
      <Link to={"/login"}>
        <div>
          <Button color="primary">Log In</Button>
        </div>
      </Link>
    </>
  );
}

export default Home;
