import Switch from "./Switch";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import logo from "../../Assets/images/LandingPageImages/logo.png";
import skopiclogo from "../../Assets/images/LandingPageImages/skopic_logo1.png";
import office from "../../Assets/images/LandingPageImages/Office.svg";
import Neighborhood from "../../Assets/images/LandingPageImages/Neighborhood.svg";
import classroom from "../../Assets/images/LandingPageImages/Classroom.svg";
import cityhall from "../../Assets/images/LandingPageImages/CityHall.svg";
import globe from "../../Assets/images/LandingPageImages/Globe.svg";
import verified from "../../Assets/images/LandingPageImages/Verfied.svg";
import paper from "../../Assets/images/LandingPageImages/Paper.svg";
import group from "../../Assets/images/LandingPageImages/group.svg";
import single from "../../Assets/images/LandingPageImages/single.svg";
import demoImge from "../../Assets/images/LandingPageImages/demo.png";
import AppStore from "../../Assets/images/LandingPageImages/AppStore.svg";
import PlayStore from "../../Assets/images/LandingPageImages/play.svg";
import facebook from "../../Assets/images/LandingPageImages/Facebook.svg";
import twitter from "../../Assets/images/LandingPageImages/Twitter.svg";
import "../../Assets/css/LandingPage/LandingPage.css";
import FooterComponent from "../Reusuablecomponents/FooterComponent";

function LandingPage() {
  return (
    <>
      <main className="Landingpage">
        <div className="Navbar">
          <div className="Logo">
            <img src={logo} alt="Skopic-Logo" />
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <Switch>
                <div label="Sign In">
                  <SignIn />
                </div>
                <div label="Join Now">
                  <SignUp />
                </div>
              </Switch>
            </div>
            <div className="col-md-7">
              <div className="content">
                <h1 className="mainHeading">
                  Share and connect, with your community matters.
                </h1>
                <p className="mainText">
                  Skopic's information-networking platform builds stronger and
                  thriving local communities gloabally by letting people engage,
                  learn, and get organized on real matters related to everyday
                  living.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="imageContent">
          <div className="image">
            <img src={office} alt="officeImage" />
          </div>
          <div className="image">
            <img src={Neighborhood} alt="NeighborhoodImage" />
          </div>
          <div className="image">
            <img src={classroom} alt=" ClassroomImage" />
          </div>
          <div className="image">
            <img src={cityhall} alt="CityHallImage" />
          </div>
        </div>
        <div className="information pt-5">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="info-content">
                  <div className="info-img">
                    <img src={globe} alt="Globe" />
                  </div>
                  <p>
                    Information network that is geographically and social
                    relevant
                  </p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="info-content">
                  <div className="info-img">
                    <img src={verified} alt="Globe" />
                  </div>
                  <p>Credible and moderated content</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="info-content">
                  <div className="info-img">
                    <img src={paper} alt="Globe" />
                  </div>
                  <p>Clutter-free content with microblogging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-md-5">
          <div className="row pt-5 align-items-center">
            <div className="col-md-6">
              <div className="contentImage">
                <img src={group} alt="ContentImage" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="contentInfo">
                <ul className="contentList">
                  <li className="contentListItems">
                    Communicate, collaborate and stay connected in real-time
                    with your community
                  </li>
                  <li className="contentListItems">
                    Share your knowledge to benefit your peers in the community
                  </li>
                  <li className="contentListItems">
                    Find answers instantly receive answers from cerdible peers{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-md-5">
          <div className="row py-5 align-items-center">
            <div className="col-md-6 order-md-1">
              <div className="contentImage">
                <img src={single} alt="ContentImage" />
              </div>
            </div>
            <div className="col-md-6 order-md-0">
              <div className="contentInfo">
                <ul className="contentList">
                  <li className="contentListItems">
                    Connect with actionable information instantly
                  </li>
                  <li className="contentListItems">
                    Organize and share conversations regarding community
                    activites ,topics and important matters{" "}
                  </li>
                  <li className="contentListItems">
                    Create and manage your group ,club or classroom within
                    community{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <div className="skopicInfo">
              <div className="row justify-content-center">
                <div className="col-md-9">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <img src={skopiclogo} alt="skopiclogo" />
                      <div className="SocailSignIn">
                        Quick Demo{" "}
                        <img src={demoImge} alt="demo" className="demoImge" />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <p>
                        Be a Contributor, be a moderator, be important in your
                        community
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footersLinks">
              <div className="mobileLinks pt-5 pb-3">
                <a
                  href="https://apps.apple.com/us/app/skopic/id797166665"
                  target="_blank"
                >
                  {" "}
                  <img src={AppStore} alt="AppStore" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.skopic.android.skopicapp"
                  target="_blank"
                >
                  {" "}
                  <img src={PlayStore} alt="PlayStore" />
                </a>
              </div>
              <div className="socialLinks pt-3">
                <a href="https://www.facebook.com/skopic.inc" target="_blank">
                  {" "}
                  <img src={facebook} alt="facebook" />
                </a>
                <a href="https://twitter.com/SkopicInc" target="_blank">
                  {" "}
                  <img src={twitter} alt="twitter" />
                </a>
              </div>
              <div className="appLinks">
                <FooterComponent />
              </div>
            </div>
            <div className="copyright">
              <p className="copyrightRules">
                Skopic is a trademark of Skopic, Inc. All other trademarks that
                appear on this site are properties of their respective owners.
                The services offered on this site is covered in the utility
                Patent No. 9,690,874 B1, issued by United States Patent &#38;
                Trademark Office.{" "}
              </p>
              <div style={{ textAlign: "center", marginTop: "2%" }}>
                Skopic &#169; 2021
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LandingPage;
