# Coke's Ban Checker Chrome Extension (built with TypeScript + React)

> This project used the following boilerplate project (scaffolding the app):  
> https://github.com/martellaj/chrome-extension-react-typescript-boilerplate

## Building

1.  Clone repo
2.  `npm i`
3.  `npm run dev` to compile once or `npm run watch` to run the dev task in watch mode
4.  `npm run build` to build a production (minified) version

## Installation

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo

## Usage

This app is meant to be used with my website -> https://cokesbanchecker.herokuapp.com/ (this extension requires JWT Web Token which can be obtained from the aforementioned website). The released (ready to use) extension can be accessed [here](https://chrome.google.com/webstore/detail/cokes-ban-checker-extensi/hmmcfkdejhgadhiojdfomeglbpmogfpm).

## Why?

The extension adds new UI elements to the Steam and BattleMetrics profiles, i.e. the app checks the viewed account for BattlEye Global ban status. This functionality is useful for ArmA 3 community since they can quickly check player's status.

## More information

If you would like to read more about this extension, please visit https://cokesbanchecker.herokuapp.com/otherApps
