import React, { Component } from "react";
import FileUpload from "./FileUpload";
import {MDBCardBody, MDBCol, MDBFormInline, MDBInput, MDBRow} from "mdbreact";
class Radio extends Component {

    constructor(props) {
        super(props);
        this.state = { status: 1, language: '', staffing: '' }; // show first radio button by default
    }

    radioHandler = (status) => {
        this.setState({status});
        console.log(this.state);
    };

    languageHandler = (language) => {
        this.setState({language});
    };

    staffingHandler = (staffing) => {
        this.setState({staffing});
    };

    render() {
        const { status, language, staffing } = this.state;

        function proficiency() {
            return <>
                <div  className="mt-3">
                    <FileUpload inputID="file1" />
                </div>

            </>;
        }

        const languageChange = (e) => {
            // console.log("language target: " + e.target.option);
            this.languageHandler(e.target.value);
        };

        const staffingChange = (e) => {
            this.staffingHandler(e.target.value);
        };

        function labHours() {
            return <>
                <MDBRow className="mb-4 mt-3">
                    <MDBCol>
                        <select className="browser-default custom-select" onChange={languageChange}>
                            <option>Choose Language</option>
                            <option value="German">German</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Chinese">Chinese</option>
                            <option value="French">French</option>
                        </select>
                    </MDBCol>
                    <MDBCol>
                        <select className="browser-default custom-select" onChange={staffingChange}>
                            <option>Choose Level of Support</option>
                            <option value="No Staffing">No Staffing</option>
                            <option value="Student Staffing">Student Staffing</option>
                            <option value="Teacher Staffing">Teacher Staffing</option>
                            <option value="Teacher & Student Staffing">Teacher & Student Staffing</option>
                        </select>
                    </MDBCol>
                </MDBRow>
                <div className="mb-4">
                    <FileUpload inputID="file2" language={language} staffing={staffing} />
                </div>
            </>;
        }

        return (
            <>
                <MDBFormInline className="ml-3">
                    <MDBInput
                        type="radio"
                        name="data"
                        // containerClass='mr-1'
                        checked={status === 1}
                        onClick={(e) => this.radioHandler(1)}
                    />
                    <p className="lead mb-2 ml-2">Student Class & Proficiency Data</p>
                </MDBFormInline>
                <MDBFormInline className="ml-3">
                    <MDBInput
                        type="radio"
                        name="hours"
                        // containerClass='mr-1'
                        checked={status === 2}
                        onClick={(e) => this.radioHandler(2)}
                    />
                    <p className="lead mb-2 ml-2">Student Language Lab Hours</p>
                </MDBFormInline>

                {status === 1 && proficiency()}
                {status === 2 && labHours()}
            </>
        );
    }
}
export default Radio;
