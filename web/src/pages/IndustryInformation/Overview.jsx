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
        <h2>Manifacture</h2>
        <p>
          Manufacturing in the United States is a vital sector. The United
          States is the world's third largest manufacturer with a record high
          real output in Q1 2018 of $2.00 trillion (i.e., adjusted for inflation
          in 2009 Dollars) well above the 2007 peak before the Great Recession
          of $1.95 trillion.The U.S. manufacturing industry employed 12.35
          million people in December 2016 and 12.56 million in December 2017, an
          increase of 207,000 or 1.7%. Though still a large part of the US
          economy, in Q1 2018 manufacturing contributed less to GDP than the
          'Finance, insurance, real estate, rental, and leasing' sector, the
          'Government' sector, or 'Professional and business services' sector.
        </p>
        <p>
          Among manufacturing industries, automobile enterprises were especially
          suffering from COVID-19. Almost all automobile companies reported the
          pandemic has had a negative effect on them. For example, during the
          epidemic, Nissan’s difficulty in sourcing parts and components from
          China, which led to the suspension of production at the Fukuoka plant
          in Japan as well as production lines for exporting cars. Bosch's Wuhan
          plant is still in shutdown. As Bosch relies heavily on the Chinese
          market, it has issued a warning that the risk of supply chain rupture
          has begun to appear.
        </p>
        <div>
          <h2>Service</h2>
          <p>
            Already in 1940 the U.S. became a so called “service economy”
            meaning that more than half of its work force is employed in
            producing intangibles. By 1975 two thirds of the work force was part
            of the tertiary sector.[1] The Tertiary Sector, also known as the
            Service Sector, has become the number one driving force of the U.S.
            economy during the last decades. According to recent statistics
            (2002) it nowadays accounts for 78% of the U.S. non-agricultural
            employment and 76% of the U.S. private sector Gross Domestic Product
            (GDP). Additionally, the U.S. is the world’s premier services
            exporter (17% of worldwide services trade) and importer (14% of
            worldwide services trade) at the same time.[2] These figures alone
            necessitate a closer look. However, scientist even predict a
            continuous increase in the relevance of this industry for the U.S.
            Economy, expecting that almost 100% of additionally created jobs
            during the next decade will belong to the Service Sector.[3]
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
