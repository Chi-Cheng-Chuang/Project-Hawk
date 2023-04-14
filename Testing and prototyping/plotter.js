function rand() {
    return Math.random();
  }
  
  Plotly.newPlot('chart', [{
    y: [1,2,3].map(rand),
    mode: 'lines',
    line: {color: '#80CAF6'}
  }]);
  
  var cnt = 0;
  
  var interval = setInterval(function() {
  
    Plotly.extendTraces('chart', {
      y: [[rand()]]
    }, [0])
  
    if(++cnt === 100) clearInterval(interval);
  }, 300);

  //call function plotData() which also calls plotly plotting functions

  //plotData();

  //****************************** csv file handling ******************************//
  //declare two arrays to store time and sine values
/*   
  const time_data = []; //global time variable
  const point_data = []; //global data variable
    
  async function plotData()
  {
    const uploadConfirm = document.getElementById('uploadConfirm').
      addEventListener('click', () => {
      Papa.parse(document.getElementById('uploadfile').files[0],
      {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results)
        {
            //console.log(results); //<===== for testing
            //console.log(results.data[0].sine); //<===== for testing

            time_data.length = 0;     //clear out time array
            point_data.length = 0;    //clear out data_point array
            //push all values into their own array
            for(i = 0; i < results.data.length; i++)
            {
              time_data.push(results.data[i].t);      //push time values into time_data[]
              point_data.push(results.data[i].data);  //push point values into point_data[]
            }
            //console.log(time_data); //<===== for testing
            //console.log(point_data); //<===== for testing
            makePlotly(time_data, point_data);
        }
      });
    });
  } */
  // console.log(time); //<===== for testing
  // console.log(sine); //<===== for testing

  //****************************** Plotly.js Graph Control ******************************//
  //data graphing control
/*   function makePlotly(time_data, point_data)
  {
    myChart = document.getElementById('chart');
    Plotly.newPlot(myChart, data, layout, config);
    // Plotly.newPlot( CHART, layout,[{
    //   x: time_data,   //x-axis data
    //   y: point_data,  //y-axis datas
    //   type:'line'     //chart type
    // }]);
  }

  //automatically resize to fit device's window size
  var config = {responsive: true}

  //first data trace 
  var trace1 = {
    x: time_data,   //x-axis data
    y: point_data,  //y-axis datas
    //mode:'markers + line',
    type:'line'     //chart type
  }

  //data to be ploted to chart (for furture ploting multiple data on the same graph)
  var data = [trace1];

  //plotly chart customization
  var layout = {
    autosize: true,
    // width: 1500,
    // height: 680,
    title:{
      text: 'Signal Input', //chart title
      font:{
        family: 'Arial',    //title's font type
        size: 25            //title's font size
      }
    },

    xaxis:{
      //automargin: true,
      title:{
        text: 'time (sec)', //chart title
        font:{
          family: 'Arial',    //title's font type
          size: 20            //title's font size
        }
      }
    },

    yaxis:{
      //automargin: true,
      title:{
        text: 'Volt', //chart title
        font:{
          family: 'Arial',    //title's font type
          size: 20            //title's font size
        }
      }
    },
  };
 */