// TESTER = document.getElementById('tester');

// Plotly.newPlot( TESTER, [{
// x: [1, 2, 3, 4, 5],
// y: [1, 2, 4, 8, 16] }], {
// margin: { t: 0 } } );

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
    const text = e.target.result;
    const data = d3.csvParse(text);

    document.write(JSON.stringify(data));
    };

    reader.readAsText(input);
});

// function makeChart(countries) {
//     var countryLabels = countries.map(function (d) {
//       return d.country;
//     });
//     var populationData = countries.map(function (d) {
//       return d.population;
//     });

//     var chart = new Chart("myChart", {
//       type: "bar",
//       data: {
//         labels: countryLabels,
//         datasets: [
//           {
//             data: populationData 
//           }
//         ]
//       }
//     });
//   }

// function makeplot() {
//     Plotly.d3.csv("sin_gen.csv", function(data){ processData(data) } );
  
//   };

// function processData(allRows) {
      
//     console.log(allRows);
//     var x = [], y = [], standard_deviation = [];
  
//     for (var i=0; i<allRows.length; i++) {
//       row = allRows[i];
//       x.push( row['AAPL_x'] );
//       y.push( row['AAPL_y'] );
//     }
//     console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
//     makePlotly( x, y, standard_deviation );
//   }
  
//   function makePlotly( x, y, standard_deviation ){
//     var plotDiv = document.getElementById("plot");
//     var traces = [{
//       x: x, 
//       y: y
//     }];
  
//     Plotly.newPlot('myDiv', traces, 
//       {title: 'Plotting CSV data from AJAX call'});
//   };
// makeplot();

