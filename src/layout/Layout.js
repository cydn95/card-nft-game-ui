import React from "react";
import styled from "styled-components";
import Header from "../component/Header";

const LayoutWrapper = styled.div`
 	width: 100vw;
  height: 100vh;
  background: url('/static/images/bg/layout/layout-bg.png');
  background-size: 100vw 100vh;
  overflow: auto;
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
