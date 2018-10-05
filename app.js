var express = require('express'),
    app = express(),
    axios = require('axios'),
    bodyParser = require('body-parser'),
    child_process = require('child_process'),
    cron = require("node-cron"),
    play = require('audio-play'),
    load = require('audio-loader');

child_process.exec('gpio mode 1 out');
child_process.exec('gpio write 1 1');

cron.schedule("42 22 * * *", function() {
  load('./siren.mp3').then(play);
  child_process.exec('gpio write 1 0');
  setTimeout(function() {
    child_process.exec('gpio write 1 1');
  }, 120000)
});

cron.schedule("39 23 * * *", function() {
  child_process.exec('gpio write 1 0');
  load('./siren.mp3').then(play);
  setTimeout(function() {
    child_process.exec('gpio write 1 1');
  }, 180000)
});

// cron.schedule("* * * * *", function() {
//   child_process.exec('gpio write 1 0');
//   load('./siren.mp3').then(play);
//   setTimeout(function() {
//     child_process.exec('gpio write 1 1');
//   }, 5000)
// });

app.listen(4242, '0.0.0.0');
