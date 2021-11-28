const express = require("express");
const csv = require("csvtojson");
const cors = require("cors");

const csvFilePath = __dirname + "/data/df_measures_sentences.csv";

let companyData;
let subdomainData;
let financialData;
const fi_measures_data = {};

const fi_measures_files = [
  "return on assets",
  "total assets turnover",
  "cash ratio",
  "current ratio",
  "debt to total assets ratio",
  "financial leverage",
  "gross profit margin",
  "net profit margin",
  "operating profit margin",
  "quick ratio",
  "working capital",
];

fi_measures_files.forEach((key) => {
  const file = __dirname + `/data/${key}.csv`;
  csv()
    .fromFile(file)
    .then((arr) => {
      const top10 = [];
      const end10 = [];
      arr.forEach((item) => {
        top10.push([
          item["Top 10 Effective Measures"],
          item["Top 10 Parameters"],
        ]);
        end10.push([
          item["End 10 Effective Measures"],
          item["End 10 Parameters"],
        ]);
      });
      fi_measures_data[key] = {
        top10,
        end10,
      };
    });
});
csv()
  .fromFile(csvFilePath)
  .then(function (jsonArrayObj) {
    //when parse finished, result will be emitted here.

    companyData = jsonArrayObj.reduce((acc, obj) => {
      const companyName = obj["company name"];
      if (acc[companyName]) {
        acc[companyName].sentences.push({
          sentence: obj.sentence,
          aspect: obj.aspect,
        });
      } else {
        acc[companyName] = {
          CIK: obj.CIK,
          "sub-domain": obj["sub-domain"],
          sentences: [
            {
              sentence: obj.sentence,
              aspect: obj.aspect,
            },
          ],
        };
      }

      return acc;
    }, {});

    subdomainData = Object.keys(companyData).reduce((acc, companyName) => {
      const subdomain = companyData[companyName]["sub-domain"];

      if (acc[subdomain]) {
        acc[subdomain].push(companyData[companyName]);
      } else {
        acc[subdomain] = [companyData[companyName]];
      }
      return acc;
    }, {});
  });

csv()
  .fromFile(__dirname + "/data/11_Fi_2020_basic.csv")
  .then((arr) => {
    financialData = arr;
  });
const app = express();
const port = 3006;

app.use(cors());

app.get("/getCompanySentence", (req, res) => {
  const { companyName } = req.query;
  const result = { ...companyData[companyName] };
  result["finantialData"] =
    financialData.filter((data) => {
      return data["cik"] === result.CIK;
    }) || [];
  res.status(200).send(JSON.stringify(result));
});

app.get("/financialIndicators", (req, res) => {
  const { fi } = req.query;
  res.status(200).send(fi_measures_data[fi]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
