/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useMemo } from "react";
import {
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
  Autocomplete,
} from "@mui/material";
import {
  IndustryInformation,
  useIndustryInformation,
} from "./IndustryInformation";
import { SUBDOMAIN_COMPANIES } from "../../assets/companies";

const styles = {
  container: css`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    position: relative;
    left: 50%;
    top: 30%;
    transform: translateX(-50%) translateY(-50%);
    width: 75%;
  `,
  title: css`
    color: #c5a872;
    font-family: "Audiowide", cursive;
    font-size: 50px;
  `,
  searchButton: css`
    margin-top: 30px;
  `,
};
export const Search = () => {
  const {
    isSearchCompany,
    setIsSearchCompany,
    searchString,
    setSearchString,
    selectedCompany,
    setSelectedCompany,
    selectedSubdomain,
    setSelectedSubdomain,
  } = useIndustryInformation();

  const { subdomains, companies } = useMemo(() => {
    const companySet = new Set();
    const subdomains = new Set();

    Object.keys(SUBDOMAIN_COMPANIES).forEach((key) => {
      const values = SUBDOMAIN_COMPANIES[key];
      subdomains.add(key);
      values.forEach((com) => {
        if (!companySet.has(com)) {
          companySet.add(com);
        }
      });
    });

    return {
      subdomains: Array.from(subdomains).map((sub) => {
        return {
          label: sub,
        };
      }),
      companies: Array.from(companySet).map((com) => {
        return {
          label: com,
        };
      }),
    };
  }, []);

  const handleAutoCompleteChange = (event, newValue) => {
    setSearchString(newValue.label);
  };

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>C-Block Search</h1>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              onChange={() => setIsSearchCompany(!isSearchCompany)}
            />
          }
          label={"Click here to change search mode"}
        />
        <Autocomplete
          disablePortal
          key={isSearchCompany}
          options={isSearchCompany ? companies : subdomains}
          onChange={handleAutoCompleteChange}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label={isSearchCompany ? "Company" : "Subdomain"}
            />
          )}
        />
      </FormGroup>
      <Button
        css={styles.searchButton}
        variant='contained'
        onClick={() => {
          if (isSearchCompany) {
            setSelectedCompany(searchString);
          } else {
            setSelectedSubdomain(searchString);
          }
        }}>
        Search
      </Button>
    </div>
  );
};
