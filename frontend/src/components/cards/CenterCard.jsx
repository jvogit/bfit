import React from 'react';
import { Card } from 'baseui/card';

export default (props) => {

  return (
    <Card
      {...props}
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
      {props.children}
    </Card>
    );
}