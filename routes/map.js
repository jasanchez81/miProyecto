const express = require('express');
const twitterStream = require('../lib/twitter-stream')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('map', {
        title: 'Twitter Stream',
        error: req.query.error,
        logout: !!req.query.logout
    });
});

router.put('/', (req, res) => {
  //------------------------------
  // Start coding here!
  // Initialize stream from Twitter
  // -----------------------------
  const hashtag = req.query.tag;
	twitterStream(hashtag);
  	res.sendStatus(204);
});



module.exports = router;
