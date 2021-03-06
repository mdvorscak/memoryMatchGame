[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![license][license-image]][license-url] [![XO code style][xo-image]][xo-url] [![hosted][hosted-image]][hosted-url]

# memory-match-game

> A simple memory game where you match images

## memory-match-game is built with

Vue, ES6, Stylus, Webpack, Babel

## Play

[Play it live here][hosted-url]

## Features

- Game Timing
- Anti-cheating measures (card backgrounds are not inspectable)
- Works as a PWA (offline support)
- Memes

## Running locally

To run a production version of this game locally, first run the command(s):

`git clone git@github.com:mdvorscak/memoryMatchGame.git && cd memoryMatchGame && npm i && npm run start:prod`

Then navigate to `localhost:3000`

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build and serve production at localhost:3000
npm run start:prod

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

```
[travis-url]: https://travis-ci.org/mdvorscak/memoryMatchGame
[travis-image]: https://img.shields.io/travis/mdvorscak/memoryMatchGame/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/mdvorscak/memoryMatchGame?branch=master
[coveralls-image]: https://img.shields.io/coveralls/github/mdvorscak/memoryMatchGame/master.svg?style=flat-square

[license-url]: LICENSE
[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square

[xo-url]: https://github.com/xojs/xo
[xo-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square

[hosted-url]: https://mdvorscak-memory-match.surge.sh/
[hosted-image]: https://img.shields.io/badge/Hosted%20On-Surge-green.svg?style=flat-square