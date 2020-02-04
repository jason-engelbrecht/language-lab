import React from 'react';
import { MDBFooter } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="green" className="text-center font-small">
            <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: The Language Lab
            </p>
        </MDBFooter>
    );
};

export default Footer;
