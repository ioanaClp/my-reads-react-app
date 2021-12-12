import React, { useEffect } from "react";
import Book from "./Book";
import PropTypes from 'prop-types';

const Search = ({ search, setSearch, books, handleMoveTo }) => {

    // When this component is appearing initially we set the search to empty so we don't have old data
    useEffect(() => {
        setSearch("")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <form className="searchForm form-group" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search" className="form-control-plaintext mx-2">Search Book by Title or Author:</label>
                <input
                    id="search"
                    className="form-control mb-3"
                    style={{ fontSize: "24px" }}
                    type="text"
                    placeholder="Search Book..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <div className="container">
                <div className="row">
                    <div className="row d-flex justify-content-center my-3">
                        {books
                            .map(book => {
                                return <Book key={book.id} book={book} handleMoveTo={handleMoveTo} />
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

Search.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func,
    books: PropTypes.array,
    handleMoveTo: PropTypes.func
};

export default Search;
