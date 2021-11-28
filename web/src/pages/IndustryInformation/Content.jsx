/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { SubdomainInformation } from "./SudomainInformation";
import { CompanyInformation } from "./CompanyInformation";
import React from "react";
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
    margin-bottom: 50px;
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
  const imgs =
    industryInformation.section &&
    mapping[industryInformation.section.toLowerCase()];

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
          <div css={styles.profile}>
            <h1>{industryInformation.section}</h1>
            <p>{fiDescription}</p>
          </div>
          <div css={styles.container}>
            {imgs
              ? imgs.map((i) => {
                  return (
                    <div css={styles.imageContainer} key={i}>
                      <ImageModal src={i}>
                        <img src={i} alt='measure' />
                      </ImageModal>
                    </div>
                  );
                })
              : "Not Content"}
          </div>
        </>
      );
    } else {
      return industryInformation.inOverview ? <Overview /> : <Search />;
    }
  };
  return render();
};
