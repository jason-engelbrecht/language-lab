import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed show" id="sideNav">
            <h1 className="text-center mt-2 mb-4">
                <a href="#" className="our-text display-none">
                    <i className="fas fa-language text-white"> </i>
                </a>
            </h1>

            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1 text-elegant">
                        <p className="text-center">
                            <MDBIcon icon="chart-pie" className="mb-2" size="lg"/>
                            <small className="font-weight-light">Home</small>
                        </p>

                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/uploads" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1 text-elegant">
                        <p className="text-center">
                            <MDBIcon icon="cloud-upload-alt" className="mb-2" size="lg"/>
                            <small className="font-weight-light">Uploads</small>
                        </p>
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/users" activeClassName="activeClass">
                    <MDBListGroupItem className="pb-1 text-elegant">
                        <p className="text-center">
                            <MDBIcon icon="users" className="mb-2" size="lg"/>
                            <small className="font-weight-light"> Users </small>
                        </p>
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
};

export default TopNavigation;
