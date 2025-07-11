const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const Url = require('../models/Url');

require('dotenv').config();

// POST /shorten
router.post('/shorten', async (req, res) => {
  const { url, expireIn } = req.body;

  let expiresAt = undefined;
  if (expireIn) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(expireIn));
  }

  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  const shortCode = nanoid(6);

  try {
    const newUrl = new Url({
        originalUrl: url,
        shortCode,
        expiresAt
    });

    await newUrl.save();

    res.json({ shortUrl: `${baseUrl}/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:code
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (url) {
      if (url.expiresAt && new Date() > url.expiresAt) {
        return res.status(410).json({ error: 'Short URL has expired' });
      }
      url.clicks += 1;
      await url.save();
      
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'No URL found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/analytics/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (!url) return res.status(404).json({ error: 'No URL found' });

    res.json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
