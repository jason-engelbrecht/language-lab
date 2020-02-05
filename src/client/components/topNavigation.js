import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand } from 'mdbreact';

class TopNavigation extends Component {
    render() {
        return (
            <MDBNavbar className="flexible-navbar pl-2" light expand="md" fixed="top">
                <MDBNavbarBrand href="/">
                    <h3 className="our-text font-weight-normal"><i className="fas fa-language fa-lg mr-3"></i>The Language Lab</h3>
                </MDBNavbarBrand>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;
