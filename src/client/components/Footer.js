import React from 'react';
import { MDBFooter } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="white" className="text-center font-small">
            <p className="mb-0 py-3 text-center our-text">
                &copy; {new Date().getFullYear()} Copyright: The Language Lab
            </p>
        </MDBFooter>
    );
};

export default Footer;
