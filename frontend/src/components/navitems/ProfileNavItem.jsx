import React, { useState } from 'react';
import {
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import ProfileDropdown from 'components/profiles/ProfileDropdown';

export default ({user}) => {
  return (
    <StyledNavigationList $align={ALIGN.right}>
      <StyledNavigationItem>
        <ProfileDropdown user={user} />
      </StyledNavigationItem>
    </StyledNavigationList>
  )
}