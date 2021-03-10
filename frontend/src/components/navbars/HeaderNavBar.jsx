import React, { useState, useEffect } from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Link } from "react-router-dom";
import ProfileNavItem from "components/navitems/ProfileNavItem";
import RegisterLoginNavItem from "components/navitems/RegisterLoginNavItem";
import { connect } from "react-redux";

const navBarStyle = {
  Root: {
    style: {
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "12%",
      paddingRight: "12%"
    },
  },
}

const HeaderNavBar =  ({ user }) => {

  return (
    <HeaderNavigation
      overrides={navBarStyle}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Link to="/">
            <h1>BFit</h1>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      {user ? <ProfileNavItem user={user} /> : <RegisterLoginNavItem />}
    </HeaderNavigation>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps
)(HeaderNavBar);