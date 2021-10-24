// import config from './config';
// import apiRouter from './api';
// import serverRender from './serverRender';
// import express from 'express';
// import bodyParser from 'body-parser';

const config = require('./config');
const apiRouter = require('./api');
const serverRender = require('./serverRender');
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

server.set('view engine', 'ejs');

server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
