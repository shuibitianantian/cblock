/** @jsxRuntime classic */
/**@jsx jsx*/
import { css, jsx } from "@emotion/react";

const width = "380px";

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    max-width: ${width};
    min-height: 500px;

    &:hover {
      img {
        transform: scale(1.1);
        transition: transform 2s;
      }
    }
  `,
  imgContainer: css`
    width: ${width};
    height: 250px;
    overflow: hidden;
    img {
      width: ${width};
    }
  `,
  title: css`
    font-size: 24px;
    margin-top: 30px;
    padding: 0px 30px;
    font-weight: 700;
    font-family: Inter, sans-serif;
    text-align: center;
    color: #4a6287;
  `,
  description: css`
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 0px 30px;
    text-align: justify;
    // font-family: Inter, sans-serif;
    font-weight: 300;
  `,
};

export const IntroCard = ({ title, img, description, customizedCss }) => {
  return (
    <div css={[styles.card, customizedCss && customizedCss.card]}>
      <div css={styles.imgContainer}>
        <img
          src={img}
          alt='introcard-img'
          css={[customizedCss && customizedCss.img]}
        />
      </div>

      <div css={[styles.title, customizedCss && customizedCss.title]}>
        {title}
      </div>
      <div
        css={[styles.description, customizedCss && customizedCss.description]}>
        {description}
      </div>
    </div>
  );
};
