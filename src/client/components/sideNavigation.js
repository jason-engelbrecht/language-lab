import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed ">
            <h1 className="text-center mt-2 mb-4">
                <a href="#" className="our-text">
                    <i className="fas fa-language"></i>
                </a>
            </h1>

            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1 text-body">
                        <p className="text-center">
                            <MDBIcon icon="chart-pie" className="mb-2" size="lg"/>
                            <small>Home</small>
                        </p>

                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/profile" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1 text-body">
                        <p className="text-center">
                            <MDBIcon icon="user" className="mb-2" size="lg"/>
                            <small>Profile</small>
                        </p>
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/tables" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1 text-body">
                        <p className="text-center">
                            <MDBIcon icon="cloud-upload-alt" className="mb-2" size="lg"/>
                            <small>Upload</small>
                        </p>
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;
