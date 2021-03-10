import React from "react";
import { useStyletron } from "baseui";

export const CenterInnerLayout = ({ children }) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.colors.accent200,
        color: theme.colors.accent700,
        padding: '.25rem',
      })}
    >
      {children}
    </div>
  );
};

export default ({ children }) => {
  const [css, theme] = useStyletron();

  const center = css({
    margin: "0 auto",
    width: "76%",
    padding: "10px",
  });

  return (
    <div className={center}>
      {children}
    </div>
  );
}