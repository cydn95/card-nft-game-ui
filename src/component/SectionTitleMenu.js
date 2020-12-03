import React from "react";
import styled from "styled-components";

import cx from "classnames";

const SectionTitleMenu = ({ data, selected, onChangeMenu }) => {
  return (
    <SectionTitleWrapper>
      {data.map((d, index) => (
        <div
          role="button"
          className={cx("title", { active: selected === d.title })}
          key={index}
          onClick={e => onChangeMenu(d.title)}
        >
          {d.title}
        </div>
      ))}
      <div className="title-line" />
    </SectionTitleWrapper>
  );
};

const SectionTitleWrapper = styled.div`
  display: flex;

  .title {
    background-image: url("/static/images/bg/components/section-title/section-title-last-bg.png");
    background-size: 100% 100%;
    width: 240px;
    height: 53px;
    text-align: right;
    color: ${(props) => props.theme.palette.secondary.main};
    font-size: 28px;
    line-height: 34px;
    padding: 7px 45px 0 0;
    font-family: Orbitron-Black;
    text-shadow: 4px 4px 2.7px #27787580;
    margin-right: -23px;
    cursor: pointer;

    &.active {
      background-image: url("/static/images/bg/components/section-title/section-title-last-bg--active.png");
    }

    &:first-child {
      width: 220px;
      background-image: url("/static/images/bg/components/section-title/section-title-first-bg.png");
      text-align: center;

      &.active {
        background-image: url("/static/images/bg/components/section-title/section-title-first-bg--active.png");
      }
    }
  }

  .title-line {
    background: url("/static/images/bg/components/section-title/section-title-line.png")
      no-repeat;
    background-position: bottom;
    background-size: 100% 18px;
    margin-left: 30px;
    width: 500px;
    height: 65px;
  }
`;

export default SectionTitleMenu;
