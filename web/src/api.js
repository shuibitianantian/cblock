const baseUrl = "https://yfapi.net";
const autoComplete = "/v6/finance/autocomplete";
const quoteSummary = "/v11/finance/quoteSummary";
const chart = "/v8/finance/chart/";
const apiKey = "gDoXOYeNe82bPsssukgko4kTgXZdEMpN8M7KeCgu";

const fetchAutoComplete = async (key) => {
  const url = baseUrl + autoComplete + `?region=US&lang=en&query=${key}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const fetchProfile = async (key) => {
  key = key.toLowerCase().split(",")[0].replace(".", "");

  if (key.slice(-3) === "inc") {
    key = key.slice(0, -3);
  } else if (key.slice(-4) === "corp" || key.slice(-4) === "/de/") {
    key = key.slice(0, -4);
  }
  const meta = await fetchAutoComplete(key);
  const company = meta["ResultSet"]["Result"][0];
  if (company) {
    const url =
      baseUrl +
      quoteSummary +
      "/" +
      company.symbol +
      "?lang=en&region=US&modules=defaultKeyStatistics%2CassetProfile%2CfinancialData";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": apiKey,
      },
    });

    return response.json();
  }
};

export const fetchChart = async (key) => {
  key = key.toLowerCase().split(",")[0].replace(".", "");

  if (key.slice(-3) === "inc") {
    key = key.slice(0, -3);
  } else if (key.slice(-4) === "corp" || key.slice(-4) === "/de/") {
    key = key.slice(0, -4);
  }

  const meta = await fetchAutoComplete(key);
  const company = meta["ResultSet"]["Result"][0];

  if (company) {
    const url =
      baseUrl +
      chart +
      company.symbol +
      "?range=max&region=US&interval=1d&lang=en&events=div%2Csplit";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": apiKey,
      },
    });
    return response.json();
  }
};
