import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed ">
            <h1 className="text-center text-primary mt-2 mb-5">
                <a href="#" className="logo-wrapper waves-effect">
                    <i className="fas fa-language"></i>
                </a>
            </h1>

            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1">
                        <p className="text-center">
                            <MDBIcon icon="chart-pie" className=""/>
                            Home
                        </p>

                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/profile" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1">
                        <p className="text-center">
                            <MDBIcon icon="user" className=""/>
                            Profile
                        </p>
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/tables" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1">
                        <p className="text-center">
                            <MDBIcon icon="cloud-upload-alt" className=""/>
                            Upload
                        </p>
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;
