import React, { useState } from 'react';
import { StyledBody, StyledAction } from 'baseui/card';
import { Input } from 'baseui/input';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import ErrorNotification from 'components/notifications/ErrorNotification';
import { connect } from "react-redux";
import { LOGIN_REQUEST } from "utils/store_constants";

const columnItem = {
  height: 'scale1000',
  paddingBottom: 'scale600',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'center',
};

const oneLinerItem = {
  ...columnItem,
  overrides: {
    Block: {
      style: ({ $theme }) => ({
        width: `calc((200% - ${$theme.sizing.scale800}) / 2)`
      }),
    },
  },
};

const LoginForm = (props) => {
  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    props.login(userName, passWord);
  }

  return (
    <form onSubmit={onSubmit}>
      <ErrorNotification isVisible={props.error} errorMessage={props.error} />
      <StyledBody>
        <FlexGrid
          flexGridColumnCount={2}
          flexGridColumnGap='scale800'
          flexGridRowGap='scale800'
        >
          <FlexGridItem display='none' />
          <FlexGridItem {...oneLinerItem}>
            <Input
              required
              onChange={e => setUsername(e.target.value)}
              placeholder='Username'
            />
          </FlexGridItem>
          <FlexGridItem display='none' />
          <FlexGridItem {...oneLinerItem}>
            <Input
              required
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
            />
          </FlexGridItem>
        </FlexGrid>
      </StyledBody>
      <StyledAction>
        <Block
          marginTop='scale1000'
          marginBottom='scale1000'
        >
          <Button
            type='submit'
            overrides={{
              BaseButton: {
                style: {
                  width: '100%'
                }
              }
            }}
          >
            Log in
            </Button>
        </Block>
      </StyledAction>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch({ type: LOGIN_REQUEST, username, password }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);