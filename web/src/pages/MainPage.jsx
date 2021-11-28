/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { Fragment } from "react";
import { IntroCard } from "../components/IntroCard";
import { INTRO_CARDS } from "../assets/introCardsDescription";
import { aboutDescription } from "../assets/about";

const styles = {
  page: css`
    position: relative;
    max-height: 100vh;
    overflow: hidden;
  `,
  background: css`
    max-width: 100vw;
  `,
  projectTitle: css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    color: ghostwhite;
    font-size: 2.2vw;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  `,
  title: css`
    text-align: center;
    inline-size: 1300px;
    padding-left: 60px;
    cursor: auto;
    letter-spacing: 2px;
  `,
  breaker: css`
    height: 50px;
    width: 200px;
    border-top: 12px solid #c5a872;
  `,
  applicationContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Open Sans", sans-serif;
    background-color: white;
    font-weight: 700;
    margin-bottom: 20px;

    & > p {
      font-size: 3vw;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 100px;
      margin-bottom: 20px;
    }
  `,

  applicationContent: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  `,

  tailContainer: css`
    display: flex;
    justify-content: center;
    margin: 100px 0px 0px 0px;
    background-color: #f2f2f2;
    gap: 100px;
  `,

  about: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "Open Sans", sans-serif;
    padding-left: 10vw;
    h1 {
      font-size: 2.8vw;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    div:nth-child(3) {
      width: 80%;
      font-size: 19px;
      text-align: justify;
      font-weight: 200;
    }
  `,
  tailImage: css`
    width: 50%;
    height: 50%;
    img {
      width: 1200px;
    }
  `,
  breaker2: css`
    height: 50px;
    width: 120px;
    border-top: 12px solid #c5a872;
  `,
};

export const MainPage = () => {
  return (
    <Fragment>
      <div css={styles.page}>
        <img src='bg-4.jpg' css={styles.background} alt='bg' />
        <div css={styles.projectTitle}>
          <h1 css={styles.title}>
            Develop Corporate Strategies for Global Disasters
          </h1>
        </div>
      </div>

      <div css={styles.applicationContainer}>
        <p>Applications</p>
        <div css={styles.breaker}></div>
        <div css={styles.applicationContent}>
          {INTRO_CARDS.map((card, idx) => {
            return <IntroCard {...card} key={idx} />;
          })}
        </div>
      </div>

      <div css={styles.tailContainer}>
        <div css={styles.about}>
          <h1>About</h1>
          <div css={styles.breaker2}></div>
          <div>{aboutDescription}</div>
        </div>
        <div css={styles.tailImage}>
          <img src='bg-2.jpg' alt='tail-img' />
        </div>
      </div>
    </Fragment>
  );
};
