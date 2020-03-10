import React, { Component } from "react";
import FileUpload from "./FileUpload";
import {MDBCol, MDBFormInline, MDBInput, MDBInputGroup, MDBRow} from "mdbreact";
class Radio extends Component {

    constructor(props) {
        super(props);
        this.state = { status: 1, language: '', staffing: '', quarter: '', year: '' }; // show first radio button by default
    }

    radioHandler = (status) => {
        this.setState({status});
    };

    languageHandler = (language) => {
        this.setState({language});
    };

    staffingHandler = (staffing) => {
        this.setState({staffing});
    };

    quarterHandler = (quarter) => {
        this.setState({quarter});
    };

    yearHandler = (year) => {
        this.setState({year});
    };

    render() {
        const { status, language, staffing, quarter, year } = this.state;

        function proficiency() {
            return <>
                <div  className="mt-4">
                    <FileUpload inputID="file1" quarter={quarter} year={year} />
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

        const quarterChange = (e) => {
            this.quarterHandler(e.target.value);
        };

        const yearChange = (e) => {
            this.yearHandler(e.target.value);
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
                    <FileUpload inputID="file2" language={language} staffing={staffing} quarter={quarter} year={year} />
                </div>
            </>;
        }

        return (
            <>
                <MDBRow>
                    <MDBCol size="7">
                        <MDBFormInline className="ml-3">
                            <MDBInput
                                type="radio"
                                name="data"
                                // containerClass='mr-1'
                                checked={status === 1}
                                onClick={(e) => this.radioHandler(1)}
                                label="Student Class & Proficiency Data"
                                labelClass="ml-2"
                                id="proficiency"
                                className="mr-3"
                                />
                        </MDBFormInline>
                        <MDBFormInline className="ml-3">
                            <MDBInput
                                type="radio"
                                name="hours"
                                // containerClass='mr-1'
                                checked={status === 2}
                                onClick={(e) => this.radioHandler(2)}
                                label="Student Language Lab Hours"
                                labelClass="ml-2"
                                id="labHours"
                                className="mr-3"
                                />
                        </MDBFormInline>
                    </MDBCol>
                    <MDBCol size="5">
                            <select className="custom-select browser-default" onChange={quarterChange}>
                                <option>Choose Quarter</option>
                                <option value="Fall">Fall</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                            </select>
                            <MDBInputGroup className="mt-1" hint="Enter Year" onChange={yearChange}/>
                    </MDBCol>
                </MDBRow>

                {status === 1 && proficiency()}
                {status === 2 && labHours()}
            </>
        );
    }
}
export default Radio;
