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
      
      &.long {
      	background-image: url('/static/images/bg/components/section-title/section-title-bg--long.png');
      	width: 326px;
      	margin-right: -7.73px;
      	padding-top: 10.72px;
      }
    }

    .title-line {
      background: url('/static/images/bg/components/section-title/section-title-line.png') no-repeat;
      background-position: bottom;
      background-size: 100% 19.3px;
      flex: 1;
      height: 73.98px;
    }
`;

export default SectionTitle;
