import React from "react";
import styled from "styled-components";

const SectionTitleWrapper = styled.div`
	display: flex;

	.title {
      background-image: url('/static/images/bg/components/section-title/section-title-bg.png');
      background-size: 100% 100%;
      width: ${props => props.theme.widthRatio * 272}px;
      height: ${props => props.theme.heightRatio * 70}px;
      text-align: right;
      color: ${props => props.theme.palette.secondary.main};
      font-size: ${props => props.theme.widthRatio * 30}px;
      line-height: ${props => props.theme.heightRatio * 36}px;
      padding: ${props => props.theme.heightRatio * 8}px ${props => props.theme.widthRatio * 50}px 0 0;
      font-family: Orbitron-Black;
      text-shadow: ${props => props.theme.widthRatio * 5}px
       						 ${props => props.theme.heightRatio * 5}px
       						 ${props => props.theme.widthRatio * 3}px
       						 #27787580;
      margin-right: -${props => props.theme.widthRatio * 5}px;
      
      &.long {
      	background-image: url('/static/images/bg/components/section-title/section-title-bg--long.png');
      	width: ${props => props.theme.widthRatio * 352}px;
      	margin-right: -${props => props.theme.widthRatio * 10}px;
      	padding-top: ${props => props.theme.heightRatio * 10}px;
      }
    }

    .title-line {
      background: url('/static/images/bg/components/section-title/section-title-line.png') no-repeat;
      background-position: bottom;
      background-size: 100% ${props => props.theme.heightRatio * 18}px;
      width: ${props => props.theme.widthRatio * 853}px;
      height: ${props => props.theme.heightRatio * 69}px;
    }
`;

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

export default SectionTitle;
