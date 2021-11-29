/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import ImageModal from "../../components/ImageModal";

const styles = {
  overview: css`
    height: 80vh;
    width: 100%;
  `,
  intro: css`
    background-color: white;
    border-radius: 20px;
    padding: 10px 0px 10px 80px;
    p {
      padding: 0px 80px 0px 0px;
    }
  `,
  imageContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    width: 50%;

    background-color: white;
    border-radius: 20px;

    img {
      height: 20vw;
      object-fit: cover;
    }

    &:hover {
      cursor: pointer;
    }
  `,

  images: css`
    margin: 20px 0px;
    display: flex;
    gap: 20px;
  `,
};

export const Overview = () => {
  return (
    <div css={styles.overview}>
      <div css={styles.intro}>
        <h1
          css={css`
            text-align: center;
            color: #c5a872;
          `}>
          Two Target Sectors for Analysis
        </h1>
        <h2>Manifacturing</h2>
        <p>
          A newly released survey of manufacturing leaders conducted by the
          National Association of Manufacturers reveals the state of the
          industry as the situation unfolds. In the survey, which was in the
          field from Feb. 28 to March 9, 78.3% of respondents say that the
          COVID-19 outbreak is likely to have a financial impact on their
          businesses; 53.1% of manufacturers are anticipating a change in their
          operations in the coming months; and 35.5% say that they are already
          facing supply chain disruptions.
        </p>
        <div>
          <h2>Service</h2>
          <p>
            The Tertiary Sector, also known as the Service Sector, has become
            the number one driving force of the U.S. economy during the last
            decades. According to recent statistics, it now accounts for 78% of
            the U.S. non-agricultural employment and 76% of the U.S. private
            sector Gross Domestic Product (GDP). Additionally, the U.S. is the
            world’s premier services exporter (17% of worldwide services trade)
            and importer (14% of worldwide services trade) at the same time.
          </p>
        </div>
        <div>
          <h2>Analysis Point</h2>
          <p>
            We focus our analysis scope specifically on companies of
            manufacturing and service industries because these industries were
            most prevalent leading industries and vulnerable to the COVID-19
            crisis. The restrictions on on-site working environments and supply
            chain disruptions clearly imply that there will be some shared
            impacts and actions taken on the crisis. C-block’s higher level
            analysis shows the following: Profound proportions of companies were
            experiencing disruptions on business, supply chain, and employee
            relations. Many companies implemented COVID-19 impact assessment,
            employee travel restrictions, and seek alternative
            suppliers/sources.
          </p>
        </div>
      </div>
      <div css={styles.images}>
        <div css={styles.imageContainer}>
          <ImageModal src='overview1.jpg'>
            <h2>Company Strategies for COVID-19</h2>
            <img src='overview1.jpg' alt='measure' />
          </ImageModal>
        </div>

        <div css={styles.imageContainer}>
          <ImageModal src='overview2.jpg'>
            <h2>Impacts from COVID-19</h2>
            <img src='overview2.jpg' alt='bar' />
          </ImageModal>
        </div>
      </div>
    </div>
  );
};
