/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import CustomizedAccordions from "../../components/CustomizedAccordions";
import { useEvaluation } from "./Evaluation";

const styles = {
  overview: css``,
  panel: css`
    min-height: 92vh;
    background-color: #e0dbc1;
  `,
};

export const Menu = () => {
  const evaluation = useEvaluation();

  return (
    <div css={styles.panel}>
      <div
        css={css`
          position: sticky;
          top: 0px;
          z-index: 10;
          background-color: #e0dbc1;
        `}>
        <div css={styles.overview}>
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
              evaluation.setSection(item);
            }}
          />
        </div>

        <div css={styles.overview}>
          <CustomizedAccordions
            content={{
              "Operating Efficiency": [
                "Total Assets Turnover",
                "Working Capital",
              ],
            }}
            handleClick={(item) => {
              evaluation.setSection(item);
            }}
          />
        </div>
        <div css={styles.overview}>
          <CustomizedAccordions
            content={{
              "Liquidity Ratio": ["Current Ratio", "Quick Ratio", "Cash Ratio"],
            }}
            handleClick={(item) => {
              evaluation.setSection(item);
            }}
          />
        </div>
        <div css={styles.overview}>
          <CustomizedAccordions
            content={{
              "Solvency Ratio": [
                "Financial Leverage",
                "Debt to Total Assets Ratio",
              ],
            }}
            handleClick={(item) => {
              evaluation.setSection(item);
            }}
          />
        </div>
      </div>
    </div>
  );
};
