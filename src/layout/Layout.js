import React from "react";
import styled from "styled-components";
import Header from "../component/Header";

const LayoutWrapper = styled.div`
 	width: 100vw;
  height: 100vh;
  background: url('/static/images/bg/layout/layout-bg.png');
  background-size: 100vw 100vh;
  overflow: auto;
  
  .nav-pills {
    margin: -40px 0 19px;

    .nav-item {
      .nav-link {
        color: #80f1ed;
        font-size: 30px;
        font-family: Orbitron-Medium;
        padding: 8px;
        outline: none;
        text-shadow: 7px 7px 10px #80f1ed91;

        &.active {
          color: #fec100;
          font-family: Orbitron-Black;
          background: none;
          text-shadow: 0 0 7px #fec10059;
        }
      }
    }
  }
`;

const Layout = ({ children }) => {
	return (
		<LayoutWrapper>
			<Header />
			{ children }
		</LayoutWrapper>
	)
};

export default Layout;
