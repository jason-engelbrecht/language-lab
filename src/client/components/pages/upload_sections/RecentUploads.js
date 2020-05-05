import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as api from '../../../api';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBIcon,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from 'mdbreact';

//exports clicked row data
export let clickedTR = {
  clickedFile: ''
};

class RecentUploads extends Component {
  state = {};

  //useful for setting initial state
  constructor(props) {
    super(props);
    this.getRecentUploads();
    this.state = {
      quarter: '',
    };
  }

  //use api endpoint to get recent uploads, setting state
  getRecentUploads = (quarter) => {
    // array to hold both types of files
    var recentUploads = [];
    //arrays to hold quarters
    var fall = [];
    var winter = [];
    var spring = [];
    //sort files by quarter
    function sortQuarter(file) {
      if (file.quarter === 'Fall') {
        fall.push(file);
      }
      else if (file.quarter === 'Winter') {
        winter.push(file);
      }
      else if (file.quarter === 'Spring') {
        spring.push(file);
      }
    }
    // format date
    function formatDate(file) {
      let date = new Date(file.date);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      file.date = month + "/" + day + "/" + year;
    }
    // get proficiency data files
    api.fetchProficiencyUploads().then(recentProciency => {
      recentProciency.map(function(file) {
        formatDate(file);
        sortQuarter(file);
        recentUploads.push(file);
      })
    });
    // get lab hour files
    api.fetchRecentUploads().then(recentUp => {
      recentUp.map(function(file) {
        formatDate(file);
        sortQuarter(file);
        recentUploads.push(file);
      });
      //sort all uploaded files by date
      recentUploads = recentUploads.slice().sort((a, b) => b.date - a.date);
      // change table based on quarter
      if (quarter === 'Fall') {
        recentUploads = fall;
      }
      if (quarter === 'Winter') {
        recentUploads = winter;
      }
      if (quarter === 'Spring') {
        recentUploads = spring;
      }
      this.setState({recentUploads});
    });
  };

  componentDidMount() {
    this.getRecentUploads.bind(this);
    // this.interval = setInterval(this.getRecentUploads.bind(this), 500);
  }

  showRow(e) {
    //sends data from row clicked to table
    let id = e._id;
    console.log("id: " + id)
    // this.setState({file: id});
    clickedTR = {
      clickedFile: id
    };

    //shows/hides table once a row is clicked
    var NAME = document.getElementById("hide");
    if (NAME.className === "show") {
      NAME.className = "hide";
    } else {
      NAME.className = "show";
    }

    //highlight/hides selected row
    var ROW = document.getElementById(e._id);
    if (ROW.className === "selected") {
      ROW.className = null;
    } else {
      ROW.className = "selected";
    }
  }

  deleteFile(file) {
      confirmAlert({
          customUI: ({ onClose }) => {
              return (
                  <div className='custom-ui'>
                      <h2>Are you sure you want to delete this file?</h2>
                      <div className="flex-center">
                          <MDBBtn color="red" onClick={onClose}>No</MDBBtn>
                          <MDBBtn color="green"
                              onClick={() => {
                                  console.log("file: " + file._id);
                                  api.deleteRecentTRData(file._id).then(result => {
                                      console.log(result)});
                                  window.location.reload(false);
                                  onClose();
                              }}
                          >
                              Yes, Delete it!
                          </MDBBtn>
                      </div>
                  </div>
              );
          }
      });
  }

  render() {
    const quarterChange = (e) => {
      this.getRecentUploads(e.target.value);
    };

    return (
        <MDBCard className="flex-fill">
          <MDBCardHeader color="green">
            <MDBRow className="pr-1">
              <h5 className="mb-1 mt-1 font-weight-normal col-8"><MDBIcon icon="list-ul" className="mr-2"/>Recent Uploads</h5>
              <select className="custom-select browser-default col-3" onChange={quarterChange}>
                <option>Quarter</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
            </MDBRow>

          </MDBCardHeader>
          <MDBCardBody id="cardTable">
            <MDBTable scrollY maxHeight="250px" id="table">
              <MDBTableHead >
                <tr>
                  <th>File</th>
                  <th>Quarter</th>
                  <th>Date</th>
                  <th> </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                  this.state.recentUploads ?
                      this.state.recentUploads.map(recentUpload =>
                          <tr id={recentUpload._id}  key={recentUpload._id} >
                            <td onClick={(event) => this.showRow(recentUpload, event)}>
                              <MDBIcon icon="check" className="mr-3 text-success"/>
                              {recentUpload.filename}
                            </td>
                            <td>
                              {recentUpload.quarter}
                            </td>
                            <td>
                              {recentUpload.date}
                            </td>
                            <td>
                              <MDBIcon icon="minus-circle" className="red-text" onClick={(event) => this.deleteFile(recentUpload)}/>
                            </td>
                          </tr>)
                      : console.log('wait')
                }
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
    );
  }
}

export default RecentUploads;

