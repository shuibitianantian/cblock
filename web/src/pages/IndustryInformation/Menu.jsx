/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useIndustryInformation } from "./IndustryInformation";
import { SUBDOMAIN_COMPANIES } from "../../assets/companies";
import CustomizedAccordions from "../../components/CustomizedAccordions";

const styles = {
  overview: css`
    display: flex;
    align-items: center;
    padding: 0px 30px;
    width: 100%;
    height: 60px;
    font-size: 26px;
    font-weight: 700;
    font-family: "Outfit", sans-serif;
    color: rgba(0, 0, 0, 0.5);
    &:hover {
      color: #38374f;
      cursor: pointer;
      transition: color 0.5s;
    }
  `,
  panel: css`
    min-height: 92vh;
    background-color: #e0dbc1;
  `,
};

export const Menu = () => {
  const industryInformation = useIndustryInformation();

  return (
    <div css={styles.panel}>
      <div
        css={css`
          position: sticky;
          top: 0px;
          z-index: 10;
          background-color: #e0dbc1;
        `}>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={currentYear - 2019}
            variant='fullWidth'
            centered
            onChange={(e, newValue) => {
              setCurrentYear(newValue + 2019);
            }}>
            <Tab label='2019' />
            <Tab label='2020' />
          </Tabs>
        </Box> */}
        <div
          css={styles.overview}
          onClick={() => {
            industryInformation.setInOverview(true);
            industryInformation.setInSearch(false);
            industryInformation.setSelectedCompany("");
            industryInformation.setSelectedSubdomain("");
          }}>
          Overview
        </div>
        <div
          css={styles.overview}
          onClick={() => {
            industryInformation.setInOverview(false);
            industryInformation.setInSearch(true);
            industryInformation.setSelectedCompany("");
            industryInformation.setSelectedSubdomain("");
          }}>
          Search
        </div>
      </div>
      {/* <CustomizedAccordions
        content={{
          Subdomains: Object.keys(SUBDOMAIN_COMPANIES),
        }}
      /> */}
    </div>
  );
};
