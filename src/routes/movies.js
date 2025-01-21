const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/top-movies', async (req, res) => {
  try {
    const response = await axios.get('https://www.imdb.com/chart/top/?sort=rank,asc');
    const html = response.data;
    const $ = cheerio.load(html);

    const movies = [];

    $('.lister-list tr').each((index, element) => {
      const title = $(element).find('.titleColumn a').text().trim();
      const year = $(element).find('.titleColumn span').text().trim().replace(/\(|\)/g, '');
      const rating = $(element).find('.imdbRating strong').text().trim();
      const image = $(element).find('.posterColumn img').attr('src');
      const url = 'https://www.imdb.com' + $(element).find('.titleColumn a').attr('href');

      movies.push({
        title,
        year,
        rating,
        image,
        url,
      });
    });

    res.json(movies);
  } catch (error) {
    console.error('Error fetching IMDb Top Movies:', error.message);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

module.exports = router;
