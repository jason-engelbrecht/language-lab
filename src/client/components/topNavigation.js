import React, { Component } from 'react';
import {
    MDBCollapse, MDBContainer, MDBLink,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink,
} from 'mdbreact';

class TopNavigation extends Component {

    state = {
        collapseID: ''
    };

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));
    };

    render() {
        return (
            <MDBContainer>
                <MDBNavbar className="flexible-navbar" light expand="md" fixed="top" id="topNav">
                    <MDBNavbarBrand to='/dashboard'>
                        <MDBLink to='/dashboard'><h3 className="our-text font-weight-normal"><i className="fas fa-language fa-lg mr-3"/>The Language Lab</h3></MDBLink>
                    </MDBNavbarBrand>
                    {/*hamburger menu*/}
                    <MDBNavbarToggler
                        onClick={this.toggleCollapse('navbarCollapse1')}
                    />
                    <MDBCollapse
                        id='navbarCollapse1'
                        isOpen={this.state.collapseID}
                        navbar
                    >
                        <MDBNavbarNav left id="hamburger">
                            <MDBNavItem>
                                <MDBNavLink exact={true} activeClassName="activeClass" className="pl-2" to='/dashboard'>Home</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink activeClassName="activeClass" className="pl-2" to='/uploads'>Uploads</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink activeClassName="activeClass" className="pl-2" to='/users'>Users</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </MDBContainer>
        );
    }
}

export default TopNavigation;
