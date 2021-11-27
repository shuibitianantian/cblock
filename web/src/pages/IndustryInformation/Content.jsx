/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { SubdomainInformation } from "./SudomainInformation";
import { CompanyInformation } from "./CompanyInformation";
import {
  IndustryInformation,
  useIndustryInformation,
} from "./IndustryInformation";
import { Overview } from "./Overview";
import { Search } from "./Search";
import ImageModal from "../../components/ImageModal";

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

  const render = () => {
    if (industryInformation.selectedCompany) {
      return <CompanyInformation />;
    } else if (industryInformation.selectedSubdomain) {
      return <SubdomainInformation />;
    } else if (industryInformation.section) {
      return (
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
      );
    } else {
      return industryInformation.inOverview ? <Overview /> : <Search />;
    }
  };
  return render();
};
