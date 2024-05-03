import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-warning text-light">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand text-light"  to="/general"><h1><span style={{color:'red'}}>Today<span style={{color:'green'}}><sub>news</sub></span></span></h1></NavLink>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link  text-dark" aria-current="page" to="/general">Home</NavLink>
                                </li>
                                <li className="nav-item"><NavLink className="nav-link text-dark" to="/business">Bussiness</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-dark" to="/entertainment">Entertainment</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-dark" to="/general">General</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-dark" to="/health">Health</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-dark" to="/science">Science</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-dark" to="/technology">Technology</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-dark" to="/sports">Sports</NavLink></li>
                                
                                {/*  <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle text-light" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </NavLink>
                                    <ul className="dropdown-menu bg-dark text-light" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item text-light" to="#">Action</a></li>
                                        <li><a className="dropdown-item text-light" to="#">Another action</a></li>
                                        <li><hr className="dropdown-divider text-light" /></li>
                                        <li><a className="dropdown-item text-light" to="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link disabled text-light" to="#" tabIndex="-1" aria-disabled="true">Disabled</NavLink>
                                </li>*/}
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success text-danger" type="submit">Search</button>
                            </form>
                            
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
