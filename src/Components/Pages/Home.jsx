import React from "react";
import Navbar from "../Navbars/Navbar";
import Main from "../Main/Main";

const Home = () => {
  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>
      <div className="flex bg-white-100">
        <div className="flex-auto w-full absolute top-14 mt-20 bg-white rounded-xl">
          <div className="w-[80%] mx-auto mb-10">
            <Main></Main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
