/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { useIndustryInformation } from "./IndustryInformation";
import CustomizedAccordions from "../../components/CustomizedAccordions";

const styles = {
  overview: css`
    display: flex;
    align-items: center;
    padding: 0px 30px;
    width: 100%;
    height: 60px;
    font-size: 24px;
    // font-weight: 700;
    font-family: "Outfit", sans-serif;
    color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.2);
    &:hover {
      color: #38374f;
      cursor: pointer;
      transition: color 0.5s;
    }
  `,
  panel: css`
    height: 100%;
    background-color: #e0dbc1;
  `,
};

export const Menu = () => {
  const industryInformation = useIndustryInformation();
  const reset = () => {
    industryInformation.setInOverview(false);
    industryInformation.setInSearch(false);
    industryInformation.setSelectedCompany("");
    industryInformation.setSelectedSubdomain("");
  };
  return (
    <div css={styles.panel}>
      <div
        css={css`
          position: sticky;
          top: 0px;
          z-index: 10;
          background-color: #e0dbc1;
        `}>
        <div
          css={styles.overview}
          onClick={() => {
            industryInformation.setInOverview(true);
            industryInformation.setInSearch(false);
            industryInformation.setSelectedCompany("");
            industryInformation.setSelectedSubdomain("");
            industryInformation.setSection("");
          }}>
          Industry Information
        </div>
        <div
          css={styles.overview}
          onClick={() => {
            industryInformation.setInOverview(false);
            industryInformation.setInSearch(true);
            industryInformation.setSelectedCompany("");
            industryInformation.setSelectedSubdomain("");
            industryInformation.setSection("");
          }}>
          Search
        </div>
        {/* <div css={styles.overview}> */}
        <CustomizedAccordions
          content={{
            Profitability: [
              "Net Profit Margin",
              "Gross Profit Margin",
              "Operating Profit Margin",
              "Return On Assets",
            ],
          }}
          handleClick={(item) => {
            reset();
            industryInformation.setSection(item);
          }}
        />
        {/* </div> */}

        {/* <div css={styles.overview}> */}
        <CustomizedAccordions
          content={{
            "Operating Efficiency": [
              "Total Assets Turnover",
              "Working Capital",
            ],
          }}
          handleClick={(item) => {
            reset();
            industryInformation.setSection(item);
          }}
        />
        {/* </div> */}
        {/* <div css={styles.overview}> */}
        <CustomizedAccordions
          content={{
            "Liquidity Ratio": ["Current Ratio", "Quick Ratio", "Cash Ratio"],
          }}
          handleClick={(item) => {
            reset();

            industryInformation.setSection(item);
          }}
        />
        {/* </div> */}
        {/* <div css={styles.overview}> */}
        <CustomizedAccordions
          content={{
            "Solvency Ratio": [
              "Financial Leverage",
              "Debt to Total Assets Ratio",
            ],
          }}
          handleClick={(item) => {
            reset();

            industryInformation.setSection(item);
          }}
        />
        {/* </div> */}
      </div>
    </div>
  );
};
