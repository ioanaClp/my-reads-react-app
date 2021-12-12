import React from "react";
import Shelf from "./Shelf";
import PropTypes from 'prop-types';

const Home = ({ books, handleMoveTo }) => {
    return (
        <main className="home">
            <Shelf books={books} handleMoveTo={handleMoveTo} shelf={"currentlyReading"} title={"Currently Reading"} />
            <Shelf books={books} handleMoveTo={handleMoveTo} shelf={"wantToRead"} title={"Want To Read"} />
            <Shelf books={books} handleMoveTo={handleMoveTo} shelf={"read"} title={"Read"} />
        </main>
    )
}

Home.propTypes = {
    books: PropTypes.array,
    handleMoveTo: PropTypes.func
};

export default Home;
