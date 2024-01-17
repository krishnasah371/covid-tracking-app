// create data
var data = [
  ["January", 10000],
  ["February", 12000],
  ["March", 18000],
  ["April", 11000],
  ["May", 9000],
  ["June", 8000],
  ["July", 19000],
  ["August", 34234],
  ["September", 56000],
];

// create a chart
chart = anychart.area();

// create an area series and set the data
var series = chart.area(data);

// set the container id
chart.container("container");

// initiate drawing the chart
chart.draw();
