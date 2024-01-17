import {
  GetWorldData,
  GetCountryData,
  GetAllTimeCountryStatus,
} from "./components/fetch-data";
import numberWithCommas from "./components/number-formater";

let meterData = await GetWorldData();
let allTimeCountryData;
let chart = anychart.area();

const percentageCalculator = function (numerator, denomerator) {
  const percentage = (numerator / denomerator) * 100;
  return (Math.round(percentage * 100) / 100).toString() + " %";
};

const updateMeterData = function () {
  confirmedCases.innerHTML = numberWithCommas(meterData.confirmed);
  activeCases.innerHTML = numberWithCommas(meterData.active);
  deathCases.innerHTML = numberWithCommas(meterData.deaths);
  criticalCases.innerHTML = numberWithCommas(meterData.critical);
  recoveredCases.innerHTML = numberWithCommas(meterData.recovered);
  deathRate.innerHTML = percentageCalculator(
    meterData.deaths,
    meterData.total_cases
  );
  RecoveryRate.innerHTML = percentageCalculator(
    meterData.recovered,
    meterData.total_cases
  );
};

const updateAllTimeChart = function () {
  const last10 = allTimeCountryData.slice(-50);
  const graphData = [];
  last10.forEach((data, indx) => graphData.push([`${indx}`, data.Active]));
  chart.area([]);
  chart.area(graphData);
};

const initApp = function () {
  updateMeterData();
};

// Query-selectors
const confirmedCases = document.querySelector(".confirmed-cases .data");
const activeCases = document.querySelector(".active-cases .data");
const deathCases = document.querySelector(".death-cases .data");
const criticalCases = document.querySelector(".critical-cases .data");
const recoveredCases = document.querySelector(".recovered-cases .data");
const deathRate = document.querySelector(".death-rate .data");
const RecoveryRate = document.querySelector(".recovery-rate .data");
const selectCountry = document.querySelector("#country");

initApp();

// Filter meter data by country
let country = "USA";
selectCountry.addEventListener("change", async (event) => {
  country = event.target.value;
  meterData = await GetCountryData(country);
  allTimeCountryData = await GetAllTimeCountryStatus(country);

  if (meterData) {
    updateMeterData();
  }

  if (allTimeCountryData) {
    updateAllTimeChart();
  }
});

anychart.onDocumentReady(function () {
  // // create a chart
  // var chart = anychart.area();

  // create an area series and set the data
  chart.area([]);

  // set the chart title
  chart.title("Area Chart: Basic Sample");

  // set the titles of the axes
  chart.xAxis().title("Month");
  chart.yAxis().title("Cases");

  // set the container id
  chart.container("casesChart");

  // initiate drawing the chart
  chart.draw();
});
