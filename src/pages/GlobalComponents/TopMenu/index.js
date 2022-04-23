import React from "react";

import { TopNav, LogoBox, LogoImage, LogoTitle } from './styles';

const TopMenu = () => {
    return(
        <TopNav>
            <LogoBox>
                <LogoImage alt="Winvite Logo"/> <LogoTitle>Winvite</LogoTitle>
            </LogoBox>
        </TopNav>
    )
}

export default TopMenu;