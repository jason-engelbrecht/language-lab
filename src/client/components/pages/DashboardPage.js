import React, {useEffect, useState} from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from './example_sections/AdminCardSection1';
import AdminCardSection2 from './example_sections/AdminCardSection2';
import TableSection from './example_sections/TableSection';
import ChartSection1 from './example_sections/ChartSection1';
import ChartSection2 from './example_sections/ChartSection2';
import ModalSection from './example_sections/ModalSection';
import * as api from '../../api';

const DashboardPage = () => {
    const [labData, setLab] = useState({});
    const [profData, setProf] = useState({});
    const [dataYear, setYear] = useState('');
    const [dataQuarter, setQuarter] = useState('');


    useEffect( () => {
        if(dataYear === '' || dataQuarter === '') {
            getLastQuarter();
        }

            // console.log("effectQ: " + dataQuarter);
            // console.log("effectY: " + dataYear);
        //     getLastData();
        //     console.log("labDataEffect: " + labData);
        //     console.log("profDataEffect: " + profData);
        //     for(let prop in labData) {
        //         console.log("lab prop: " + prop);
        //     }
        // for(let prop in profData) {
        //     console.log("prof prop: " + prop);
        // }


    });

    const getLastData = async () => {
        await getLastLab();
        await getLastProf();
    };

    const getLastLab = () => {
        api.fetchLabData(dataQuarter, dataYear).then(lastLab => {
            setLab(lastLab[0]);
            // console.log("lastLab[0]: " + lastLab[0]);
            // console.log("labData: " + labData);
        })
    };

    const getLastProf = () => {
        api.fetchProfData(dataQuarter, dataYear).then(lastProf => {
            setProf(lastProf[0]);
            // console.log("lastProf[0]: " + lastProf[0]);
            // console.log("profData: " + profData);
        })
    };

    const getLastQuarter = () => {
        // console.log("quarter: " + dataQuarter);
        // console.log("year: " + dataYear);
        api.fetchRecentData().then(recentData => {
            setYear(recentData[0].year);
            setQuarter(recentData[0].quarter);
        });
        // console.log("afterq: " + dataQuarter);
        // console.log("aftery: " + dataYear);
    };

    const getRecentData = (e) => {
        e.preventDefault();
        api.fetchLabData(dataQuarter, dataYear).then(recentData => {
            setLab(recentData[0]);
        });
        // console.log("lab: " + labData);
        api.fetchProfData(dataQuarter, dataYear).then(recentData => {
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
        console.log("year changed: " + e.target.value);
    };

    if(labData && labData['data'] && profData && profData['data']) {
        return (
            <React.Fragment>
                <div className='container mb-5'>
                    <div className="form-group">
                        <label htmlFor="quarter">Quarter</label>
                        <select className="custom-select" name="quarter" id="quarter" onChange={changeQuarter} value={dataQuarter}>
                            <option value="Fall" >Fall</option>
                            <option value="Winter" >Winter</option>
                            <option value="Spring" >Spring</option>
                        </select>
                        <label htmlFor="year">Year</label>
                        <input type="text" className="form-control" id="year" placeholder={dataYear} onChange={changeYear} defaultValue={dataYear}/>
                        <button onClick={getRecentData} className={'btn btn-primary'}>Load {dataQuarter} {dataYear}</button>
                    </div>
                </div>
                <div></div>
                <AdminCardSection1 labData={labData} profData={profData}/>
                <ChartSection1 labData={labData} profData={profData}/>
                {/*<TableSection labData={labData} profData={profData}/>*/}
                {/*<ChartSection2 labData={labData} profData={profData}/>*/}
                {/*<MDBRow className="mb-4">*/}
                {/*    <ModalSection />*/}
                {/*</MDBRow>*/}
                {/*<AdminCardSection2 labData={labData} profData={profData}/>*/}
            </React.Fragment>
        )
    } else {
        return(
            <React.Fragment>
                <div className='container mb-5'>
                    <div className="form-group">
                        <label htmlFor="quarter">Quarter</label>
                        <select className="custom-select" name="quarter" id="quarter" onChange={changeQuarter} value={dataQuarter}>
                            <option value="Fall" >Fall</option>
                            <option value="Winter" >Winter</option>
                            <option value="Spring" >Spring</option>
                        </select>
                        <label htmlFor="year">Year</label>
                        <input type="text" className="form-control" id="year" placeholder={dataYear} onChange={changeYear} defaultValue={dataYear}/>
                        <button onClick={getRecentData} className={'btn btn-primary'}>Load {dataQuarter} {dataYear}</button>
                    </div>
                </div>
                <div className="empty" id="dash"> </div>

            </React.Fragment>
        )
    }

};

export default DashboardPage;
