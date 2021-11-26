/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { SubdomainInformation } from "./SudomainInformation";
import { CompanyInformation } from "./CompanyInformation";
import { useIndustryInformation } from "./IndustryInformation";
import { Overview } from "./Overview";
import { Search } from "./Search";

export const Content = () => {
  const industryInformation = useIndustryInformation();
  const render = () => {
    if (industryInformation.selectedCompany) {
      return <CompanyInformation />;
    } else if (industryInformation.selectedSubdomain) {
      return <SubdomainInformation />;
    } else {
      return industryInformation.inOverview ? <Overview /> : <Search />;
    }
  };
  return render();
};
