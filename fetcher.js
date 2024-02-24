//import request library
const request = require("request");

//import file system module
const fs = require("fs");

//To get the node arguments, skip the first two elements and take in url and the local file's path
const args = process.argv.slice(2);

const url = args[0];
const path = args[1];

//give an error if any of url or file path is missing from the provided arguments
if (args.length < 2) {
  console.log("Invalid, missing values url or file path provided.");
  process.exit(1);
}



//to make an http request using the request library
request.get(url, (error, response, body) => {
  //if error occurs while downloading
  if (error) {
    console.log('Error:', error); // Print the error if one occurred
    process.exit(1); //indicates an error condition
  }
  //To check if successfully completed the request, 200: everything went great!
  //Upon unsuccessful completion of the request
  if (response.statusCode !== 200)
    console.log(`'Status code: Failed to complete request', ${response} and ${response.statusCode}`); // Print the error message if response status code if a response was not received

  //write a response body to file using the filesystem
  fs.writeFile(path, body, (err) => {
    if (err) {
      console.log("Error:", err);
      process.exit(1);
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`); // if downloaded successsfully, it'll print the length and url path
  });
});
 


