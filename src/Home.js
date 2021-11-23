import React from "react";
import Shelf from "./Shelf";

const Home = ({ books, handleMoveTo }) => {
    return (
        <main className="home">
            <Shelf books={books} handleMoveTo={handleMoveTo} shelf={"currentlyReading"} title={"Currently Reading"} />
            <Shelf books={books} handleMoveTo={handleMoveTo} shelf={"wantToRead"} title={"Want To Read"} />
            <Shelf books={books} handleMoveTo={handleMoveTo} shelf={"read"} title={"Read"} />
        </main>
    )
}

export default Home;
