/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { SubdomainInformation } from "./SudomainInformation";
import { CompanyInformation } from "./CompanyInformation";
import React, { useEffect, useState } from "react";
import { useIndustryInformation } from "./IndustryInformation";
import { Overview } from "./Overview";
import { Search } from "./Search";
import ImageModal from "../../components/ImageModal";
import { FI_MAPPING } from "../../assets/fi";

const mapping = {
  "gross profit margin": [
    "profitability-gross1.png",
    "profitability-gross2.png",
    "profitability-gross3.png",
  ],
};

const styles = {
  container: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  `,
  profile: css`
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    padding: 20px 50px;
    border-radius: 10px;
    margin-bottom: 50px;

    p {
      font-size: 20px;
    }
  `,
  imageContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 40%;

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
};

export const Content = () => {
  const industryInformation = useIndustryInformation();

  console.log(industryInformation.section);
  const [fi, setFi] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      const response = await fetch(
        `http://localhost:3006/financialIndicators?fi=${industryInformation.section.toLowerCase()}`
      );
      setFi(await response.json());
    };

    if (industryInformation.section) {
      fetchData();
    }
  }, [industryInformation.section]);

  console.log(fi);
  const fiDescription =
    industryInformation.section &&
    FI_MAPPING[industryInformation.section.toLowerCase()];

  const render = () => {
    if (industryInformation.selectedCompany) {
      return <CompanyInformation />;
    } else if (industryInformation.selectedSubdomain) {
      return <SubdomainInformation />;
    } else if (industryInformation.section) {
      return (
        <>
          <h1
            css={css`
              text-align: center;
              font-size: 50px;
              color: #c5a872;
            `}>
            {industryInformation.section}
          </h1>

          <div css={styles.profile}>
            <p>{fiDescription}</p>
          </div>
          <div css={styles.profile}>
            <div
              css={css`
                display: flex;
                justify-content: space-around;
              `}>
              <div>
                <h2>Top 10 Positive Measures</h2>
                {fi &&
                  fi.top10.map((item, idx) => {
                    return <p key={idx}>{item[0]}</p>;
                  })}
              </div>
              <div>
                <h2>Top 10 Negative Measures</h2>
                {fi &&
                  fi.end10.map((item, idx) => {
                    return <p key={idx}>{item[0]}</p>;
                  })}
              </div>
            </div>
          </div>
          <div css={styles.container}>
            <div css={styles.imageContainer}>
              <ImageModal
                src={`measures_parameters/${industryInformation.section}.jpg`}>
                <img
                  src={`measures_parameters/${industryInformation.section}.jpg`}
                  alt='measure'
                />
              </ImageModal>
            </div>
            <div css={styles.imageContainer}>
              <ImageModal
                src={`train_history/${industryInformation.section}.jpg`}>
                <img
                  src={`train_history/${industryInformation.section}.jpg`}
                  alt='measure'
                />
              </ImageModal>
            </div>
          </div>
        </>
      );
    } else {
      return industryInformation.inOverview ? <Overview /> : <Search />;
    }
  };
  return render();
};
