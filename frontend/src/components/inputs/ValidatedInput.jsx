import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Alert } from 'baseui/icon';

function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}


export default (props) => {
  const [error, setError] = useState(false);
  const [visited, setVisited] = useState(false);
  const [val, setVal] = useState('');
  const isInvalid = visited && error;

  function handleChange(e) {
    setVal(e.target.value);
    setError(props.validate ? !props.validate(e.target.value) : false);
    props.onChange(e);
  }

  return (
    <FormControl
      error={
        isInvalid ? props.errorMessage : null
      }
    >
      <Input 
        {...props}
        onBlur={() => setVisited(true)}
        onChange={handleChange}
        error={isInvalid}
        overrides={isInvalid ? {After: Negative} : {}}
      />
    </FormControl>
  );
}