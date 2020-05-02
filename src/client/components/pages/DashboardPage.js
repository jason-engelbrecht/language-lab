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
    const [currentLang, setLang] = useState("all");
    const [langData, setLangData] = useState([]);
    const [languagesUploaded, setLanguagesUploaded] = useState([]);


    useEffect( () => {
        // idea from dev.to Yurui Zhang
        let isCancelled = false;

        if(dataYear === '' || dataQuarter === '') {
            getLastQuarter();
        }
        if(langData.length === 0) {
            setLangData(labData);
        }

        // "clean up statement" => not exactly sure how it works...
        return() => isCancelled = true;
    });

    // TODO: needs a useEffect cleanup function? -- confirm behavior of "isCancelled" in useEffect()
    // pass data up from child using callback function
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

    // get all the data matching the quarter and year from the form
    const getSelectedData = (e) => {
        // reset data so that it doesn't load old data after quarter/year change
        setChinese([]);
        setFrench([]);
        setGerman([]);
        setJapanese([]);
        setSpanish([]);
        setLab([]);
        setProf([]);
        setLang("all");

        e.preventDefault();
        api.fetchLabData(dataQuarter, dataYear).then(selectedData => {
            var allStudents = [];
            var chineseStudents = [];
            var frenchStudents = [];
            var germanStudents = [];
            var japaneseStudents = [];
            var spanishStudents = [];

            for(let prop in selectedData) {
                if(selectedData.hasOwnProperty(prop)) {
                    for (let student in selectedData[prop]['data']) {
                        if(selectedData[prop]['data'].hasOwnProperty(student)) {
                            if (selectedData[prop]['language'] === 'Chinese') {
                                chineseStudents.push(selectedData[prop]['data'][student]);
                            } else if (selectedData[prop]['language'] === 'French') {
                                frenchStudents.push(selectedData[prop]['data'][student]);
                            } else if (selectedData[prop]['language'] === 'German') {
                                germanStudents.push(selectedData[prop]['data'][student]);
                            } else if (selectedData[prop]['language'] === 'Japanese') {
                                japaneseStudents.push(selectedData[prop]['data'][student]);
                            } else if (selectedData[prop]['language'] === 'Spanish') {
                                spanishStudents.push(selectedData[prop]['data'][student]);
                            }
                            console.log("Student: " + selectedData[prop]['data'][student]);
                            allStudents.push(selectedData[prop]['data'][student]);
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

            // create list of languages that actually have data
            let languageList = [];
            if(chineseStudents.length > 0) {
                languageList.push("Chinese");
            }
            if(frenchStudents.length > 0) {
                languageList.push("French");
            }
            if(germanStudents.length > 0) {
                languageList.push("German");
            }
            if(japaneseStudents.length > 0) {
                languageList.push("Japanese");
            }
            if(spanishStudents.length > 0) {
                languageList.push("Spanish");
            }
            setLanguagesUploaded(languageList);

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
                            <button onClick={getSelectedData} className={'btn btn-primary'}>Load {dataQuarter} {dataYear}</button>
                        </div>
                    </div>
                </div>

                <ReportLanguageSelect languageHandler={getLanguage} languagesUploaded={languagesUploaded}/>


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
                            <button onClick={getSelectedData} className={'btn btn-primary'}>Load {dataQuarter} {dataYear}</button>
                        </div>
                    </div>
                </div>
                <div className="" id=""> </div>
            </React.Fragment>
        )
    }

};

export default DashboardPage;
