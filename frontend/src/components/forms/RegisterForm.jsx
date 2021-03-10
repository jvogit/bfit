import React, { useState, useEffect } from 'react';
import { StyledBody, StyledAction } from 'baseui/card';
import ValidatedInput from 'components/inputs/ValidatedInput';
import { Input } from 'baseui/input';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Block } from 'baseui/block';
import { Checkbox } from 'baseui/checkbox';
import { Button } from 'baseui/button';
import ErrorNotification from 'components/notifications/ErrorNotification';
import { connect } from "react-redux";
import { SIGNUP_REQUEST } from "utils/store_constants";

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

const RegisterForm =  (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [checkedTOS, setCheckedTOS] = useState(false);
  const [checkedPP, setCheckedPP] = useState(false);

  function register(e) {
    e.preventDefault();
    props.signup(`${firstName} ${lastName}`, userName, email, password);
  }

  return (
    <form onSubmit={register}>
      <ErrorNotification isVisible={props.error} errorMessage={props.error} />
      <StyledBody>
        <FlexGrid
          flexGridColumnCount={2}
          flexGridColumnGap='scale800'
          flexGridRowGap='scale800'

        >
          <FlexGridItem {...columnItem}>
            <Input
              onChange={e => setFirstName(e.target.value)}
              placeholder='First name'
            />
          </FlexGridItem>
          <FlexGridItem {...columnItem}>
            <ValidatedInput
              onChange={e => setLastName(e.target.value)}
              placeholder='Last name'
            />
          </FlexGridItem>
          <FlexGridItem display='none' />
          <FlexGridItem {...oneLinerItem}>
            <Input
              onChange={e => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
          </FlexGridItem>
          <FlexGridItem display='none' />
          <FlexGridItem {...oneLinerItem}>
            <ValidatedInput
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'
              validate={(text) => text}
              required
            />
          </FlexGridItem>
          <FlexGridItem display='none' />
          <FlexGridItem {...oneLinerItem}>
            <ValidatedInput
              onChange={e => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
              validate={(text) => text}
              errorMessage='Invalid password.'
              required
            />
          </FlexGridItem>
          <FlexGridItem display='none' />
          <FlexGridItem {...oneLinerItem}>
            <ValidatedInput
              onChange={e => setCPassword(e.target.value)}
              placeholder='Confirm password'
              type='password'
              validate={(text) => password === text}
              errorMessage='Passwords must match!'
              required
            />
          </FlexGridItem>
        </FlexGrid>
      </StyledBody>
      <StyledAction>
        <Block
          marginTop='scale1000'
          marginBottom='scale800'
        >
          <FlexGrid
            flexGridColumnCount={1}
            flexGridRowGap='scale800'
          >
            <FlexGridItem>
              <Checkbox
                required
                checked={checkedTOS}
                onChange={() => setCheckedTOS(!checkedTOS)}
              >
                I agree to the Terms of Service.
                </Checkbox>
            </FlexGridItem>
            <FlexGridItem>
              <Checkbox
                required
                checked={checkedPP}
                onChange={() => setCheckedPP(!checkedPP)}
              >
                I agree to the Privacy Policy.
                </Checkbox>
            </FlexGridItem>
          </FlexGrid>
        </Block>
        <Block>
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
            Register
            </Button>
        </Block>
      </StyledAction>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    signedUp: state.signup.signedUp,
    error: state.signup.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (name, username, email, password) => dispatch({ type: SIGNUP_REQUEST, name, username, email, password }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm);