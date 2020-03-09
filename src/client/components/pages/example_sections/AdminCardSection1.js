import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';

const AdminCardSection1 = (props) => {
    let labData = props.labData;
    let profData = props.profData;

    // for (let prop in labData) {
    //     console.log(prop + ": " + props.labData[prop].length);
    // }
    // for (let prop in profData) {
    //     console.log(prop + ": " + profData[prop].length);
    // }
    // if(profData['data']) {
    //     console.log("count: " + profData['data'].length);
    // }

    if(labData && labData.hasOwnProperty('data') && profData && profData.hasOwnProperty('data')) {

        // link the data
        var students = [];
        for (let prop in profData['data']) {
            students.push(profData['data'][prop]);
        }

        var labStudents = [];
        for(let prop in labData['data']) {
            labStudents.push(labData['data'][prop]);
        }

        var hoursGTFive = 0;
        var totalHours = 0;
        for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < labStudents.length; j++) {
                if(students[i].sid === labStudents[j].sid) {
                    students[i].hours = labStudents[j].hours;
                }

            }
            if(students[i].hours) {
                totalHours += parseInt(students[i].hours);
                if(students[i].hours > 5) {
                    hoursGTFive++;
                }
            }
        }


        return (
            <MDBRow className="mb-4">
                <MDBCol md="3" className="mb-r">
                    <MDBCard className="cascading-admin-card">
                        <div className="admin-up">
                            <MDBIcon icon="language" className="primary-color"/>
                            <div className="data">
                                <p>Total Students</p>
                                <h4>
                                    <strong>{profData['data'] ? profData['data'].length : 'No Data'}</strong>
                                </h4>
                            </div>
                        </div>
                        {/*<MDBCardBody>*/}
                        {/*    <div className="progress">*/}
                        {/*        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25"*/}
                        {/*             className="progress-bar bg-primary" role="progressbar"*/}
                        {/*             style={{width: '25%'}}></div>*/}
                        {/*    </div>*/}
                        {/*    <MDBCardText>Better than last quarter (25%)</MDBCardText>*/}
                        {/*</MDBCardBody>*/}
                    </MDBCard>
                </MDBCol>
                <MDBCol md="3" className="mb-r">
                    <MDBCard className="cascading-admin-card">
                        <div className="admin-up">
                            <MDBIcon icon="flask" className="warning-color"/>
                            <div className="data">
                                <p>Students in the Lab</p>
                                <h4>
                                    <strong>{labData['data'] ? labData['data'].length : 'No Data'}</strong>
                                </h4>
                            </div>
                        </div>
                        {/*<MDBCardBody>*/}
                        {/*    <div className="progress">*/}
                        {/*        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25"*/}
                        {/*             className="progress-bar bg grey" role="progressbar"*/}
                        {/*             style={{width: '25%'}}></div>*/}
                        {/*    </div>*/}
                        {/*    <MDBCardText>Worse than last quarter (25%)</MDBCardText>*/}
                        {/*</MDBCardBody>*/}
                    </MDBCard>
                </MDBCol>
                <MDBCol md="3" className="mb-r">
                    <MDBCard className="cascading-admin-card">
                        <div className="admin-up">
                            <MDBIcon icon="hourglass-half" className="light-blue lighten-1"/>
                            <div className="data">
                                <p>Students with more than 5 hours</p>
                                <h4>
                                    <strong>{hoursGTFive}</strong>
                                </h4>
                            </div>
                        </div>
                        {/*<MDBCardBody>*/}
                        {/*    <div className="progress">*/}
                        {/*        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25"*/}
                        {/*             className="progress-bar grey darken-2" role="progressbar"*/}
                        {/*             style={{width: '75%'}}></div>*/}
                        {/*    </div>*/}
                        {/*    <MDBCardText>Worse than last quarter (75%)</MDBCardText>*/}
                        {/*</MDBCardBody>*/}
                    </MDBCard>
                </MDBCol>
                <MDBCol md="3" className="mb-r">
                    <MDBCard className="cascading-admin-card">
                        <div className="admin-up">
                            <MDBIcon icon="hourglass" className="secondary-color"/>
                            <div className="data">
                                <p>Total hours</p>
                                <h4>
                                    <strong>{totalHours}</strong>
                                </h4>
                            </div>
                        </div>
                        {/*<MDBCardBody>*/}
                        {/*    <div className="progress">*/}
                        {/*        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25"*/}
                        {/*             className="progress-bar grey darken-2" role="progressbar"*/}
                        {/*             style={{width: '75%'}}></div>*/}
                        {/*    </div>*/}
                        {/*    <MDBCardText>Worse than last quarter (75%)</MDBCardText>*/}
                        {/*</MDBCardBody>*/}
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    } else {
        return <div className={"my-auto"}>Select a Quarter to load.</div>
    }
};

export default AdminCardSection1;

