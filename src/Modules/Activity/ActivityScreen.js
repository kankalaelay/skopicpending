import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import "../../Assets/css/Activity/ActivityScreen.css";
import Header from "../header/header";
import Profile from "./Profile/Profile";
import Community from "./Community/Community";
import Activites from "./Activites/Activites";
import * as mapActions from '../../store/actions/mapactions/mapAction'

function ActivityScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mapActions.getNearByCommunitysData())
  }, []);

  return (
    <>
      <Header />
      <Profile />
      <div className="divider">
        <Community />
        <Activites />
      </div>
    </>
  );
}

export default ActivityScreen;
