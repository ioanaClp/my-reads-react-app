import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const Header = ({ title, hasSearch, hasBackButton }) => {
    return (
        <nav className="header navbar navbar-expand-lg navbar-dark bg-dark">

            {hasBackButton && <Link to={"/"}>
                <button className="search-button btn btn-dark">
                    <i className="fas fa-arrow-left" style={{ fontSize: "18px" }}></i>
                </button>
            </Link>}

            <div className="container-fluid">
                <h3 className="text-light">{title}</h3>

                {hasSearch && <Link to={"/search"}>
                    <button className="search-button btn btn-dark">
                        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
                    </button>
                </Link>}

            </div>
        </nav>
    )
}

Header.propTypes = {
    title: PropTypes.string,
    hasSearch: PropTypes.bool,
    hasBackButton: PropTypes.bool
};

export default Header;
