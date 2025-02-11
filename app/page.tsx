import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <>
      <h1>Hello Astolfo and Sushi!</h1>
      <img
        src="https://i.imgur.com/XNt8yrI.jpeg"
        alt="My cats Astolfo and Sushi"
        width={500}
      />
      <div className="mt-4">
        <Link href="/add/add-recipe">
          Add New Recipe
        </Link>
      </div>
    </>
  );
};

export default Home;
