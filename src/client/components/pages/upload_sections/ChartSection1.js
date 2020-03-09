import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';

class ChartSection1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            langData: []
        };
    }
    render(){
        var language = this.props.language;
        var labData = this.props.labData;
        var profData = this.props.profData;

        // var langData = [];

        // for(let prop in this.props.profData) {
        //     console.log("prop: " + prop + " => " + this.props.profData[prop]);
        // }
        console.log("chart language: " + language);

        for(let prop in profData['data']) {
            if(language === 'all') {
                this.state.langData.push(profData['data'][prop]);
            } else {
                // get specific language => match first 2 letters of class with first 2 letters of language
                let studentLanguage = profData['data'][prop]['current_class'].substr(0,2).toLowerCase();
                if(studentLanguage === language.substr(0,2).toLowerCase()) {
                    this.state.langData.push(profData['data'][prop]);
                }
            }

        }

        // pass lab hours into prof data
        // for (let i = 0; i < profData['data'].length; i++) {
        //     for (let j = 0; j < labData.length; j++) {
        //         if(profData['data'][i].sid === labData[j].sid) {
        //             profData['data'][i].hours = labData[j]['hours'];
        //         }
        //         // console.log("hours: " + labData['data'][j]['hours']);
        //     }
        // }
        for (let i = 0; i < this.state.langData.length; i++) {
            for (let j = 0; j < labData.length; j++) {
                if(this.state.langData[i].sid === labData[j].sid) {
                    this.state.langData[i].hours = labData[j]['hours'];
                }
                // console.log("hours: " + labData['data'][j]['hours']);
            }
        }

        // how many students 1-2 hours, how many 3-5, etc
        var lab12 = 0;
        var lab35 = 0;
        var lab68 = 0;
        var lab9 = 0;
        var count = 0;
        var reading = [0, 0, 0, 0, 0];
        var writing = [0, 0, 0, 0, 0];
        var speaking = [0, 0, 0, 0, 0];
        var listening = [0, 0, 0, 0, 0];
        for (let i = 0; i < this.state.langData.length; i++) {
            if(!this.state.langData[i]['hours'] || this.state.langData[i]['hours'] === 0) {
                count++;
                reading[0] += this.state.langData[i]['reading'];
                writing[0] += this.state.langData[i]['writing'];
                speaking[0] += this.state.langData[i]['speaking'];
                listening[0] += this.state.langData[i]['listening'];
            } else if(this.state.langData[i]['hours'] <=2) {
                lab12++;
                reading[1] += this.state.langData[i]['reading'];
                writing[1] += this.state.langData[i]['writing'];
                speaking[1] += this.state.langData[i]['speaking'];
                listening[1] += this.state.langData[i]['listening'];
            } else if(this.state.langData[i]['hours'] <=5) {
                lab35++;
                reading[2] += this.state.langData[i]['reading'];
                writing[2] += this.state.langData[i]['writing'];
                speaking[2] += this.state.langData[i]['speaking'];
                listening[2] += this.state.langData[i]['listening'];
            } else if(this.state.langData[i]['hours'] <=8) {
                lab68++;
                reading[3] += this.state.langData[i]['reading'];
                writing[3] += this.state.langData[i]['writing'];
                speaking[3] += this.state.langData[i]['speaking'];
                listening[3] += this.state.langData[i]['listening'];
            } else {
                lab9++;
                reading[4] += this.state.langData[i]['reading'];
                writing[4] += this.state.langData[i]['writing'];
                speaking[4] += this.state.langData[i]['speaking'];
                listening[4] += this.state.langData[i]['listening'];
            }
        }
        // TODO: confirm behavior of "langData" before removing profData
        // for (let i = 0; i < profData['data'].length; i++) {
        //     if(!profData['data'][i]['hours'] || profData['data'][i]['hours'] === 0) {
        //         count++;
        //         reading[0] += profData['data'][i]['reading'];
        //         writing[0] += profData['data'][i]['writing'];
        //         speaking[0] += profData['data'][i]['speaking'];
        //         listening[0] += profData['data'][i]['listening'];
        //     } else if(profData['data'][i]['hours'] <=2) {
        //         lab12++;
        //         reading[1] += profData['data'][i]['reading'];
        //         writing[1] += profData['data'][i]['writing'];
        //         speaking[1] += profData['data'][i]['speaking'];
        //         listening[1] += profData['data'][i]['listening'];
        //     } else if(profData['data'][i]['hours'] <=5) {
        //         lab35++;
        //         reading[2] += profData['data'][i]['reading'];
        //         writing[2] += profData['data'][i]['writing'];
        //         speaking[2] += profData['data'][i]['speaking'];
        //         listening[2] += profData['data'][i]['listening'];
        //     } else if(profData['data'][i]['hours'] <=8) {
        //         lab68++;
        //         reading[3] += profData['data'][i]['reading'];
        //         writing[3] += profData['data'][i]['writing'];
        //         speaking[3] += profData['data'][i]['speaking'];
        //         listening[3] += profData['data'][i]['listening'];
        //     } else {
        //         lab9++;
        //         reading[4] += profData['data'][i]['reading'];
        //         writing[4] += profData['data'][i]['writing'];
        //         speaking[4] += profData['data'][i]['speaking'];
        //         listening[4] += profData['data'][i]['listening'];
        //     }
        // }

        // total (and average) reading 1-2, writing 1-2, etc

        // console.log("chartLab: " + labData['data']);

        const dataBar = {
            labels: ['0', '1-2', '3-5', '6-8', '9+'],
            datasets: [
                {
                    label: 'Reading',
                    data: [reading[0] / count, reading[1] / lab12, reading[2] / lab35, reading[3] / lab68, reading[4] / lab9],
                    backgroundColor: 'rgba(245, 74, 85, 0.5)',
                    borderWidth: 1
                }, {
                    label: 'Writing',
                    data: [writing[0] / count, writing[1] / lab12, writing[2] / lab35, writing[3] / lab68, writing[4] / lab9],
                    backgroundColor: 'rgba(90, 173, 246, 0.5)',
                    borderWidth: 1
                }, {
                    label: 'Listening',
                    data: [listening[0] / count, listening[1] / lab12, listening[2] / lab35, listening[3] / lab68, listening[4] / lab9],
                    backgroundColor: 'rgba(245, 192, 50, 0.5)',
                    borderWidth: 1
                }, {
                    label: 'Speaking',
                    data: [speaking[0] / count, speaking[1] / lab12, speaking[2] / lab35, speaking[3] / lab68, speaking[4] / lab9],
                    backgroundColor: 'rgba(130, 74, 85, 0.5)',
                    borderWidth: 1
                }, {
                    label: 'Overall',
                    data: [
                        (reading[0] + writing[0] + listening[0] + speaking[0]) / count,
                        (reading[1] + writing[1] + listening[1] + speaking[1]) / lab12,
                        (reading[2] + writing[2] + listening[2] + speaking[2]) / lab35,
                        (reading[3] + writing[3] + listening[3] + speaking[3]) / lab68,
                        (reading[4] + writing[4] + listening[4] + speaking[4]) / lab9
                    ],
                    backgroundColor: 'rgba(25, 74, 85, 0.5)',
                    borderWidth: 1
                }
            ]
        };

        const barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title:{
                display: true,
                // text: profData['quarter'] + " " + profData['year'],
                text: profData['quarter'] + " " + profData['year'],
                fontSize: 32
            }
        };

        // const dataPie = {
        //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        //     datasets: [
        //     {
        //         data: [300, 50, 100, 40, 120, 24, 52],
        //         backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
        //         hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
        //     }
        //     ]
        // }
        // if(this.props.labData && this.props.profData && this.props.profData['data']) {
            if(this.state.langData) {
            return (
                <MDBRow className="mb-4">
                    <MDBCol className="mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <Bar data={dataBar} height={500} options={barChartOptions}/>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            )
        } else {
            return null;
        }
    }
}

export default ChartSection1;

