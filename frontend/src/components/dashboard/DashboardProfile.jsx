import React from "react";
import { useStyletron } from "baseui";
import { HeadingSmall } from 'baseui/typography';
import { Avatar } from "baseui/avatar";

export default ({ user }) => {
  const [css, theme] = useStyletron();
  return (
    <div className={css({
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      width: '100%',
    })}>
      <div className={css({
        paddingRight: '15px'
      })}>
        <Avatar name={user.name} size="scale1200"/>
      </div>
      <div className={css({
      })}>
        <HeadingSmall>{user.username}</HeadingSmall>
      </div>
    </div>
  );
}