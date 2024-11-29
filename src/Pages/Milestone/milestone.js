import React from "react";
// import "./milestone.css";
import logo from "../../assets/images/meme-logo.svg";
import Cup from "../../assets/images/cup.svg";
import cancelIcon from "../../../src/assets/Task/cancelicon.png";
import useUserInfo from "../../Hooks/useUserInfo";
import Refer from "../ReferPage/ReferPage";
const Milestone = () => {
  const { userDetails, updateUserInfo } = useUserInfo();
  const MileItem = [
   
    {invite:'Invite 3 Friends', points:10000},
    {invite:'Invite 5 Friends', points:16667},
    {invite:'Invite 10 Friends', points:33333},
    {invite:'Invite 20 Friends', points:66667},
    {invite:'Invite 30 Friends', points:100000},
    {invite:'Invite 40 Friends', points:133333},
    {invite:'Invite 50 Friends', points:166667},
    {invite:'Invite 60 Friends', points:200000},
    {invite:'Invite 70 Friends', points:233333},
    {invite:'Invite 80 Friends', points:266667},
    {invite:'Invite 90 Friends', points:300000},
    {invite:'Invite 100 Friends', points:333333},
];
  const goToThePage = (component, name) => {
    updateUserInfo((prev) => ({
      ...prev,
      currentComponent: component,
      currentComponentText: name,
      lastComponent: userDetails.currentComponent,
      lastComponentText: userDetails.currentComponentText,
      centerCount: userDetails.centerCount + 1,
      isMenu: false,
    }));
  };
  return (
    <div className=" menupointer" style={{ maxWidth: "380px" }}>
      <img
        onClick={() => {
          goToThePage(Refer, "ReferPage");
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer" }}
      />
      <div className="phase-details">{/* <h3>Here’s how it works</h3> */}</div>
      <div className="phase-para1">
        {/* <p className="font-2">Create Your Unique Referral Link</p> */}
        <div className="phase-details">
          <p className="press">
            REFERRAL MILESTONE
            <hr style={{ margin: "10px", paddingBottom: "0px" }} />
          </p>
        </div>
      </div>
      {/* <div
        className="phase-para1"
        style={{ visibility: "hidden", fontSize: "3px" }}
      >
        <p>
          Click the "Invite" button to generate your personalized referral link.
          <hr style={{ margin: "10px", paddingBottom: "0px" }} />
        </p>
      </div> */}
      <div className="container scrollable" style={{ width: "320px" }}>
      { MileItem.map((mile,index)=>
              (
                <>
        <div className="row mt10 cheap-stuff">
                 <div className="col-2" key={index}>
                <img src={Cup} alt="milestone" className="image" />
              </div>
               <div className="col-9 stuff-text">
               <h4>{mile.invite}</h4>
           <p className="stuff-p">
             <img src={logo} /> +&nbsp;{mile.points.toLocaleString()}
           </p>
         </div>
          <div className="col-1">
          {/* <button className="stuff-claim" style={{ cursor: "pointer" }}>
            CLAIM
          </button> */}
        </div>
        </div>
                </>
              )
            )}
      </div>
    </div>
  );
};
export default Milestone;