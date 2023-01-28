# Color Customizer

[Color Customizer](https://michulee.com/) is an application that dynamically changes the hue color of an SVG image using its average color and converting it into your desired color.

***Color Customizer is a project in-progress***



## Table of Contents
- [How It Works](#how-it-works)
- [Installation](#installation)
    - [Node.js](#Node.js)
- [Available Scripts](#available-scripts)
    - [`npm run deploy`](#npm-run-deploy)
    - [`npm start`](#npm-start)
	- [`npm run build`](#npm-run-build)

## How It Works
The `colorthief` API returns the average color of an SVG image in an RGB value where it gets converted into a hue value. Then, the program takes the color preset value and also converts it into a hue value. We take the hue value difference from the image and the color preset- giving us the hue rotation value needed for the `filter` CSS property. The image will change its color based off of the `hue-rotate` CSS value. 

## Installation

### Node.js

Install [Node.js](https://nodejs.org/en/download/)

## Available Scripts

In the project directory, you can run:

### `npm run deploy`

[Deploys](https://create-react-app.dev/docs/deployment/#github-pages) the app to GitHub Pages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

