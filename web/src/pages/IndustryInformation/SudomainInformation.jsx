/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { SUBDOMAIN_COMPANIES } from "../../assets/companies";
import { useIndustryInformation } from "./IndustryInformation";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ImageModal from "../../components/ImageModal";

const styles = {
  profile: css`
    display: flex;
    justify-content: center;
    margin-top: 80px;
    gap: 80px;
  `,
  imageContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
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
function BasicSelect({ companies }) {
  const industryInformation = useIndustryInformation();

  const handleChange = (event) => {
    industryInformation.setSelectedCompany(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Company Code</InputLabel>
          <Select
            value={industryInformation.selectedCompany}
            label='company code'
            onChange={handleChange}>
            {companies.map((c, index) => (
              <MenuItem value={c} key={index}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export const SubdomainInformation = () => {
  const industryInformation = useIndustryInformation();

  return (
    <div>
      <h1
        css={css`
          text-align: center;
          margin-bottom: 50px;
        `}>
        {industryInformation.selectedSubdomain}
      </h1>
      <BasicSelect
        companies={
          industryInformation.selectedSubdomain &&
          SUBDOMAIN_COMPANIES[industryInformation.selectedSubdomain]
        }
      />
      <div css={styles.profile}>
        <div css={styles.imageContainer}>
          <h2
            css={css`
              margin: 0px 0px 50px 0px;
              font-size: 32px;
            `}>
            Impact Distribution
          </h2>
          <ImageModal
            src={`impacts/${industryInformation.selectedSubdomain}.jpg`}>
            <img
              src={`impacts/${industryInformation.selectedSubdomain}.jpg`}
              alt='measure'
            />
          </ImageModal>
        </div>
        <div css={styles.imageContainer}>
          <h2
            css={css`
              margin: 0px 0px 50px 0px;
              font-size: 32px;
            `}>
            Measures Distribution
          </h2>
          <ImageModal
            src={`measures/${industryInformation.selectedSubdomain}.jpg`}>
            <img
              src={`measures/${industryInformation.selectedSubdomain}.jpg`}
              alt='measure'
            />
          </ImageModal>
        </div>
      </div>
    </div>
  );
};
