import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideNav from "./SideNav";

const Layout = ({ openSidenav, closeSidenav, sideNavWidth }) => {
 
  return (
    <AppContainer>
      {sideNavWidth === "0" && (
        <ButtonOpenSideNav onClick={openSidenav}>☰</ButtonOpenSideNav>
      )}
      <SideNav width={sideNavWidth} closeNav={closeSidenav} />
      <ContentContainer>
         <Outlet /> 
      </ContentContainer>
    </AppContainer>
  );
};

export default Layout ;

 const AppContainer = styled.div`
   display: flex;
   position: relative;
 `;

const ButtonOpenSideNav = styled.button`
  position: absolute;
  top: 0;
  left: 1px;
  font-size: 20px;
  background-color: #762222;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 16px;
  margin-left: 200px;
`;
