import React, {useState} from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from './example_sections/AdminCardSection1';
import AdminCardSection2 from './example_sections/AdminCardSection2';
import TableSection from './example_sections/TableSection';
import ChartSection1 from './example_sections/ChartSection1';
import ChartSection2 from './example_sections/ChartSection2';
import ModalSection from './example_sections/ModalSection';
import * as api from '../../api';

const DashboardPage =  () => {
    const [labData, setLab] = useState({});
    const [profData, setProf] = useState({});
    const [dataYear, setYear] = useState('2020');
    const [dataQuarter, setQuarter] = useState('Fall');

    const getRecentData = (e) => {
        e.preventDefault();
        api.fetchLabData(dataQuarter, dataYear).then(recentData => {
            setLab(recentData[0]);
        });
        // console.log("lab: " + labData);
        api.fetchProfData('Fall', '2020').then(recentData => {
            setProf(recentData[0]);
        });
        // console.log("prof: " + profData);
    };

    const changeQuarter = e => {
        e.preventDefault();
        setQuarter(e.target.value);
        console.log("quarter changed: " + e.target.value);
    };

    const changeYear = e => {
        e.preventDefault();
        setYear(e.target.value);
    };

    return (
        <React.Fragment>
            <div className='container mb-5'>
                <div className="form-group">
                    <label htmlFor="quarter">Quarter</label>
                    <select className="custom-select" name="quarter" id="quarter" onChange={changeQuarter}>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                    </select>
                    <label htmlFor="year">Year</label>
                    <input type="text" className="form-control" id="year" placeholder={dataYear} onChange={changeYear}/>
                    <button onClick={getRecentData} className={'btn btn-primary'}>Load {dataQuarter} {dataYear}</button>
                </div>
            </div>
            <div></div>
            <AdminCardSection1 labData={labData} profData={profData}/>
            <ChartSection1 labData={labData} profData={profData}/>
            <TableSection labData={labData} profData={profData}/>
            <ChartSection2 labData={labData} profData={profData}/>
            <MDBRow className="mb-4">
                <ModalSection />
            </MDBRow>
            <AdminCardSection2 labData={labData} profData={profData}/>
        </React.Fragment>
    )
};

export default DashboardPage;
