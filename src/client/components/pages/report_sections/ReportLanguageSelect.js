import React, {useEffect, useState} from 'react';

export const ReportLanguageSelect = (props) => {
    const [currentLang, setLang] = useState('all');
    const [languageList, setLanguageList] = useState(props.languagesUploaded);

    useEffect(() => {
        props.languageHandler(currentLang);

    });

    const changeLanguage = (e) => {
        let lang = e.target.value;
        setLang(lang);
        props.languageHandler(currentLang);
    };

    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-4">
                    <select name="language" id="languageSelect" onChange={changeLanguage} defaultValue={"all"} className="custom-select">
                        <option value="all">All Lab Data</option>
                        { languageList ?
                            languageList.map(lang => <option value={lang} key={lang}>{lang}</option>)
                            : <option value="none">--</option>
                        }
                    </select>
                </div>
            </div>
        </div>
    );
};