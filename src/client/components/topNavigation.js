import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand } from 'mdbreact';

class TopNavigation extends Component {
    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                <MDBNavbarBrand href="/">
                    <h4 className="h4 our-text">The Language Lab</h4>
                </MDBNavbarBrand>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;
