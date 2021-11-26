/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { useIndustryInformation } from "./IndustryInformation";
import React, { useEffect, useState } from "react";

import { fetchChart, fetchProfile } from "../../api";
import { Button } from "@mui/material";
import { TickerChart } from "./TickerChart";

const parseValue = (value) => {
  if (value) {
    return parseFloat(value).toFixed(3);
  }

  return "Not Found";
};
const styles = {
  name: css`
    text-align: center;
    color: #c5a872;
    font-size: 45px;
    margin-top: 0px;
    margin-bottom: 30px;
  `,
  profile: css`
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    padding: 20px 50px;
    border-radius: 10px;
    margin-bottom: 50px;
  `,
  financialData: css`
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    padding: 20px 50px;
    border-radius: 10px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    h2 {
      text-transform: uppercase;
    }
  `,
};

export const CompanyInformation = () => {
  const { selectedCompany } = useIndustryInformation();
  const [companyProfile, setCompanyProfile] = useState(null);
  const [companyMeasures, setCompanyMeasures] = useState(null);
  const [labelsToSentences, setLabelsToSentences] = useState(null);
  const [selectedAspect, setSelectedAspect] = useState("");
  const [charts, setCharts] = useState(null);

  useEffect(async () => {
    const fetchData = async () => {
      if (selectedCompany) {
        const profile = await fetchProfile(selectedCompany);
        setCompanyProfile(profile);

        const measures = await fetch(
          `http://localhost:3006/getCompanySentence?companyName=${selectedCompany}`
        );
        setCompanyMeasures(await measures.json());

        const chart = await fetchChart(selectedCompany);
        if (chart) {
          setCharts(chart.chart.result[0]);
        }
      }
    };
    fetchData();
  }, [selectedCompany]);

  useEffect(() => {
    const lts = {};
    companyMeasures &&
      companyMeasures.sentences.forEach((sentence) => {
        if (lts[sentence.aspect]) {
          lts[sentence.aspect].push(sentence.sentence);
        } else {
          lts[sentence.aspect] = [sentence.sentence];
        }
      });
    setLabelsToSentences(lts);
  }, [companyMeasures]);

  return (
    <div>
      <h1 css={styles.name}>{selectedCompany}</h1>
      <div css={styles.profile}>
        <h2>Introduction</h2>
        <p>
          {companyProfile && companyProfile.quoteSummary.result
            ? companyProfile.quoteSummary.result[0].assetProfile
                .longBusinessSummary
            : "No Content Found"}
        </p>
      </div>

      <div css={styles.profile}>
        <h2>Measures</h2>
        <div>
          {labelsToSentences &&
            Object.keys(labelsToSentences).map((asp, idx) => {
              return (
                <Button
                  key={idx}
                  variant='contained'
                  onClick={() => {
                    setSelectedAspect(asp);
                  }}
                  css={css`
                    margin: 3px;
                  `}>
                  {asp}
                </Button>
              );
            })}
        </div>
        {selectedAspect && (
          <div>
            <h2>Details</h2>
            {labelsToSentences[selectedAspect].map((sent, idx) => {
              return <p key={idx}>"{sent}"</p>;
            })}
          </div>
        )}
      </div>

      <div css={styles.financialData}>
        <div>
          <h2>Profitability</h2>
          <p>
            ROA:{"     "}
            {companyMeasures &&
              parseValue(
                companyMeasures.finantialData["2020 ROA(return on assets)"]
              )}
          </p>
          <p>
            Net Profit Margin:{"     "}
            {companyMeasures &&
              parseValue(companyMeasures.finantialData["Net profit margin"])}
          </p>
          <p>
            Gross Profit Margin:{"     "}
            {companyMeasures &&
              parseValue(companyMeasures.finantialData["Gross profit margin"])}
          </p>
          <p>
            Operating Profit Margin:{"     "}
            {companyMeasures &&
              parseValue(
                companyMeasures.finantialData["Operating profit margin"]
              )}
          </p>
        </div>
        <div>
          <h2>Operating Efficiency</h2>
          <p>
            Asset Turnover:{"     "}
            {companyMeasures &&
              parseValue(
                companyMeasures.finantialData["2020 Total assets turnover"]
              )}
          </p>
          <p>
            Working Capital:{"     "}
            {companyMeasures &&
              parseValue(companyMeasures.finantialData["working capital"])}
          </p>
        </div>
        <div>
          <h2>Liquidity Ratio</h2>
          <p>
            Current Ratio:{"     "}
            {companyMeasures &&
              parseValue(companyMeasures.finantialData["Current ratio"])}
          </p>
          <p>
            Quick Ratio:{"     "}
            {companyMeasures &&
              parseValue(companyMeasures.finantialData["Quick ratio"])}
          </p>
          <p>
            Cash Ratio:{"     "}
            {companyMeasures &&
              parseValue(companyMeasures.finantialData["Cash ratio"])}
          </p>
        </div>
        <div>
          <h2>Solvency Ratio</h2>
          <p>
            Financial Leverage:{"     "}
            {companyMeasures &&
              parseValue(companyMeasures.finantialData["Financial leverage"])}
          </p>
          <p>
            Debt to Assets Ratio:{"     "}
            {companyMeasures &&
              parseValue(
                companyMeasures.finantialData["Debt to total assets ratio"]
              )}
          </p>
        </div>
      </div>
      <div css={styles.profile}>
        {charts ? <TickerChart data={charts} /> : "Quote Not Available"}
      </div>
    </div>
  );
};
