import React from "react";
import styled from "styled-components";
import { Tab, Nav } from "react-bootstrap";

import SectionTitle from "../component/SectionTitle";
import Card2 from "../component/Card_2";

const Cards = [
  {
    card: "card-1",
  },
  {
    card: "card-2",
  },
  {
    card: "card-2",
  },
  {
    card: "card-2",
    unStaked: true,
  },
];

const Stake = () => {
  return (
    <StakeWrapper>
      <Tab.Container id="left-tabs-example" defaultActiveKey="heroes">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link eventKey="heroes">Stake Heroes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="villains">Lock Villains</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="stake-stats d-flex justify-content-center animation-slideDown">
          <div>
            <span className="d-block text-center">unstake all</span>
          </div>
          <div className="stat">
            <h6>My Staked Strength</h6>
            <p>16</p>
          </div>
          <div className="stat">
            <h6>Total Staked Strength</h6>
            <p>3219</p>
          </div>
          <div className="stat">
            <h6>Claimable NDR</h6>
            <p>1.83</p>
          </div>
          <div>
            <span className="d-block text-center">claim ndr</span>
          </div>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey="heroes">
            <div className="section-title d-flex justify-content-start animation-fadeInRight">
              <SectionTitle title={"3/4 Card Staked"} long />
            </div>
            <div className="d-flex justify-content-center">
              {Cards.map((c) => (
                <Card2 card={c.card} unStaked={c.unStaked} />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="villains"></Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </StakeWrapper>
  );
};

const StakeWrapper = styled.div`
  .stake-stats {
    div {
      span {
        font-size: 20px;
        max-width: 127px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1.2;
      }

      &:first-child {
        background: url("/static/images/bg/card-menu/stats-first-bg.png");
        background-size: cover;
        width: 150px;
        height: 100px;
        margin-right: -8px;
        padding: 15px 0 0 2px;
      }

      &:last-child {
        background: url("/static/images/bg/card-menu/stats-last-bg.png");
        background-size: cover;
        width: 150px;
        height: 100px;
        margin-left: -8px;
        padding: 15px 0 0 2px;
      }

      &.stat {
        background: url("/static/images/bg/card-menu/stat-bg.png");
        background-size: cover;
        margin: 0 -7px;
        padding: 10px 12px 0px;
        min-width: 293px;
        text-shadow: 15px 15px 10px #80f1ed91;

        h6 {
          color: #80f1ed;
          font-size: 20px;
          line-height: 1;
          margin: 0 0 7px;
        }

        p {
          color: #fec100;
          font-size: 30px;
          font-family: Orbitron-Black;
          line-height: 1;
          margin: 0;
        }
      }
    }
  }
`;

export default Stake;
