import React, { useState } from 'react'
import Header from '../header/header'
import Sidebaroptions from '../settings/sidebaroptions.js';
import settingsStyles from '../../Assets/css/settings/settings.module.css'
import Divider from '@material-ui/core/Divider';
import { StylesContext } from '@material-ui/styles';





function Help() {

    const [isfocus1, setFocus1] = useState(true)
    const [isfocus2, setFocus2] = useState(false)
    const [isfocus3, setFocus3] = useState(false)
    const [isfocus4, setFocus4] = useState(false)
    const [isfocus5, setFocus5] = useState(false)
    const [isfocus6, setFocus6] = useState(false)
    const [isfocus7, setFocus7] = useState(false)
    const [isfocus8, setFocus8] = useState(false)
    const [isfocus9, setFocus9] = useState(false)


    const sidebarChildoptionsFocus1 = () => {
        setFocus1(!isfocus1);

        setFocus2(false);
        setFocus3(false);
        setFocus4(false);
        setFocus5(false);
        setFocus6(false);
        setFocus7(false);
        setFocus8(false);
        setFocus9(false);

    }

    const sidebarChildoptionsFocus2 = () => {
        setFocus2(!isfocus2);
        setFocus1(false);
        setFocus3(false);
        setFocus4(false);
        setFocus5(false);
        setFocus6(false);
        setFocus7(false);
        setFocus8(false);
        setFocus9(false);


    }
    const sidebarChildoptionsFocus3 = () => {

        setFocus3(!isfocus3);
        setFocus4(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);
        setFocus6(false);
        setFocus7(false);
        setFocus8(false);
        setFocus9(false);

    }

    const sidebarChildoptionsFocus4 = () => {

        setFocus4(!isfocus4);
        setFocus3(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);
        setFocus6(false);
        setFocus7(false);
        setFocus8(false);
        setFocus9(false);

    }

    const sidebarChildoptionsFocus5 = () => {
        setFocus5(!isfocus5);

        setFocus2(false);
        setFocus3(false);
        setFocus4(false);
        setFocus1(false);
        setFocus6(false);
        setFocus7(false);
        setFocus8(false);
        setFocus9(false);


    }

    const sidebarChildoptionsFocus6 = () => {
        setFocus6(!isfocus6);
        setFocus1(false);
        setFocus3(false);
        setFocus4(false);
        setFocus2(false);
        setFocus5(false);
        setFocus7(false);
        setFocus8(false);
        setFocus9(false);



    }
    const sidebarChildoptionsFocus7 = () => {

        setFocus7(!isfocus7);
        setFocus4(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);
        setFocus6(false);
        setFocus3(false);
        setFocus8(false);
        setFocus9(false);

    }

    const sidebarChildoptionsFocus8 = () => {

        setFocus8(!isfocus8);
        setFocus3(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);
        setFocus6(false);
        setFocus7(false);
        setFocus4(false);
        setFocus9(false);

    }

    const sidebarChildoptionsFocus9 = () => {

        setFocus9(!isfocus9);
        setFocus3(false);
        setFocus2(false);
        setFocus1(false);
        setFocus5(false);
        setFocus6(false);
        setFocus7(false);
        setFocus4(false);
        setFocus8(false);

    }

    return (
        <div>
            <Header />
            <div className={` container ` }>
            <div className={` row justify-content-md-center`} >
            <div className={` col-md-10 `} >
            <h3>Help</h3>
            <div className={` row `} >
            <div className={` col-md-4 col-lg-3 ${settingsStyles.sidebarParentoptions} `}>
                    <div className={settingsStyles.sidebarParentoptions1}>
                        <Sidebaroptions active={isfocus1} text="SAYs" onSidebaroptionClick={sidebarChildoptionsFocus1} />
                        <Divider variant="fullWidth"></Divider>
                        <Sidebaroptions active={isfocus2} text="ASKs" onSidebaroptionClick={sidebarChildoptionsFocus2} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus3} text="Postings Responses" onSidebaroptionClick={sidebarChildoptionsFocus3} />
                        <Divider variant="fullWidth" ></Divider>

                        <Sidebaroptions active={isfocus4} text="UPDATEs" onSidebaroptionClick={sidebarChildoptionsFocus4} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus5} text="TAGs" onSidebaroptionClick={sidebarChildoptionsFocus5} />

                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus6} text="Following" onSidebaroptionClick={sidebarChildoptionsFocus6} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus7} text="Contributors" onSidebaroptionClick={sidebarChildoptionsFocus7} />
                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus8} text="Moderators" onSidebaroptionClick={sidebarChildoptionsFocus8} />

                        <Divider variant="fullWidth" ></Divider>
                        <Sidebaroptions active={isfocus9} text="Other" onSidebaroptionClick={sidebarChildoptionsFocus9} />
                    </div>

                </div>
                <div className={`col-md-8 col-lg-9`}>

                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help}  ${isfocus1 && settingsStyles.focusapperance}`} >


                        {/* <div className={settingsStyles.help}> */}

                        <b>SAYS: (140-char message)</b><br />

                        You can share knowledge and express thoughts that could benefit your community.<br />
                        This information develops into your community knowledge as members continue to share and<br />
                        contribute their thoughts or opinions. Most importantly, your expressions could be a match or a<br />
                        direct answer to questions posted by your peers. This feed is also available on the user home to<br />
                        encourage the social learning aspect. When you SAY, you will also be presented with a set of<br />
                        questions requiring answers that you may choose to respond. However, it is optional to answer these questions.<br />
                        {/* </div> */}
                    </div>
                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help}  ${isfocus2 && settingsStyles.focusapperance}`} >
                        {/* <div className={settingsStyles.sidebarchildoptionsocialmediapswdchange}> */}

                        {/* <div> */}
                        ASKS: (140-char message)<br />


                        ASK a question in your community, Skopic provides instant matches by searching through<br />
                        people’s expressions / the community knowledge developed (SAYs) and also previously posted<br />
                        responses posted (SAYs) to similar questions in your community on the related subject.<br />

                        <b>SEE EXAMPLE BELOW:</b><br />

                        You could move it to an open pool of questions if no results are found or if the results don’t<br />
                        meet your expectations. You will be notified via email and the mobile application when other<br />
                        community peers post responses.<br />

                        <b>SEE EXAMPLE BELOW:</b><br />
                        {/* </div> */}
                        {/* </div> */}
                    </div>
                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus3 && settingsStyles.focusapperance}`} >
                        {/* <div> */}

                        <b>POSTING RESPONSES, a.k.a SAY to Open Questions, a.k.a ASKs in your community:</b><br />

                        <br />
                        You can choose to respond a.k.a SAY to any Open Question a.k.a ASK by clicking on the SAY<br />
                        option or alternatively click on SAYs to view previously posted answers and then share your best<br />
                        informed answer not exceeding 140 chat limit. Also, note URL or web links can be embedded<br />
                        but they would not counted towards the max character limit.<br />
                        {/* </div> */}
                    </div>

                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus4 && settingsStyles.focusapperance}`} >

                        {/* <div> */}
                        <b>UPDATES: (140-char message)
                        </b><br />


                        Users can broadcast a message to the whole community through important UPDATES to notify<br />
                        something that is important to all members of a community. Whenever an UPDATE is posted on<br />
                        your default community and communities you’re following, you receive notifications on your<br />
                        email and on mobile apps or soon to be available apple watch.<br />

                        <b>SEE EXAMPLE BELOW:</b>
                        {/* </div> */}
                    </div>



                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus5 && settingsStyles.focusapperance}`} >
                        {/* <div> */}
                        <b>TAGS: (140-char message)
                        </b><br />


                        Users can create #TAG topics to stay focused on specific interests and events in the community.<br />
                        This feature is highly encouraged if the community wants to share, communicate and<br />
                        collaborate on a specific activity or topic.<br /><br />
                        The entire community is notified of any new TAG created, but the member could choose or not<br />
                        choose to Follow. If followed, all associated posts will be notified via email and mobile push<br />
                        notifications (only if turned on)<br />

                        Please note when you add a new post to #TAG, you’ll be following the new #TAG by default.<br />

                        <b>SEE EXAMPLE BELOW:</b><br />
                        {/* </div> */}
                    </div>


                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus6 && settingsStyles.focusapperance}`} >

                        {/* <div> */}
                        <b>FOLLOWING:
                        </b><br />


                        1. Follow #TAG:<br />
                        You can follow #TAG posts to stay connected with all related messages in a hashtag by sending<br />
                        you notifications when other members post to the #TAG.<br />

                        2. Follow ASK:<br />
                        On the user landing/community home page, you may click Follow to follow any Open ASK that<br />
                        is of interest to you. You will be notified when responses are posted.<br />

                        3. Follow community:<br />
                        You can select communities to follow from your Settings page to receive notifications from<br />
                        communities such as #TAG creations and UPDATES.<br />

                        {/* </div> */}
                    </div>



                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus7 && settingsStyles.focusapperance}`} >

                        {/* <div> */}
                        <b>CONTRIBUTORS:
                        </b><br />



                        The top 10 users who contributed to the keeping the community engaged and information<br />
                        networked by Sharing knowledge, Expressing Thoughts, answering peer questions or posting<br />
                        important updates.<br />

                        <b>SEE EXAMPLE BELOW:</b><br />
                        {/* </div> */}
                    </div>


                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus8 && settingsStyles.focusapperance}`} >

                        <b>MODERATORS:
                        </b><br />



                        Becoming a Moderator:<br />

                        1. You must be following the community you want to moderate.<br />

                        2. Go to the settings page, click on request to be a moderator in the section, Your Communities<br />
                        on Skopic.<br />

                        3. You will be approved or rejected by your Primary Moderator, if approved, review moderator<br />
                        guidelines and then you are good to go.<br />

                        Primary Moderator:<br />

                        The person starting your community is designated Primary Moderator. All other subsequently<br />
                        approved by the Primary are called, Moderators.<br />

                        Primary Moderator actions:<br />

                        1. Setup publishing rules for key content types such as, ASKs, SAYs, UPDATES, Creating HASH<br />
                        TAGS and #SAYs.<br />

                        2. Assign/Remove other Moderators.<br />

                        3. Approve, Reject or Hold off on div-published and the user flagged published content.<br />

                        4. Update or Edit the Community info such as: name, description, address, boundaries and<br />
                        timeline photos.<br />

                        5. Transfer the Primary role to another individual within the same community.<br />

                        Moderator actions:<br />

                        1. Approve, Reject or Hold off on div-published and the user flagged published content.<br />

                        2. Update or Edit the Community info such as: name, description, address, boundaries<br />
                        and timeline photos.<br />


                        5. Transfer the Primary role to another individual within the same community.<br />

                        3. Unsubscribe from the Moderator role.<br />

                    </div>

                    <div className={`${settingsStyles.sidebarchildoptions} ${settingsStyles.help} ${isfocus9 && settingsStyles.focusapperance}`} >

                        <b>Others:
                        </b><br />



                        Like:<br/>
                        You can like instant answers or matches a.k.s SAY posts for your Questions, thoughts or opinions<br/> 
                        a.k.a SAYs expressed by peers and responses a.k.a. SAYs posted for questions a.k.aASKs.<br/>

                        Facebook or LinkedIn Sign-in:<br/>
                        Users can choose to sign-in with a one-step process via their Facebook or LinkedIn accounts.<br/>
                        When signing in, the information from your LinkedIn and Facebook pages will be used to<br/>
                        complete your basic profile on Skopic.<br/>

                        Community web link:<br/>
                        1. On Settings page, in Your Communities on Skopic section, click on the Copy Link (paper clip<br/>
                        icon) to access the public web link of a community and use it as necessary when communicating<br/> 
                        to friends and network about that specific Community. Ex: Post the URL on your Facebook<br/> 
                        groups or wall or when sending out emails etc so users can easily access the community page to<br/>
                        Sign-up or Sign-in.

                        2. When sending invites to friends from within Skopic application, the community public web<br/> 
                        link is default available in the footer area of the message<br/>

                        Popular Social Media Integrations:<br/>
                        On the Settings page, you can enable your Skopic posts to be posted on Facebook (Groups,<br/> 
                        Pages, and your personal Timeline), LinkedIn, and Twitter.<br/>

                        Default community:<br/>
                        When first signing up, you will be asked to select your default community. The default<br/> 
                        community page becomes the page you Sign Into every time you are on Skopic. You will receive<br/> 
                        notifications when new #TAGS and UPDATES are created by your peers in this community.<br/>

                        Send Message to the User:<br/>
                        On user’s SAYs and #TAG posts, you can send a private message directly to the user to either<br/> 
                        thank them for their help or to connect with them offline.<br/>

                        Report abuse:<br/>
                        You can flag report abuse on any post by stating the reason for flagging so. Skopic admin and<br/> 
                        the user who authored the post will be notified of this event.<br/>

                        Start Community:<br/>
                        Users can request for starting a new community on Skopic by completing a quick online form<br/> 
                        accessible on the landing and inside pages of www.skopic.com or via the landing or inside<br/> 
                        settings page on IOS and Android apps. Once, the request is submitted, the user needs to<br/> 
                        validate the request by clicking on link sent via email so the Skopic admin can approve it to<br/> 
                        make your community available on Skopic.<br/>

                        Important Note:<br/>
                        Message character limit: To provide clutter-free, community knowledge, all posts such as SAYs,<br/> 
                        ASKs, UPDATES, and #TAGS are limited to 140 characters.Also, note URL or web links can be<br/> 
                        embedded but they would not counted towards the max character limit and no document or<br/> 
                        photo or video uploads are allowed at this time.
                    </div>



                </div>


            </div>
            </div>
            </div>

            </div>
        </div>
    )
}

export default Help
