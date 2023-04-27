import React, { useState } from 'react'
import Header from '../header/header'
import Sidebaroptions from '../settings/sidebaroptions.js';
import settingsStyles from '../../Assets/css/settings/settings.module.css'
import Divider from '@material-ui/core/Divider';

function Cookies() {

    const [isfocus1, setFocus1] = useState(true)
    const [isfocus2, setFocus2] = useState(false)
    const [isfocus3, setFocus3] = useState(false)
    const [isfocus4, setFocus4] = useState(false)
    const [isfocus5, setFocus5] = useState(false)


    const sidebarChildoptionsFocus1 = () => {
        setFocus1(!isfocus1);

        setFocus2(false);
        setFocus3(false);
        setFocus4(false);
        setFocus5(false);


    }

    const sidebarChildoptionsFocus2 = () => {
        setFocus2(!isfocus2);
        setFocus1(false);
        setFocus3(false);
        setFocus4(false);
        setFocus5(false);



    }
    const sidebarChildoptionsFocus3 = () => {

        setFocus3(!isfocus3);
        setFocus4(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);


    }

    const sidebarChildoptionsFocus4 = () => {

        setFocus4(!isfocus4);
        setFocus3(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);

    }

    const sidebarChildoptionsFocus5 = () => {
        setFocus5(!isfocus5);

        setFocus2(false);
        setFocus3(false);
        setFocus4(false);
        setFocus1(false);



    }


    return (
        <div>
            <Header />
            <div className={settingsStyles.settingoptions}>
                <div className={` ${settingsStyles.sidebarParentoptions} `}>
                    <div className={settingsStyles.sidebarParentoptions1}>
                        <Sidebaroptions active={isfocus1} text="Google" onSidebaroptionClick={sidebarChildoptionsFocus1} />
                        <Divider variant="fullWidth"></Divider>
                        <Sidebaroptions active={isfocus2} text="Safari" onSidebaroptionClick={sidebarChildoptionsFocus2} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus3} text="Mozilla" onSidebaroptionClick={sidebarChildoptionsFocus3} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus4} text="Opera" onSidebaroptionClick={sidebarChildoptionsFocus4} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus5} text="Internet Explorer" onSidebaroptionClick={sidebarChildoptionsFocus5} />
                    </div>

                </div>
                <div>

                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help}  ${isfocus1 && settingsStyles.focusapperance}`} >

                        <p>Google Chrome</p>
                        <ol>
                            <li>On your compuer, open <strong>Chrome.</strong></li>
                            <li>At the top right, click <strong>Settings.</strong></li>
                            <li>At the bottom, click <strong>Preferences.</strong></li>
                            <li>Under <strong>Privacy and Security</strong>, click <strong>Content Settings</strong></li>
                            <li>Click <strong>Preferences.</strong></li>
                            <li>From here, you can:<br />
                                Turn on cookies: Next to Blocked,turn on the switch.<br />
                                Turn off cookies: Turn off Allow sites to save and read cookie data.</li>

                        </ol>

                    </div>
                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help}  ${isfocus2 && settingsStyles.focusapperance}`} >
                        <p>Safari</p>
                        <ol>
                            <li>On your compuer, open <strong>Safari.</strong></li>
                            <li>At the top right, click <strong>More</strong>and then <strong>Settings</strong></li>
                            <li>At the bottom, click <strong>Advanced.</strong></li>
                            <li>Under <strong>Privacy</strong></li>
                            <li>You will see <strong>Block Cookies.</strong> Section</li>
                            <li>Click on <strong>Never</strong> radio button under <strong>Block Cookies.</strong></li>
                            <li> Reload your browser, Cookies will be Enabled</li>

                        </ol>
                    </div>
                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus3 && settingsStyles.focusapperance}`} >
                        <p>Mozilla</p>
                        <ol>
                            <li>On your compuer, open <strong>Firefox.</strong></li>
                            <li>Click on the <strong>Tools Menu.</strong></li>
                            <li>Click on <strong>Options.</strong></li>
                            <li>Select <strong>Privacy Settings</strong></li>
                            <li>If you want no restrictions,tick <strong>Accept cookies from sites</strong></li>
                            <li>If you want to set some restrictions, unclick <strong>Accept cookies from sites.</strong></li>
                        </ol>

                    </div>

                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus4 && settingsStyles.focusapperance}`} >
                        <p>Opera</p>
                        <ol>
                            <li>On your compuer, open <strong>Opera.</strong></li>
                            <li>Click on the <strong>Tools</strong> menu <strong>Opera</strong></li>
                            <li>Click on <strong>Preferences.</strong></li>
                            <li>Change to the <strong>Advanced</strong>tab,and then go to the <strong>Cookie</strong> section.</li>
                            <li>Select <strong>Accept cookies only from the site I visit</strong> or <strong>Accept cookies</strong></li>
                            <li>Ensure <strong>Delete new cookies when exiting Opera</strong> is not ticked.</li>
                        </ol>

                    </div>



                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus5 && settingsStyles.focusapperance}`} >
                        <p>Internet Explorer</p>
                        <ol>
                            <li>On your compuer, open <strong>IE.</strong></li>
                            <li>Click  the <strong>Tools Button</strong></li>
                            <li>Next click <strong>Internet Options</strong> and select the <strong>Privacy</strong> tab</li>
                            <li>Under <strong>Settings</strong></li>
                            <li>Move the  slider to the top to block all cookies or to the bottom to allow all cookies</li>
                            <li>Click <strong>Apply</strong></li>
                        </ol>
                    </div>





                </div>

            </div>

        </div>
    )
}

export default Cookies
