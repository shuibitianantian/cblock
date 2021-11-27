/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { createContext, useContext, useState } from "react";
import { TwoPartLayout } from "../../components/TwoPartLayout";
import { Content } from "./Content";
import { Menu } from "./Menu";

const industryInformationContext = createContext({
  currentYear: 2019,
  inOverview: true,
  inSearch: false,
  setInSearch: () => {},
  setCurrentYear: () => {},
  selectedSubdomain: "",
  setSelectedSubdomain: () => {},
  selectedCompany: "",
  setSelectedCompany: () => {},
});

export const useIndustryInformation = () => {
  return useContext(industryInformationContext);
};

export const IndustryInformation = () => {
  const [currentYear, setCurrentYear] = useState(2019);
  const [selectedSubdomain, setSelectedSubdomain] = useState("");
  const [inOverview, setInOverview] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [inSearch, setInSearch] = useState(false);
  const [isSearchCompany, setIsSearchCompany] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [section, setSection] = useState("");

  return (
    <div
      css={css`
        min-height: 100vh;
      `}>
      <industryInformationContext.Provider
        value={{
          currentYear,
          setCurrentYear,
          inOverview,
          setInOverview,
          inSearch,
          setInSearch,
          selectedSubdomain,
          setSelectedSubdomain,
          selectedCompany,
          setSelectedCompany,
          isSearchCompany,
          setIsSearchCompany,
          searchString,
          setSearchString,
          section,
          setSection,
        }}>
        <TwoPartLayout
          leftRender={() => {
            return <Menu />;
          }}
          rightRender={() => {
            return <Content />;
          }}
        />
      </industryInformationContext.Provider>
    </div>
  );
};
