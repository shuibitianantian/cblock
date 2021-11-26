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

function BasicSelect({ companies }) {
  const industryInformation = useIndustryInformation();

  const handleChange = (event) => {
    industryInformation.setSelectedCompany(event.target.value);
  };

  return (
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
  );
}

export const SubdomainInformation = () => {
  const industryInformation = useIndustryInformation();

  return (
    <div>
      <h1>{industryInformation.selectedSubdomain}</h1>
      <BasicSelect
        companies={
          industryInformation.selectedSubdomain &&
          SUBDOMAIN_COMPANIES[industryInformation.selectedSubdomain]
        }
      />
    </div>
  );
};
