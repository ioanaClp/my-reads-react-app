import React from "react";

const Book = ({ book, handleMoveTo }) => {
    let thumbnail = "";
    if (book.imageLinks && book.imageLinks.thumbnail) {
        thumbnail = book.imageLinks.thumbnail
    }

    return (
        <div className="card-goup m-3 p-2" style={{ width: "16rem", height: "auto", border: "3px groove #f0ad4e" }}>
            <div className="card border-0 book-img">
                <img
                    src={thumbnail}
                    alt={book.title}
                    className="card-img-top img-fluid"
                    style={{ width: "100%", height: "16rem", objectFit: "fill" }}
                ></img>
                <div className="dropdown d-flex justify-content-center">
                    <button
                        type="button"
                        className="move-btn btn btn-dark dropdown-toggle my-2"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >Move To </button>
                    <div className="dropdown-menu">
                        <div
                            style={{ cursor: "pointer" }}
                            className={`dropdown-item ${book.shelf === "currentlyReading" && "active"}`}
                            onClick={() => handleMoveTo(book, "currentlyReading")}
                        >Currently Reading</div>
                        <div
                            style={{ cursor: "pointer" }}
                            className={`dropdown-item ${book.shelf === "wantToRead" && "active"}`}
                            onClick={() => handleMoveTo(book, "wantToRead")}
                        >Want to Read</div>
                        <div
                            style={{ cursor: "pointer" }}
                            className={`dropdown-item ${book.shelf === "read" && "active"}`}
                            onClick={() => handleMoveTo(book, "read")}
                        >Read</div>
                        <div
                            style={{ cursor: "pointer" }}
                            className={`dropdown-item`}
                            onClick={() => handleMoveTo(book, "none")}
                        >None</div>
                    </div>
                </div>
            </div>
            <div className="container p-2 text-center">
                <h6 className="text-warning my-2">{book.title}</h6>
                <p style={{ fontSize: "12px" }}>{book.authors}</p>
            </div>
        </div>
    )
}

export default Book;
