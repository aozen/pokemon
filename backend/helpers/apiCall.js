const https = require("https");

const apiCall = (url) => {
    return new Promise((resolve, reject) => {
      const req = https.request(url, (res) => {
        let data = "";
  
        res.on("data", (chunk) => {
          data += chunk;
        });
  
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            reject("Error parsing JSON");
          }
        });
      });
  
      req.on("error", (error) => {
        console.error(error);
        reject(error);
      });
  
      req.end();
    });
  };

 module.exports = apiCall