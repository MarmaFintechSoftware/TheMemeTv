import React, { useEffect, useState, useRef } from "react";
import stakelogo from "../../assets/images/stake-logo.svg";
import logo from "../../assets/images/main-logo.svg";
import "./PhasePage.css";
import { weekRewards, stakeRewards, getUserDetails1 } from "../../apis/user";
import useUserInfo from "../../Hooks/useUserInfo";
import Menu from "../menu/menu";
import Tv from "../Tv/Tv";
import cancelIcon from "../../assets/Task/cancelicon.png";

const PhasePage = () => {
  const { watchScreen,userDetails, updateUserInfo,updatewatchScreenInfo } = useUserInfo();
  const [currentLevel, setCurrentLevel] = useState(userDetails?.currentPhase);
  const [TotalRewards, setTotalRewards] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const formatNumber = (num) => {
    if (num >= 1000000) return Math.floor(num / 100000) / 10 + "M";
    if (num >= 1000) return Math.floor(num / 100) / 10 + "k";
    return num;
  };

  const [stakeDetails, setStakeDetails] = useState({});
  const [currentStake, setCurrentStake] = useState({});
  const week = {
    1: "week1",
    2: "week2",
    3: "week3",
    4: "week4",
    5: "week5",
    6: "week6",
    7: "week7",
    8: "week8",
    9: "week9",
    10: "week10",
  };

  const scrollableRef = useRef(null);

  useEffect(() => {
    const preventTouchScroll = (event) => {
      // Allow scrolling only for the scrollable div
      if (!scrollableRef.current.contains(event.target)) {
        event.preventDefault();
      }
    };
    // Add the event listener
    document.addEventListener("touchmove", preventTouchScroll, {
      passive: false,
    });
    // Cleanup the event listener
    return () => {
      document.removeEventListener("touchmove", preventTouchScroll);
    };
  }, []);

 

  const getWeeklyRewardsData = async () => {
    const data = {
      telegramId: userDetails?.userDetails?.telegramId,
    };
    const responce = await weekRewards(data);
    setStakeDetails(responce);
  };

  useEffect(() => {
    getWeeklyRewardsData();
    // setStakeDetails(userDetails?.watchSec?.stakeDetails);
    localStorage.setItem(
      "pointDetails",
      JSON.stringify({
        tapPoints: 0,
        watchSec: 0,
        boosterPoints: 0,
        booster: [0],
      })
    );

    updateUserInfo((prev) => ({
      ...prev,
      isLoading: false,
    }));
  }, []);

  useEffect(() => {
    if (stakeDetails) {
      const currWeek = week[currentLevel];
      const res = stakeDetails[currWeek];
      setCurrentStake(res);
      if (res) {
        setIsLoading(false);
      }
    }
  }, [stakeDetails, currentLevel]);

  useEffect(() => {
    // const value = currentStake?.rewardsForWeek?.reduce((acc, item) => {
    //   return item.userStaking ? acc + item.totalRewards : acc;
    // }, 0);

    const FilterStake = currentStake?.rewardsForWeek?.filter((el)=>el?.userStaking==true);
    const totalRewardsSum = FilterStake?.reduce((sum, item) => sum + item.totalRewards, 0);
    setTotalRewards(totalRewardsSum/2);
  }, [currentStake]);

  const updateStakeRewards = (id) => { 
    const res = stakeRewards({ stakingId: String(id) });
    if (res) {
      setTimeout(() => {
        getWeeklyRewardsData();
      }, 1500);
    }
    const FilterStake = currentStake?.rewardsForWeek?.filter((el)=>el?.userStaking==true);
    const totalRewardsSum = FilterStake?.reduce((sum, item) => sum + item.totalRewards, 0);
    setTotalRewards(totalRewardsSum/2);
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
  const toogleMenu = () => {

      if (!watchScreen.booster) {
        const data = getUserDetailsOnly().then(() => {
          updateUserInfo((prev) => ({
            ...prev,
            isPlay: false,
            currentComponent: Tv,
            currentComponentText: "TVPage",
            lastComponent: userDetails?.userDetails.currentComponent,
            lastComponentText: userDetails?.userDetails.currentComponentText,
            isMenu: true,
            menuCount: userDetails?.userDetails?.menuCount + 1,
          }));
          // goToThePage(Battle, "BattlePage");
        });
      }
    
   
    
  };
  const FindDate = new Date();
  const formattedDate = FindDate?.toISOString().split("T")[0];
  return (
    <>
      {isLoading ? (
        <div className="loaderstyle">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="info-img scroll">
          <img
            onClick={() => {
              toogleMenu(Tv, "Tv");
            }}
            src={cancelIcon}
            className="cancel-imgpoints"
            style={{ cursor: "pointer", zIndex: 1000000, pointerEvents: "all" }}
          />
          <div
            className="menupointer stuff-body1"
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              // marginTop: "15%",
              justifyContent: "center",
              flexDirection: "column",
              pointerEvents: "all",
            }}
          >
            <div
              onClick={() => {
                if (currentLevel > 1) {
                  setCurrentLevel(currentLevel - 1);
                }
              }}
              class={currentLevel > 1 ? "arrows prevact" : "arrows prev"}
            ></div>
            <div
              class={currentLevel ==10 ||userDetails?.currentPhase<= currentLevel?'':`arrows next`}
              onClick={() => {
                if (currentLevel < 10) {
                  setCurrentLevel(currentLevel + 1);
                }
              }}
            ></div>
            <div className="phase" ref={scrollableRef}>
              <div className="row phaseContainer">
                <div className="col-6">
                  <h1 className="phase-text">PHASE {currentLevel}</h1>
                </div>
                <div className="col-6">
                  <h3 className="phase-point">
                    <img src={logo} />{" "}
                    {formatNumber(currentStake?.totalWeeklyRewards)}
                  </h3>
                </div>
              </div>
              <div className="row justify-content-center">
                <div
                  className="col-11 p4 stake-display justify-content-center"
                  style={{ padding: "5px" }}
                >
                  <div className="col-8">
                    <h2>Total Staked</h2>
                  </div>
                  <div className="col-4">
                    <p className="phase-para">
                      <img src={logo} /> {formatNumber(TotalRewards)}
                    </p>
                  </div>
                </div>
              </div>
              {currentStake?.rewardsForWeek?.map((item, index) => {
                return (
                  <div
                  className={`row mt10  phase-stuff ${
                    formattedDate == item?.date ? "phase-stuff-border" : ""
                  } `}
                  style={{ width: "100%" }}
                >
                    <div className="col-2">
                      <div>
                        <h2 className="stake-days">
                          DAY
                          <h3 className="stake-color">{index + 1}</h3>
                        </h2>
                      </div>
                    </div>
                    <div className="col-7 stuff-text">
                      <p className="phase-para">
                        <img src={stakelogo} />{" "}
                        {formatNumber(item?.totalRewards)}
                      </p>
                    </div>
                    <div className="col-3">
                      {item?.userStaking ? (
                        <button className="stuff-unclaim">STAKED</button>
                      ) : null}
                      {item?.totalRewards === 0 ? (
                        <button className="stuff-unclaim">STAKE</button>
                      ) : null}
                      {!item?.userStaking && item?.totalRewards > 0 ? (
                        <button
                          onClick={() => {
                            updateStakeRewards(item._id);
                          }}
                          className="stuff-claim"
                        >
                          STAKE
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PhasePage;
