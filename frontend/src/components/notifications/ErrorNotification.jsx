import React, { useState } from 'react';
import {Notification, KIND} from 'baseui/notification';

export default ({isVisible, errorMessage}) => {
  return isVisible ? (
    <Notification kind={KIND.negative}>
      <b>An error has occured!</b>
      <p>
        {errorMessage}
      </p>
    </Notification>
  ) : null;
}