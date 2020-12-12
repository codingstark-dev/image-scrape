const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const RedditScraper = require("reddit-scraper");

// const port = process.env.PORT || 5000;
const app = express();
var gis = require("g-i-s");
const redditScraperOptions = {
  AppId: "zLhOlCvA5gU-Dw",
  AppSecret: "qixBPMj-G0wyrpMh8Vk2X7LWjWI",
};
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const requestOptions = {
    Pages: 5,
    Records: 100,
    SubReddit: "Animewallpaper",
    SortType: "hot",
  };

  try {
    const redditScraper = new RedditScraper.RedditScraper(redditScraperOptions);
    const scrapedData = await redditScraper.scrapeData(requestOptions);
    // console.log(scrapedData);
    res.status(200).json({
      scrapedData,
    });
  } catch (error) {
    console.error(error);
  }
});
app.get("/ser/:date/:ser/", (req, res) => {
  const ser = req.params.ser;
  const date = req.params.date;
  var dates = { h: "qdr:h", d: "qdr:d", w: "qdr:w", m: "qdr:m", y: "qdr:y" };
  var opts = {
    searchTerm: decodeURIComponent(ser),
    queryStringAddition: `&tbs=ic:trans&tbs=${dates[date]}&safe=active`,
  };

  gis(opts, logResults);
  function logResults(error, results) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({
        results,
      });
      // console.log(JSON.stringify(results, null, "  "));
    }
  }
  // console.log(decodeURIComponent(ser));
});
var server = app.listen(8081, function () {
  //   var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://localhost:" + port);
});


