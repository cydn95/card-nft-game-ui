import React from "react";
import styled from "styled-components";

const CardStaking = ({
  card,
  unStaked,
  currentProcessingCardId,
  loadingUnStake,
  onUnStake,
  onStake,
  loadingApprove,
  approved,
  onApprove,
}) => {
  return (
    <CardWrapper>
      <div className="card position-relative">
        {unStaked ? (
          <img
            src={`/static/images/bg/components/card/un-staked.png`}
            alt="unStaked"
            className="un-staked"
          />
        ) : (
          <img src={card.image} alt={`${card}`} className="card-image" />
        )}
        <div className="card-border"></div>
      </div>
      <div className="button-wrapper text-center">
        {unStaked ? (
          approved ? (
            <button className="hover-effect3" onClick={onStake}>
              Stake
            </button>
          ) : loadingApprove ? (
            <button className="hover-effect3">
              <img
                src="/static/images/icons/loading.gif"
                height="25"
                alt=""
                style={{ marginTop: 3, marginRight: 5 }}
              />{" "}
              Approving...
            </button>
          ) : (
            <button className="hover-effect3" onClick={onApprove}>
              Approve All
            </button>
          )
        ) : (
          <button className="hover-effect3" onClick={(e) => onUnStake(card.id)}>
            {loadingUnStake && card.id === currentProcessingCardId ? (
              <div className="loading-wrapper">
                <img
                  src="/static/images/icons/loading.gif"
                  height="25"
                  alt=""
                  style={{ marginTop: 3, marginRight: 5 }}
                />{" "}
                Unstaking...
              </div>
            ) : (
              `Unstake`
            )}
          </button>
        )}
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  margin: 8px;

  .card {
    width: 310px;
    height: 432px;
    position: relative;
    padding: 17px 14px;
    background: transparent;

    .card-image {
      width: 290px;
      height: 410px;
      position: absolute;

      &.un-obtained {
        opacity: 0.3;
      }
    }

    .un-staked {
      width: 290px;
      height: 410px;
    }

    .card-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 320px;
      height: 443px;
      background: url("/static/images/bg/components/card/card-border.png");
      background-size: cover;

      &:hover {
        background: url("/static/images/bg/components/card/card-border--active.png");
        background-size: cover;
      }
    }

    .marked {
      position: absolute;
      top: 6.566px;
      left: 6.66px;
      width: 99px;
      height: 99px;
    }
  }

  .button-wrapper {
    button {
      width: 238px;
      height: 52px;
      background: url("/static/images/bg/components/card/button-bg.png");
      border: none;
      color: #161617;
      font-size: 20px;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      outline: none;
      box-sizing: border-box;
      padding-top: 15px;

      &:hover {
        background: url("/static/images/bg/components/card/button-bg--active.png");
        color: #fec100;
      }
    }
    .loading-wrapper {
      display: flex;
      font-size: 20px;
      justify-content: center;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      color: #161617;
    }
  }
`;

export default CardStaking;
