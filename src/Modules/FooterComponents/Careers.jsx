import React, { useState } from 'react'
import Header from '../header/header'
import Sidebaroptions from '../settings/sidebaroptions.js';
import settingsStyles from '../../Assets/css/settings/settings.module.css'
import Divider from '@material-ui/core/Divider';

function Careers() {

    const [isfocus1, setFocus1] = useState(true)
    const [isfocus2, setFocus2] = useState(false)
    const [isfocus3, setFocus3] = useState(false)
    const [isfocus4, setFocus4] = useState(false)
    const [isfocus5, setFocus5] = useState(false)
    const [isfocus6, setFocus6] = useState(false)

    const sidebarChildoptionsFocus1 = () => {
        setFocus1(!isfocus1);

        setFocus2(false);
        setFocus3(false);
        setFocus4(false);
        setFocus5(false);
        setFocus6(false);


    }

    const sidebarChildoptionsFocus2 = () => {
        setFocus2(!isfocus2);
        setFocus1(false);
        setFocus3(false);
        setFocus4(false);
        setFocus5(false);
        setFocus6(false);



    }
    const sidebarChildoptionsFocus3 = () => {

        setFocus3(!isfocus3);
        setFocus4(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);
        setFocus6(false);


    }

    const sidebarChildoptionsFocus4 = () => {

        setFocus4(!isfocus4);
        setFocus3(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);
        setFocus6(false);


    }

    const sidebarChildoptionsFocus5 = () => {
        setFocus5(!isfocus5);

        setFocus2(false);
        setFocus3(false);
        setFocus4(false);
        setFocus1(false);
        setFocus6(false);



    }

    const sidebarChildoptionsFocus6 = () => {
        setFocus6(!isfocus6);
        setFocus1(false);
        setFocus3(false);
        setFocus4(false);
        setFocus2(false);
        setFocus5(false);




    }


    return (
        <div>
            <Header />
            <div className={` container ` }>
            <div className={` row justify-content-md-center`} >
            <div className={` col-md-10 `} >
                <h3>Careers</h3>
            <div className={` row `} >
                <div className={` col-md-4 ${settingsStyles.sidebarParentoptions} `}>
                    <div className={settingsStyles.sidebarParentoptions1}>
                        <Sidebaroptions active={isfocus1} text="Leader - Product Strategy" onSidebaroptionClick={sidebarChildoptionsFocus1} />
                        <Divider variant="fullWidth"></Divider>
                        <Sidebaroptions active={isfocus2} text="Engineering Manager" onSidebaroptionClick={sidebarChildoptionsFocus2} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus3} text="Design/UI Developer" onSidebaroptionClick={sidebarChildoptionsFocus3} />
                        <Divider variant="fullWidth" ></Divider>

                        <Sidebaroptions active={isfocus4} text="Branding/Marketing Leader" onSidebaroptionClick={sidebarChildoptionsFocus4} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus5} text="CTO/VP of Technology" onSidebaroptionClick={sidebarChildoptionsFocus5} />

                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus6} text="iPhone Developer" onSidebaroptionClick={sidebarChildoptionsFocus6} />

                    </div>

                </div>
                <div className={`col-md-8`}>
                    <div>
                        <p className={settingsStyles.careersMail}>Please send resumes to careers@skopic.com</p>
                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help}  ${isfocus1 && settingsStyles.focusapperance}`} >
                        <b>Leader - Product Strategy</b><br />
                        Currently we require a high impact management team member who can advise and direct<br />
                        Skopic’s core team on product &market strategies and potentially on Revenue generating<br />
                        opportunity<br />

                        Job duties:<br />
                        Participate in brainstorming and strategy sessions.<br />
                        Identify and prioritize product rollout strategies.<br />
                        Define and manage product roadmap.<br />
                        Lead and direct in the areas of ownership.<br />
                        Will move into a role of VP – Strategy when fully operational and funded.<br />

                        Experience and skills:<br />
                        Masters in engineering, science or management.<br />
                        A good understanding of successful consumer product marketing and branding strategies.<br />
                        Prior success with building and exiting a tech startup would be ideal.<br />
                        Passionate to lead and excel in a startup environment.<br />
                        Must be very proactive and market driven

                    </div>
                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help}  ${isfocus2 && settingsStyles.focusapperance}`} >
                        <b>Engineering Manager</b><br />
                        Hands on individual with over 15 years of experience in software engineering &<br />
                        development.This position demands hands-on technical skills and expertise. Some key duties<br />
                        are listed below:<br />
                        Work with product management and dev team to achieve day to day, mid-term and long term<br />
                        goals.<br />
                        Establish and follow a disciplined product engineering, development and support processes.<br />
                        Design and develop scalable application architecture and data model.<br />
                        Leverage all Java open source frameworks and tools for dev, build and deployment.<br />
                        Code reviews for standards, scale and stability.<br />
                        Develop and execute test strategy covering; Unit, functional, load & regression testing.<br />
                        Must be hands on with Java, JSPs, Spring, Hibernate, JSON, Web Services, My SQL & Linux.<br />
                        Develop SOA to address phone apps’ integration and future developers community.<br />
                        Technical Skills:<br />
                        Core: Java, JQuery, JSON, JSPs, Web Services, Hibernate, Spring, MY SQL, Apache Tomcat &<br />
                        Ubuntu.<br />
                        Supplementary: Jira, Jenkins, Subversion, JUnit&JMeter.<br />
                        Preferred: Lucene search server and No SQL like Cassandra or Mongo DB.<br />
                        Qualifications: Bachelors or Mastersdegree in computer sciences or engineering.
                    </div>
                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus3 && settingsStyles.focusapperance}`} >
                        <b>Design/UI Developer</b><br />
                        Graphics design & Creative Art for Social Media/web applications.<br />
                        Create themes, skins & templates for a consumer oriented web application.<br />
                        Design web flows for intuitive consumer experience.<br />
                        Provide simple and effective Usability to the web application.<br />
                        Skills: Flash, AJAX, HTML 5.0, Java Script, JQuery& CSS 3.0<br />
                        Engagement Type: Project Based.<br />
                        Project Duration: 2 to 3 months.
                    </div>

                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus4 && settingsStyles.focusapperance}`} >
                        <b>Branding/Marketing Leader</b><br />
                        We are now looking for passionate and visionary individuals to come on board and help us with<br />
                        the following activities that we will be focusing on in the next few months:<br />
                        Investor readiness.<br />
                        Aid in investor presentations and pitches by actively contributing to decks and provide market<br />
                        perspectives.<br />
                        Branding, marketing and positioning.<br />
                        Some ideas on market focus to potentially develop a viral ecosystem or Go-to-Market strategy.<br />
                        Embrace the concept and be an evangelist.<br />
                        Potential Revenue strategies.<br />

                        Education/skills required:<br />
                        Masters in engineering, science or management.<br />
                        A good understanding of successful consumer product marketing and branding strategies.<br />
                        Prior success with building and exiting a tech startup would be ideal.<br />
                        Passionate to lead and excel in a startup environment.<br />
                        Must be very proactive and market driven.
                    </div>



                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus5 && settingsStyles.focusapperance}`} >
                      <b>CTO or VP of Technology</b><br/>
                        Design technology strategy, develop system architecture and drive product engineering to meet<br />
                        tactical and strategic product goals. An ideal candidate would be visionary & enterprising with a<br />
                        passion to go through a complete business life cycle from start-up to exit.<br />

                        Experience:<br />
                        Designed and developed high volume consumer web applications.<br />
                        Must have proven record in delivering Secure, Stable and Scalable Multi-Tenant applications.<br />
                        Good understanding of data store models and information management techniques.<br />
                        Either worked with or have a good underrating mobile front end applications development<br />
                        involving server side integrations.<br />
                        Understand, develop and implement search technologies and algorithms.<br />
                        Implemented API based third party application integrations like FB, Twitter, Groupon etc…<br />
                        Understanding of sound product engineering, development and database design practices.<br />
                        Must be hands on or well familiar with setting up build and operational application<br />
                        infrastructure.<br />
                        Technical Skills:<br />
                        Core: Java, JQuery, JSON, JSPs, Web Services, Hibernate, Spring, MY SQL, Apache Tomcat &<br />
                        Ubuntu.<br />
                        Supplementary: Jira, Jenkins, Subversion, JUnit&JMeter.<br />
                        Preferred: Lucene search server and No SQL like Cassandra or Mongo DB.<br />
                        Head - Technical operations & Service Infrastructure<br /><br />

                        Tactical Role:<br />
                        Linux, Network & Infrastructure support for test and development servers.<br />
                        Research, Evaluate and Recommend Data Center or Cloud Infrastructure solutions for Skopic<br />
                        Application deployment.<br />
                        Coordinate with Datacenter or IAAS providers to understand their products and obtain the<br />
                        pricing details as necessary.<br />
                        Remote deployment and support of Skopic applications services in production.<br /><br />

                        Strategic Role:<br />
                        Plan & Recommend infrastructure solutions for 24x7 availability.<br />
                        Design capacity for Optimal Network Response & Computing Resources to support Skopic<br />
                        service for User Scaling.<br />
                        Participate in brainstorming sessions and provide inputs on investor outreach, product roadmap,<br />
                        product architecture, product marketing & revenue generation models.<br />
                        Appropriate use of security protocols to protect consumer data moving over networks. Suggest<br />
                        security mechanisms to store and protect consumer confidential data.<br />
                        Education: Bachelor’s or Master’s in Sciences, Engineering or IS.<br />

                    </div>


                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus6 && settingsStyles.focusapperance}`} >
                        <b>iPhone Developer</b><br/>
                        Engagement type: Project based<br/>
                        Develop iPhone application and server side integration with Java web application using RESTful<br/> 
                        web services via JSON.<br/>
                        Project duration: 4 to 8 weeks.<br/>
                        UI - 7 to 10 screens.<br/>
                        Workflow complexity - Simple.<br/>
                        Other iPhone feature integrations like maps, location, data synching etc…required.<br/>
                        Thorough understanding of Human Interface Guidelines from Apple.<br/>
                        Developed application must comply and pass Apple’s compatibility check.<br/>
                    </div>



                </div>
            </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Careers
