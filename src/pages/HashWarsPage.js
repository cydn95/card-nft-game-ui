import React from "react";
import { useSelector } from "react-redux";
import { useWallet } from "use-wallet";
import { Tab, Nav } from "react-bootstrap";
import styled from "styled-components";

import UnlockWalletPage from "./UnlockWalletPage";
import SectionTitle from "../component/SectionTitle";
import FarmBoard from "../container/FarmBoard";
import LockFarmBoard from "../container/LockFarmBoard";

import { farms } from "../helper/contractFarm";
import { getValueFromObject } from "../helper/utils";

const HashWars = () => {
  // const dispatch = useDispatch();

  const approved = useSelector((state) => state.Farms.approved);
  const balance = useSelector((state) => state.Farms.balance);
  const staked = useSelector((state) => state.Farms.staked);
  const claimable = useSelector((state) => state.Farms.claimable);
  const stats = useSelector((state) => state.Farms.stats);

  const { account } = useWallet();
  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <HashWarsPageContainer>
      <Tab.Container defaultActiveKey="ACTIVE">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link eventKey="ACTIVE" className="nav-active">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="FINISHED" className="nav-finished">Finished</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ACTIVE">
            <div
              className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
            >
              {/* <img src={`/static/images/bg/pages/hash-wars/round.png`} alt="ndr" ><span>Round 1</span></img> */}
              <div className="round">
                Round 1
              </div>
            </div>
            <div
              className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
            >
              <div className="d-flex hash-wars-round">
                <div className="time-left">
                  <p2 className="p-text sky">Time left:</p2>
                  <p1 className="p-value yellow">5d - 2h - 1m</p1>
                </div>
                <div className="prize-pool">
                  <p2 className="p-text sky">Prize pool</p2>
                  <p1 className="p-value yellow">$10439</p1>
                </div>
              </div>
            </div>
            <div className="hash-wars-round-detail">
            
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="FINISHED">
            <div
              className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
              style={{ paddingBottom: 100 }}
            >
              {Object.keys(farms).map(
                (key) =>
                  !farms[key].active && (
                    <FarmBoard
                      key={`farm-${key}`}
                      token={key}
                      farm={farms[key]}
                      approved={getValueFromObject(approved, key)}
                      balance={getValueFromObject(balance, key)}
                      staked={getValueFromObject(staked, key)}
                      claimable={getValueFromObject(claimable, key)}
                      stats={getValueFromObject(stats, key)}
                    />
                  )
              )}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </HashWarsPageContainer>
  );
};

const HashWarsPageContainer = styled.div`
  width: 100vw;
  max-width: 100%;

  .nav-pills {
    margin-top: 0px;
    margin-bottom: 86px;
  }
  .nav-pills .nav-item {
    width: 50%;
  }
  .nav-pills .nav-item .nav-link {
    font-size: 30px;
    padding: 0 1rem;
  }
  .nav-active {
    text-align: end;
  }
  .nav-finished {
    text-align: start;
  }

  .round {
    background-image: url("/static/images/bg/pages/hash-wars/round.png");
    background-size: 100% 100%;
    padding: 4px 40px;
    font-size: 26px;
    font-weight: 700;
    color: #FEC100;
  }

  .hash-wars-round {
    border: 3px solid #80f1ed;
    box-shadow: 0px 5px 3px #80f1ed80;
    max-width: 840px;
    width: calc(100% - 20px);

    .time-left {
      border-right: 2px solid #80f1ed;
      display: grid;
      width: 50%;
      text-align: center;
    }
    .prize-pool {
      border-left: 2px solid #80f1ed;
      display: grid;
      width: 50%;
      text-align: center;
    }
  }
 
`;

export default HashWars;
