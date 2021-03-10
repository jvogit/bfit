import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from 'baseui/avatar';
import { Button, SHAPE, KIND } from 'baseui/button';
import ChevronDown from 'baseui/icon/chevron-down';
import AuthService from 'services/AuthService';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';

const buttonStyle = {
  BaseButton: {
    style: {
      ":hover": {
        backgroundColor: "transparent"
      },
      ":active": {
        backgroundColor: "transparent"
      },
    }
  }
};

export default ({ user }) => {
  let history = useHistory();

  const ITEMS = [
    {
      label: 'Dashboard', callback: () => {
        history.push("/dashboard");
      }
    },
    {
      label: 'Logout', callback: () => {
        AuthService.logout();
        history.push("/");
        window.location.reload();
      }
    },
  ];

  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <StatefulMenu
          items={ITEMS}
          onItemSelect={({ item }) => { item.callback(); close(); }}
          overrides={{
            List: { style: { width: '138px' } },
          }}
        />
      )}
    >
      <Button
        kind={KIND.minimal}
        endEnhancer={() => <ChevronDown size={24} />}
        overrides={buttonStyle}
      >
        <Avatar name={user.name} />
      </Button>
    </StatefulPopover>
  );
}