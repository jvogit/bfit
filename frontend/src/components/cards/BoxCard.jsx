import React, { useState, useRef, useEffect } from 'react';
import { Button, KIND } from 'baseui/button';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Slider } from 'baseui/slider';
import { Input } from 'baseui/input';
import { ArrowLeft } from 'baseui/icon';
import { Block } from 'baseui/block';
import { Checkbox } from 'baseui/checkbox';
import { Accordion, Panel } from 'baseui/accordion';
import { FormControl } from 'baseui/form-control';

const range09 = [...Array(10).keys()];
const rangeAZ = [...[...Array(26*2).keys()].map(i => String.fromCharCode(i < 26 ? i + 65 : i + 71))];

export default () => {
  const [length, setLength] = useState([16]);
  const [checkedAZ, setAZ] = useState(true);
  const [checked09, set09] = useState(true);
  const [copyStatus, setCopyStatus] = useState('Copy');
  const [password, setPassword] = useState(generatePassword());
  const passwordRef = useRef(null);
  
  function textToClipboard (text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  function pickFrom(arr) {
    const rando = Math.floor(Math.random() * arr.length);

    return arr[rando];
  }
  
  function updatePassword() {
    setPassword(generatePassword());
    setCopyStatus('Copy');
  }

  function generatePassword() {
    var pwd = '';
    for (var i = 0; i < length; ++i) {
      if (checkedAZ && checked09) pwd += pickFrom([...range09, ...rangeAZ]);
      else if (checkedAZ) pwd += pickFrom(rangeAZ);
      else if (checked09) pwd += pickFrom(range09);
    }

    return pwd;
  }

  useEffect(() => {
    updatePassword();
  // eslint-disable-next-line
  }, [length, checkedAZ, checked09])

  return (
    <Card
      overrides={{
        Root: {
          style: {
            left: '50%',
            maxWidth: '420px',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95vw',
          },
        }
      }}
    >

      <StyledBody>
        <Input
          ref={passwordRef}
          value={password}
          overrides={{
            After: () => (
              <Button 
                kind={KIND.minimal}
                onClick={() => updatePassword()}
              >
                <ArrowLeft />
              </Button>
            ),
          }}
        />
      </StyledBody>
      <StyledAction>
        <Button
          onClick={() => { textToClipboard(password); setCopyStatus('Copied') }}
        >
          {copyStatus}
        </Button>
        <Accordion>
          <Panel title='Options'>
            <Block>
              <FormControl label='Length'>
                <Slider
                  min={4}
                  max={64}
                  value={length}
                  onChange={({value}) => value[0] !== length[0] && setLength(value)}
                />
              </FormControl>
            </Block>
            <Block>
              <FormControl label='Characters'>
                <div>
                  <Checkbox
                    checked={checkedAZ}
                    onChange={() => setAZ(!checkedAZ)}
                  >
                    A-Z
                  </Checkbox>
                  <Checkbox
                    checked={checked09}
                    onChange={() => set09(!checked09)}
                  >
                    0-9
                  </Checkbox>
                </div>
              </FormControl>
            </Block>
          </Panel>
        </Accordion>
      </StyledAction>

    </Card>
    );
}