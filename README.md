# Merge Board Editor

This application allows you to view and edit the merge board described in public/assingment.json.

## Installation and setup

Make sure you have Node JS (v18.16.0) installed. Run `npm install` from the root directory of the project to install all of the dependencies.

## Scripts

A few npm scripts are provided.

### Running tests

Run `npm test` to run the unit tests.

### Development

Run `npm start` to start a development server with live-reload.

### Production build

Run `npm run build` to create a production build in dist/

## Using the app

When the app loads you will see the merge grid as it would look in the game. You can click on any cell in the grid to inspect it. When you click on a cell a form will appear to the left of the board which will either let you add a new item (for empty cells) or edit an existing one. If the inspected cell contains an item which has a merge chain, it will be shown to the right of the board.

Items can be moved around the grid using drag and drop. Simply click and drag on the item that you want to move, and drop it on the cell that you want to move it to.
