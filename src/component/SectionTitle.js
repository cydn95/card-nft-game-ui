import React from "react";
import styled from "styled-components";

const SectionTitle = ({ title, long }) => {
	return (
		<SectionTitleWrapper>
			<div className={`title ${long && 'long'}`}>
				{ title }
			</div>
			<div className="title-line" />
		</SectionTitleWrapper>
	);
};

const SectionTitleWrapper = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 10px;

	.title {
      background-image: url('/static/images/bg/components/section-title/section-title-bg.png');
      background-size: 100% 100%;
      width: 210.37px;
      height: 75.05px;
      text-align: right;
      color: #fec100;
      font-size: 23.2px;
      line-height: 38.6px;
      padding: 8.57px 38.67px 0 0;
      font-family: Orbitron-Black;
      text-shadow: 3.86px 5.36px 2.32px #27787580;
      margin-right: -3.86px;
      
      @media screen and (max-width: 1024px) {
        width: 210.37px;
        height: 60.04px;
        font-size: 18.56px;
        line-height: 30.88px;
        padding: 6.86px 30.94px 0 0;
      }
    
      &.long {
      	background-image: url('/static/images/bg/components/section-title/section-title-bg--long.png');
      	width: 326px;
      	margin-right: -7.73px;
        padding-top: 10.72px;
        
        @media screen and (max-width: 1024px) {
          width: 260.87px;
          margin-right: -15.18px;
          padding-top: 8.58px;
        }
      }
    }

    .title-line {
      background: url('/static/images/bg/components/section-title/section-title-line.png') no-repeat;
      background-position: bottom;
      background-size: 100% 19.3px;
      flex: 1;
      height: 73.98px;

      @media screen and (max-width: 1024px) {
        height: 62.184px;
        margin-left: 15px;
      }
    }
`;

export default SectionTitle;
