const express = require("express");
const multer = require("multer");
const upload = multer();
const app = express();

app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req,res) => {
res.send({ })

}) 

app.post("/reverse-image-search", upload.single("image"), (req, res) => {
  const imageData = req.file.buffer.toString("base64");
  const googleSearchUrl = `https://www.google.com/searchbyimage?image_url=data:image/jpeg;base64,${imageData}`;
  const bingSearchUrl = `https://www.bing.com/images/search?q=imgurl:data:image/jpeg;base64,${imageData}`;
  const yandexSearchUrl = `https://yandex.com/images/search?rpt=imageview&img_url=data:image/jpeg;base64,${imageData}`;
  const tineyeSearchUrl = `https://tineye.com/search?url=data:image/jpeg;base64,${imageData}`;

  const searchUrls = {
    google: googleSearchUrl,
    bing: bingSearchUrl,
    yandex: yandexSearchUrl,
    tineye: tineyeSearchUrl
  };

  res.status(200).send("Results from four different image search engines: Google, Bing, Yandex, and Tineye");
});

app.listen(process.env.PORT || 5500, () => {
  console.log("Server started on http://localhost:5500/%22);
});
