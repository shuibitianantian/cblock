/** @jsxRuntime classic */
/**@jsx jsx*/
import { css, jsx } from "@emotion/react";
import { Fragment } from "react";

const styles = {
  container: css`
    display: flex;
    max-height: 86vh;
  `,
  leftPanel: css`
    min-width: 20%;
    max-width: 20%;
    min-height: 88%;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  rightPanel: css`
    min-width: 76%;
    max-width: 76%;
    min-height: 80%;
    background-color: #f5f5f5;
    padding: 50px;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
export const TwoPartLayout = ({ leftRender, rightRender }) => {
  return (
    <div css={styles.container}>
      <div css={styles.leftPanel}>{leftRender()}</div>
      <div css={styles.rightPanel}>{rightRender()}</div>
    </div>
  );
};
