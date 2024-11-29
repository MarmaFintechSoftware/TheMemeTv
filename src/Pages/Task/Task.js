import React, { useEffect } from "react";
import "./task.css";
// import playacard from "../../assets/Task/pickacard.png";
// import quizImg from "../../assets/Task/Quiz.png";
// import wordscrambleImg from "../../assets/Task/word-scramble.png";
import games from "../../assets/images/games.png";
import useUserInfo from "../../Hooks/useUserInfo";
import PickaWord from "./PickaWord/PickaWord";
import quiz from "./QuizTask/QuizTask";
import scramble from "./ScrambleaWord/ScrambleaWord";
import cancelIcon from "../../assets/Task/cancelicon.png";
import Tv from "../Tv/Tv";
import { getUserDetails1 } from "../../apis/user";
const Task = () => {
  useEffect(() => {
    updateUserInfo((prev) => ({
      ...prev,
      isLoading: false,
    }));
  }, []);
  const { watchScreen,userDetails, updateUserInfo,updatewatchScreenInfo } = useUserInfo();
 
  const goToThePage = (component, name) => {
    updateUserInfo((prev) => {
      return {
        ...prev,
        ...{
          currentComponent: component,
          currentComponentText: name,
          lastComponent: userDetails.currentComponent,
          lastComponentText: userDetails.currentComponentText,
          isMenu: false,
         
        },
      };
    });
  };
  const reclaimUserDetails = () => {
    if (!watchScreen.booster) {
      const data = getUserDetailsOnly().then(() => {
        goToThePage(Tv, "TVPage");
        // goToThePage(Battle, "BattlePage");
      });
    }
  };
 
  const getUserDetailsOnly = async () => {
    let userDetails1;
    try {
      userDetails1 = await getUserDetails1(
        userDetails?.userDetails?.telegramId
      );
    } catch (error) {
      console.error("Error in updating or fetching user details:", error);
    }
    // Update state after both async calls are completed
    if (userDetails) {
      updateUserInfo((prev) => ({
        ...prev,
        userDetails: userDetails1,
      }));
      updatewatchScreenInfo((prev) => ({
        ...prev,
        boostersList: userDetails1?.boosters,
        totalReward: userDetails1?.totalRewards,
        tapPoints: 0,
        booster: false,
        boosterSec: 0,
        boosterPoints: 0,
        boosterDetails: {},
        watchSec: 0,
      }));
    }
    return userDetails;
  };
  return (
    <div
      className="task-page"
      style={{ justifyContent: "center", marginTop: "0%" }}
    >
      <img
        onClick={() => {
          reclaimUserDetails();
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer" }}
      />
      <div>
        <h2 className="txt-color mb15">Games</h2>
      </div>
      <div className="col-12">
        <div className="pick-card1">
          <img src={games} alt="memecoin-png" />
          <div className="outline fancy">
            <div className="content1">
              <p className="p-l"> PICK A CARD</p>
              <p className="p-small">PLAY DAILY TO BOOST</p>
              <p className="p-small">YOUR SCORE</p>
              <button
                onClick={() => {
                  goToThePage(PickaWord, "Pickaword");
                }}
                className="play-btn"
              >
                <span class="glowing-text">PLAY {">"} </span>
              </button>
            </div>
          </div>
        </div>
        {/* <div
          onClick={() => {
            goToThePage(PickaWord, "Pickaword");
          }}
        >
          <img src={playacard} alt="Play a card" className="task-image" />
        </div> */}
        {/* <div className="image-row">
          <img
            onClick={() => {
              goToThePage(quiz, "quiz");
            }}
            src={quizImg}
            alt="Quiz"
            className="task-image-small"
          />
          <img
            onClick={() => {
              goToThePage(scramble, "Scramble");
            }}
            src={wordscrambleImg}
            alt="Word Scramble"
            className="task-image-small"
          />
        </div> */}
      </div>
      <div
        className="col-12"
        style={{
          maxWidth: "300px",
        }}
      >
        <div className="games">
          <div className="games-wrapper">
            <div className="fun-quiz">
              <p className="games-text-1">FUNQUIZ</p>
              <p className="games-text-2">GAME</p>
            </div>
            <button
              onClick={() => {
                goToThePage(quiz, "quiz");
              }}
            >
              <span class="glowing-text">PLAY {">"} </span>
            </button>
          </div>
          <div className="games-wrapper ">
            <div className="word-scramble ">
              <p className="games-text-1">WORD</p>
              <p className="games-text-2">SCRAMBLE</p>
            </div>
            <button
              onClick={() => {
                goToThePage(scramble, "Scramble");
              }}
            >
              <span class="glowing-text">PLAY {">"} </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Task;




