import React from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from './sections/AdminCardSection1';
import AdminCardSection2 from './sections/AdminCardSection2';
import TableSection from './sections/TableSection';
import ChartSection1 from './sections/ChartSection1';
import ChartSection2 from './sections/ChartSection2';
import ModalSection from './sections/ModalSection';
import FileUploadSection from "./sections/FileUploadSection";

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
