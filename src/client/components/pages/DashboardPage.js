import React from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from './example_sections/AdminCardSection1';
import AdminCardSection2 from './example_sections/AdminCardSection2';
import TableSection from './example_sections/TableSection';
import ChartSection1 from './example_sections/ChartSection1';
import ChartSection2 from './example_sections/ChartSection2';
import ModalSection from './example_sections/ModalSection';
import FileUpload from "./upload_sections/FileUpload";

const DashboardPage =  () => {
  return (
    <React.Fragment>
      <AdminCardSection1 />
      <ChartSection1 />
      <TableSection />
      <ChartSection2 />
      <MDBRow className="mb-4">
          <ModalSection />
      </MDBRow>
      <AdminCardSection2 />
    </React.Fragment>
  )
}

export default DashboardPage;
