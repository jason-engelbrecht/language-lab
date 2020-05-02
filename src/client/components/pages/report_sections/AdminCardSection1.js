import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';

const AdminCardSection1 = (props) => {
    let labData = props.labData;
    let profData = props.profData;
    var language = props.language;

    if(labData && profData && profData.hasOwnProperty('data')) {

        // link the data
        var students = [];
        for (let prop in profData['data']) {
            if(profData['data'].hasOwnProperty(prop)) {
                // console.log("profData language: " + profData['data'][prop]['current_class']);

                if(language === 'all') {
                    students.push(profData['data'][prop]);
                } else {
                    let langTwo = language.substr(0, 2).toLowerCase();
                    let studentTwo = profData['data'][prop]['current_class'].substr(0, 2).toLowerCase();
                    if(langTwo === studentTwo) {
                        students.push(profData['data'][prop]);
                    }
                }
            }
        }

        var labStudents = [];
        for (let i = 0; i < labData.length; i++) {
            labStudents.push(labData[i]);
        }


        var hoursGTFive = 0;
        var totalHours = 0;
        let japanese = false;
        if(language === "Japanese") {
            japanese = true;
        }
        for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < labStudents.length; j++) {
                if(students[i].sid === labStudents[j].sid) {
                    if(japanese) {
                        console.log("hours: " + labStudents[j].hours)
                    }
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

        console.log("language: " + language + " => " + totalHours);

        return (
            <MDBRow className="mb-4">
                <MDBCol md="3" className="mb-r">
                    <MDBCard className="cascading-admin-card">
                        <div className="admin-up">
                            <MDBIcon icon="language" className="primary-color"/>
                            <div className="data">
                                <p>Total Students</p>
                                <h4>
                                    <strong>{students ? students.length : 'No Data'}</strong>
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
                                    <strong>{labStudents ? labStudents.length : 'No Data'}</strong>
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

