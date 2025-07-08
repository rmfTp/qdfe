import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { MdHome, MdDraw } from 'react-icons/md';
import { VscSignIn } from 'react-icons/vsc';

import color from '../styles/color';
import fontsize from '../styles/fontsize';

const { primary, light, dark } = color;
const { big, extraBig } = fontsize;

const StyledHeader = styled.header`
  height: 90px;
  display: flex;
  background: ${primary};
  color: ${light};
  align-items: center;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  a {
    .left,
    .right {
      display: flex;
      flex-growth: 1;
    }
    .right {
      justify-content: right;
    }
    font-size: ${big};
    color: ${light};
    align-items: center;

    &.on {
      text-shadow: 2px 2px 5px ${dark};
    }

    svg {
      font-size: ${extraBig};
    }
  }

  a + a {
    margin-left: 25px;
  }
`;

const Header = () => {
  return (
    <StyledHeader className="layout-width">
      <div className="left">
        <NavLink to="/">
          <MdHome />
          <span>메인으로</span>
        </NavLink>
        <NavLink
          to="/draw"
          className={({ isActive }) => classNames({ on: isActive })}
        >
          <MdDraw />
          <span>낙서하기</span>
        </NavLink>
      </div>
      <div className="right">
        <NavLink
          to="/member/login"
          className={({ isActive }) => classNames({ on: isActive })}
        >
          <VscSignIn />
          <span>로그인</span>
        </NavLink>
      </div>
    </StyledHeader>
  );
};

export default React.memo(Header);
