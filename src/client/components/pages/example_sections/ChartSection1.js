import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';

class ChartSection1 extends Component {
    render(){
        const dataBar = {
            labels: ['0', '1-2', '3-5', '5-7', '8+'],
            datasets: [
            {
                label: 'Reading',
                data: [1, 2, 3, 4, 5],
                backgroundColor: 'rgba(245, 74, 85, 0.5)',
                borderWidth: 1
            }, {
                label: 'Writing',
                data: [2, 3, 4, 5, 6],
                backgroundColor: 'rgba(90, 173, 246, 0.5)',
                borderWidth: 1
            }, {
                label: 'Listening',
                data: [1, 2, 3, 4, 5],
                backgroundColor: 'rgba(245, 192, 50, 0.5)',
                borderWidth: 1
            }, {
                label: 'Speaking',
                data: [2, 3, 4, 5, 6],
                backgroundColor: 'rgba(130, 74, 85, 0.5)',
                borderWidth: 1
            }, {
                label: 'Overall',
                data: [6, 10, 14, 18, 22],
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
        return (
            <MDBRow className="mb-4">
                <MDBCol className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <Bar data={dataBar} height={500} options={barChartOptions} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBRow>
        )
    }
}

export default ChartSection1;

