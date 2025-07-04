import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mainImage from '../../global/images/main.png';
import { MediumButton } from '../../global/components/Buttons';

const Wrapper = styled.div`
  position: absolute;
  height: calc(100% - 190px);
  width: 100%;
  top: 90px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .main-image {
    display: block;
    margin-bottom: 30px;
    max-width: 580px;
    min-width: 320px;
    width: 100%;
  }

  .start-btn {
    width: 200px;
    display: block;
    margin: 0 auto;
  }
`;

const MainPage = () => {
  return (
    <Wrapper className="layout-width">
      <div>
        <img className="main-image" src={mainImage} alt="메인이미지" />
        <Link to="/draw" className="start-btn">
          <MediumButton type="button">시작하기</MediumButton>
        </Link>
      </div>
    </Wrapper>
  );
};

export default React.memo(MainPage);
