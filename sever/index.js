const express = require("express");
const csv = require("csvtojson");
const cors = require("cors");

const csvFilePath = __dirname + "/data/df_measures_sentences.csv";

let companyData;
let subdomainData;
let financialData;

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
