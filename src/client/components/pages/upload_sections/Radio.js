import React, { Component } from "react";
import FileUpload from "./FileUpload";
import {MDBCardBody, MDBCol, MDBFormInline, MDBInput, MDBRow} from "mdbreact";
class Radio extends Component {

    constructor(props) {
        super(props);
        this.state = { status: 1 }; // show first radio button by default
    }

    radioHandler = (status) => {
        this.setState({status});
    }

    render() {
        const { status } = this.state;

        function proficiency() {
            return <>
                <FileUpload inputID="file1" />
            </>;
        }

        function labHours() {
            return <>
                <MDBRow className="mb-4">
                    <MDBCol>
                        <select className="browser-default custom-select">
                            <option>Choose Language</option>
                            <option value="1">German</option>
                            <option value="2">Japanese</option>
                            <option value="3">Spanish</option>
                            <option value="4">Chinese</option>
                            <option value="5">French</option>
                        </select>
                    </MDBCol>
                    <MDBCol>
                        <select className="browser-default custom-select">
                            <option>Choose Level of Support</option>
                            <option value="1">No Staffing</option>
                            <option value="2">Student Staffing</option>
                            <option value="3">Teacher Staffing</option>
                            <option value="4">Teacher & Student Staffing</option>
                        </select>
                    </MDBCol>
                </MDBRow>
                <div className="mb-4">
                    <FileUpload inputID="file2"/>
                </div>
            </>;
        }

        return (
            <>
                <MDBFormInline className="mb-3">
                    <MDBInput
                        type="radio"
                        name="release"
                        containerClass='mr-1'
                        checked={status === 1}
                        onClick={(e) => this.radioHandler(1)}
                    />
                    <p className="lead mb-2 ml-1">Student Class & Proficiency Data</p>

                    <MDBInput className="ml-5"
                        type="radio"
                        name="release"
                        containerClass='mr-1'
                        checked={status === 2}
                        onClick={(e) => this.radioHandler(2)}
                    />
                    <p className="lead mb-2 ml-1">Student Language Lab Hours</p>
                </MDBFormInline>

                {status === 1 && proficiency()}
                {status === 2 && labHours()}
            </>
        );
    }
}
export default Radio;
