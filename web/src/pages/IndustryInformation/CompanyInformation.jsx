/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { useIndustryInformation } from "./IndustryInformation";
import React, { useEffect, useState } from "react";

import { fetchChart, fetchProfile } from "../../api";
import { Button, Divider } from "@mui/material";
import { TickerChart } from "./TickerChart";

const parseValue = (value) => {
  console.log(value);
  if (value && !isNaN(value)) {
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
    padding: 20px 50px 30px 50px;
    border-radius: 10px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    h2 {
      text-align: center;
    }
    h3 {
      text-transform: uppercase;
      color: #d1bf90;
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

  const financial2019 =
    companyMeasures &&
    companyMeasures.finantialData.filter((c) => c.fyear === "2019")[0];
  const financial2020 =
    companyMeasures &&
    companyMeasures.finantialData.filter((c) => c.fyear === "2020")[0];

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
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 30px;
          `}>
          <h2>2019 Financial Indicators</h2>
          <div
            css={css`
              display: flex;
              justify-content: space-around;
            `}>
            <div>
              <h3>Profitability</h3>
              <p>
                ROA:{"     "}
                {financial2019 &&
                  parseValue(financial2019["2020 ROA(return on assets)"])}
              </p>
              <p>
                Net Profit Margin:{"     "}
                {financial2019 &&
                  parseValue(financial2019["Net profit margin"])}
              </p>
              <p>
                Gross Profit Margin:{"     "}
                {financial2019 &&
                  parseValue(financial2019["Gross profit margin"])}
              </p>
              <p>
                Operating Profit Margin:{"     "}
                {financial2019 &&
                  parseValue(financial2019["Operating profit margin"])}
              </p>
            </div>
            <div>
              <h3>Operating Efficiency</h3>
              <p>
                Asset Turnover:{"     "}
                {financial2019 &&
                  parseValue(financial2019["2020 Total assets turnover"])}
              </p>
              <p>
                Working Capital:{"     "}
                {financial2019 && parseValue(financial2019["working capital"])}
              </p>
            </div>
            <div>
              <h3>Liquidity Ratio</h3>
              <p>
                Current Ratio:{"     "}
                {financial2019 && parseValue(financial2019["Current ratio"])}
              </p>
              <p>
                Quick Ratio:{"     "}
                {financial2019 && parseValue(financial2019["Quick ratio"])}
              </p>
              <p>
                Cash Ratio:{"     "}
                {financial2019 && parseValue(financial2019["Cash ratio"])}
              </p>
            </div>
            <div>
              <h3>Solvency Ratio</h3>
              <p>
                Financial Leverage:{"     "}
                {financial2019 &&
                  parseValue(financial2019["Financial leverage"])}
              </p>
              <p>
                Debt to Assets Ratio:{"     "}
                {financial2019 &&
                  parseValue(financial2019["Debt to total assets ratio"])}
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: space-between;
            padding-top: 20px;
          `}>
          <h2>2020 Financial Indicators</h2>
          <div
            css={css`
              display: flex;
              justify-content: space-around;
            `}>
            <div>
              <h3>Profitability</h3>
              <p>
                ROA:{"     "}
                {financial2020 &&
                  parseValue(financial2020["2020 ROA(return on assets)"])}
              </p>
              <p>
                Net Profit Margin:{"     "}
                {financial2020 &&
                  parseValue(financial2020["Net profit margin"])}
              </p>
              <p>
                Gross Profit Margin:{"     "}
                {financial2020 &&
                  parseValue(financial2020["Gross profit margin"])}
              </p>
              <p>
                Operating Profit Margin:{"     "}
                {financial2020 &&
                  parseValue(financial2020["Operating profit margin"])}
              </p>
            </div>
            <div>
              <h3>Operating Efficiency</h3>
              <p>
                Asset Turnover:{"     "}
                {financial2020 &&
                  parseValue(financial2020["2020 Total assets turnover"])}
              </p>
              <p>
                Working Capital:{"     "}
                {financial2020 && parseValue(financial2020["working capital"])}
              </p>
            </div>
            <div>
              <h3>Liquidity Ratio</h3>
              <p>
                Current Ratio:{"     "}
                {financial2020 && parseValue(financial2020["Current ratio"])}
              </p>
              <p>
                Quick Ratio:{"     "}
                {financial2020 && parseValue(financial2020["Quick ratio"])}
              </p>
              <p>
                Cash Ratio:{"     "}
                {financial2020 && parseValue(financial2020["Cash ratio"])}
              </p>
            </div>
            <div>
              <h3>Solvency Ratio</h3>
              <p>
                Financial Leverage:{"     "}
                {financial2020 &&
                  parseValue(financial2020["Financial leverage"])}
              </p>
              <p>
                Debt to Assets Ratio:{"     "}
                {financial2020 &&
                  parseValue(financial2020["Debt to total assets ratio"])}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div css={styles.profile}>
        {charts ? <TickerChart data={charts} /> : "Quote Not Available"}
      </div>
    </div>
  );
};
