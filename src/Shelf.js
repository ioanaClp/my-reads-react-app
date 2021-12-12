import React from "react";
import Book from "./Book"
import PropTypes from 'prop-types';

const Shelf = ({ books, shelf, title, handleMoveTo }) => {
    return (
        <div>
            <h2 className="text-center p-3">{title}</h2>
            <div className="container">
                <div className="row">
                    <div className="row d-flex justify-content-center mb-3">
                        {books
                            .filter(book => shelf === book.shelf)
                            .map(book => {
                                return <Book key={book.id} book={book} handleMoveTo={handleMoveTo} />
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    book: PropTypes.object,
    shelf: PropTypes.string,
    title: PropTypes.string,
    handleMoveTo: PropTypes.func
};

export default Shelf;
