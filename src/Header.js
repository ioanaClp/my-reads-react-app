import React from "react";
import { Link } from "react-router-dom";


const Header = ({ title, hasSearch, hasBackButton }) => {
    return (
        <nav className="header navbar navbar-expand-lg navbar-dark bg-dark">

            {hasBackButton && <Link to={"/"}>
                <button className="search-button btn btn-dark">
                    <i class="fas fa-arrow-left" style={{ fontSize: "18px" }}></i>
                </button>
            </Link>}

            <div className="container-fluid">
                <h3 className="text-light">{title}</h3>

                {hasSearch && <Link to={"/search"}>
                    <button className="search-button btn btn-dark">
                        <i class="fas fa-search" style={{ fontSize: "18px" }}></i>
                    </button>
                </Link>}

            </div>
        </nav>
    )
}

export default Header;
