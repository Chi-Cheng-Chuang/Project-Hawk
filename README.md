# Real Digital Simple Scope Application

## Functionality:
The SimpleScope waveform viewer loads amplitude and time data from a CSV file and automatically plots it using plotly.js. The website has the following controllers:
  - Arm: this button clears any existing data.csv file from the root directory, clears the canvas and waits indefinitely for new data to be generated.
  - Reset: clears the canvas and does not remove data.csv

To run the server:
  - have Node.js installed on your local PC
  - navigate to the application root directory and open a terminal window here
  - enter the command "node server.js" to establish the server (you should get a console output)
  - localhost:8000 serves data.csv to the web application, localhost:9000 removes it from the root directory
