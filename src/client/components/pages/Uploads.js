import React, {Fragment} from 'react'
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon
} from 'mdbreact';
import FileUpload from "./upload_sections/FileUpload";
import UploadPreview from './upload_sections/UploadPreview';
import RecentUploads from './upload_sections/RecentUploads';
import Radio from './upload_sections/Radio';

const Uploads =  () => {
  return (
    <Fragment>
      <MDBRow>
        <MDBCol size="7" className="d-flex">
          <MDBCard className="flex-fill">
            <MDBCardHeader color="green">
              <h5 className="mb-1 font-weight-normal"><MDBIcon icon="cloud-upload-alt" className="mr-2" />New Upload</h5>
            </MDBCardHeader>
            <MDBCardBody className="p-4 mt-2">
              <Radio/>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol size="5" className="d-flex">
          <RecentUploads/>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mt-5">
        <MDBCol>
          <UploadPreview/>
        </MDBCol>
      </MDBRow>

      <div className="empty"></div>
    </Fragment>
  )
};

export default Uploads;
