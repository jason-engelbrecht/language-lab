import React, {useEffect, useState} from 'react';
import AdminCardSection1 from './report_sections/AdminCardSection1';
import ChartSection1 from './report_sections/ChartSection1';
import * as api from '../../api';
import {ReportLanguageSelect} from "./report_sections/ReportLanguageSelect";

const DashboardPage = () => {
    const [labData, setLab] = useState([]);
    const [profData, setProf] = useState({});
    const [dataYear, setYear] = useState('');
    const [dataQuarter, setQuarter] = useState('');
    const [spanishLab, setSpanish] = useState([]);
    const [chineseLab, setChinese] = useState([]);
    const [germanLab, setGerman] = useState([]);
    const [frenchLab, setFrench] = useState([]);
    const [japaneseLab, setJapanese] = useState([]);
    const [currentLang, setLang] = useState('all');
    const [langData, setLangData] = useState([]);


    useEffect( () => {
        if(dataYear === '' || dataQuarter === '') {
            getLastQuarter();
        }
        if(langData.length === 0) {
            setLangData(labData);
        }
        //     getLastData();
    });

    // const getLastData = async () => {
    //     await getLastLab();
    //     await getLastProf();
    // };

    // const getLastLab = () => {
    //     api.fetchLabData(dataQuarter, dataYear).then(lastLab => {
    //         for(let prop in lastLab) {
    //             console.log(lastLab);
    //         }
    //         console.log('test');
    //         setLab(lastLab[0]);
    //         // console.log("lastLab[0]: " + lastLab[0]);
    //         // console.log("labData: " + labData);
    //     })
    // };
    //
    // const getLastProf = () => {
    //     api.fetchProfData(dataQuarter, dataYear).then(lastProf => {
    //         setProf(lastProf[0]);
    //         // console.log("lastProf[0]: " + lastProf[0]);
    //         // console.log("profData: " + profData);
    //     })
    // };

    // TODO: attempt to pass data up from child using callback function
    const getLanguage = (languageSelected) => {
        console.log("dashboard lang: " + languageSelected);
        setLang(languageSelected);
        if(currentLang === 'Chinese') {
            setLangData(chineseLab);
        } else if(currentLang === 'French') {
            setLangData(frenchLab);
        } else if(currentLang === 'German') {
            setLangData(germanLab);
        } else if(currentLang === 'Japanese') {
            setLangData(japaneseLab);
        } else if(currentLang === 'Spanish') {
            setLangData(spanishLab);
        } else {
            setLangData(labData);
        }
    };

    // retrieve the quarter and year from the most recent upload
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

    // get all the data matching the most recent year
    const getRecentData = (e) => {
        e.preventDefault();
        api.fetchLabData(dataQuarter, dataYear).then(recentData => {
            var allStudents = [];
            var chineseStudents = [];
            var frenchStudents = [];
            var germanStudents = [];
            var japaneseStudents = [];
            var spanishStudents = [];

            for(let prop in recentData) {
                if(recentData.hasOwnProperty(prop)) {
                    for (let student in recentData[prop]['data']) {
                        if(recentData[prop]['data'].hasOwnProperty(student)) {
                            if (recentData[prop]['language'] === 'Chinese') {
                                chineseStudents.push(recentData[prop]['data'][student]);
                            } else if (recentData[prop]['language'] === 'French') {
                                frenchStudents.push(recentData[prop]['data'][student]);
                            } else if (recentData[prop]['language'] === 'German') {
                                germanStudents.push(recentData[prop]['data'][student]);
                            } else if (recentData[prop]['language'] === 'Japanese') {
                                japaneseStudents.push(recentData[prop]['data'][student]);
                            } else if (recentData[prop]['language'] === 'Spanish') {
                                spanishStudents.push(recentData[prop]['data'][student]);
                            }
                            console.log("Student: " + recentData[prop]['data'][student]);
                            allStudents.push(recentData[prop]['data'][student]);
                        }
                    }
                }
            }
            setChinese(chineseStudents);
            setFrench(frenchStudents);
            setGerman(germanStudents);
            setJapanese(japaneseStudents);
            setSpanish(spanishStudents);
            setLab(allStudents);
        });
        // console.log("lab: " + labData);
        api.fetchProfData(dataQuarter, dataYear).then(recentData => {
            setProf(recentData[0]);
        });

        // for(let prop in profData) {
        //     console.log("profData: " + prop + " => " + profData[prop]);
        // }
        console.log("profData['data']: " + profData['data']);
    };

    // onChange for quarter select
    const changeQuarter = e => {
        e.preventDefault();
        setQuarter(e.target.value);
        console.log("quarter changed: " + e.target.value);
    };

    // onChange for year select
    const changeYear = e => {
        e.preventDefault();
        setYear(e.target.value);
        console.log("year changed: " + e.target.value);
    };

    // lab data now stored as array with all students
    if(labData && profData && profData['data']) {
        return (
            <React.Fragment>
                <div className='container mb-5'>
                    <div className="col-md-4">
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
                </div>

                <ReportLanguageSelect languageHandler={getLanguage}/>


                <AdminCardSection1 labData={langData} profData={profData} language={currentLang}/>

                <ChartSection1 labData={langData} profData={profData} language={currentLang}/>

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
                    <div className="col-md-4">
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
                </div>
                <div className="empty" id="dash"> </div>
            </React.Fragment>
        )
    }

};

export default DashboardPage;
