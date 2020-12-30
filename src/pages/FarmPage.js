import React from "react";
import { useSelector } from "react-redux";
import { useWallet } from "use-wallet";
import styled from "styled-components";

import UnlockWalletPage from "./UnlockWalletPage";
import SectionTitle from "../component/SectionTitle";
import FarmBoard from "../container/FarmBoard";

import { farms } from "../helper/contractFarm";
import { getValueFromObject } from "../helper/utils";

const Farm = () => {
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
    <FarmPageContainer>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Stake LP tokens" long />
      </MenuWrapper>
      <div
        className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
        style={{ paddingBottom: 100 }}
      >
        {Object.keys(farms).map((key) => (
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
        ))}
      </div>
    </FarmPageContainer>
  );
};

const FarmPageContainer = styled.div`
  width: 100vw;
  max-width: 100%;

  .nav-pills {
    margin: 0px;
  }

  .nav-pills .nav-item .nav-link {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  h2 {
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    color: #fec100;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }
`;

export default Farm;
