import React from "react";
import { useStyletron } from "baseui";
import { HeadingSmall } from 'baseui/typography';
import { Avatar } from "baseui/avatar";
import { Button } from "baseui/button";
import { useHistory } from "react-router";

export default ({ user }) => {
  const [css, theme] = useStyletron();
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div className={css({
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
      })}>
        <div className={css({
          paddingRight: '15px'
        })}>
          <Avatar name={user.name} size="scale1200" />
        </div>
        <div className={css({
        })}>
          <HeadingSmall>{user.username}</HeadingSmall>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            history.push("/records/calorie/create");
          }}
        >
          Add Record
        </Button>
      </div>
    </div>
  );
}