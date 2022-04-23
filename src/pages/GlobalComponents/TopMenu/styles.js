import  styled, { css }  from "styled-components";

import SacramentoFontUrl from '../../../assets/fonts/Sacramento-Regular.ttf'

export const fontFaces = css`
  @font-face {
    font-family: 'Sacramento';
    src: url(${SacramentoFontUrl}) format('ttf');
    font-style: normal;
  }
`;

export const TopNav = styled.nav`
    min-height: 50px;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
`

export const LogoBox = styled.div`
    flex: 1;
`

export const LogoImage = styled.img`
    width: 100%;
    height: 100%;
`

export const LogoTitle = styled.span`
    font-family: 'Sacramento';
`