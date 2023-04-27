import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Modules/home/home.js";
import Settings from "./Modules/settings/settings.js";
import Googlemaps from "./Modules/maps/Consumer.jsx";
// import MainPage from "./Modules/MainPage/MainPage"
import LandingPage from "./Modules/LandingPage/LandingPage";
import ForgotPassword from "./Modules/LandingPage/ForgotPassword/ForgotPassowrd.jsx";
import Help from "./Modules/FooterComponents/Help.jsx";
import PrivacyPolicy from "./Modules/FooterComponents/PrivacyPolicy.jsx";
import Cookies from "./Modules/FooterComponents/Cookies.jsx";
import Careers from "./Modules/FooterComponents/Careers.jsx";
import EditProfile from "./Modules/EditProfile/EditProfile.js";
import ActivityScreen from "./Modules/Activity/ActivityScreen";
import Moderator from "./Modules/Moderator/Moderator";

// import ChildLocationtag from './Modules/Reusuablecomponents/ChildLocationtag'
// import GooglemapsSignin from './GooglemapsSignIn/GoogleMapsSignin.js'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Settings" component={Settings} />
        <Route exact path="/Googlemaps" component={Googlemaps} />
        <Route exact path="/Help" component={Help} />
        <Route exact path="/Cookies" component={Cookies} />
        <Route exact path="/Careers" component={Careers} />
        <Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />
        <Route exact path="/TermsofService" component={PrivacyPolicy} />
        <Route exact path="/UserGuideLines" component={PrivacyPolicy} />
        <Route exact path="/Blog" component={PrivacyPolicy} />
        <Route exact path="/About" component={PrivacyPolicy} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/activity" component={ActivityScreen} />
        <Route exact path="/Moderator" component={Moderator} />
        {/* <Route  exact path="*" component={MainPage}/> */}

        {/* <Route exact path="/GooglemapsSignin" component={GooglemapsSignin}/> */}
      </Switch>
    </BrowserRouter>
  );
};
