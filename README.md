# Stock Options

This is an Progressive Web Application for managing stock options and create predictions based on selling prices.

For building the UI it uses SvelteKit and DaisyUI allowing fast development. It is mobile first but can be used in desktop.

## Authentication

For the authentication, we want the user to log in with Google to use Google Drive as storage.

## Main page

In the main view, each stock options package is presented in a row and has the following properties:
- Package ID (visible in the row)
- Amount (visible in the row)
- Price (visible in the row)
- Vesting date (visible in the row)
- Vesting strategy:
    - 1/4 vested after one year, then 1/48 every month
    - 100% vested after six months
    - 100% vested after twelve months

It should have additionally a calculated property with the currently vested amount of stocks based on the current month, which is also visible in the row.

Each item of the list navigates to a detail view in which each property but the Package ID can be edited.

## Prediction page

In the prediction view, the user can add several prices to sell the stock options and each one will display the gross revenue using that price, for the total of the stock options and for the current vested stock options.

Clicking on each price row, the detail view can be opened to see the gross revenue per package.