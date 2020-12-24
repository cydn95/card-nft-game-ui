import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import { toast } from "react-toastify";
import styled from "styled-components";

import UnlockWalletPage from "./UnlockWalletPage";
import SectionTitle from "../component/SectionTitle";
import BoostStake from "../component/Farm/BoostStake";

const Farm = () => {
  // const dispatch = useDispatch();

  const [approveStatus, setApproveStatus] = useState({NDR: false});
  const getApproveStatus = (token) => {
    if (!(token in approveStatus)) {
      return false
    }

    return approveStatus[token];
  }

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
        <BoostStake token="NDR" approved={getApproveStatus("NDR")}/>
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
  
`

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
