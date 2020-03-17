import React, {useEffect, useState} from 'react';

export const ReportLanguageSelect = (props) => {
    const [currentLang, setLang] = useState('all');

    useEffect(() => {
        props.languageHandler(currentLang);
    });

    const changeLanguage = (e) => {
        let lang = e.target.value;
        setLang(lang);
        props.languageHandler(currentLang);
        // console.log("lang inside select: " + lang);
    };

    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-4">
                    <select name="language" id="languageSelect" onChange={changeLanguage} defaultValue={"all"} className="custom-select">
                        <option value="all">All Lab Data</option>
                        <option value="Chinese">Chinese</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                </div>
            </div>
        </div>
    );
};