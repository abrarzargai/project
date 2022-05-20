const express = require("express");
const route = express.Router();
const puppeteer = require("puppeteer");
const axios = require('axios');
const cheerio = require('cheerio');
/***************Routes************/
const url = 'https://www.imdb.com/video/imdb/vi2333017881/imdb/embed'
const id = '#imdb-video'
route.post("/", async (req, res, next) => {
  console.log("scraping Hit");
  let $ ;
  const data = await  axios(req.body.url || url).then((response) => {
    
    const html_data = response.data;
    $ = cheerio.load(html_data);
   

   const vedio = $('.imdb-player-data').html()
     console.log(JSON.parse(vedio))
     return vedio
  });
  const JsonData = JSON.parse(data)
  return res.status(201).json({
    success: true,
    url:JsonData.videoPlayerObject?.video?.videoInfoList,
    vedio : JSON.parse(data),
    
  });
});

module.exports = route;
