# What2Keep: An easy way to track your things and reduce your stuff

What2Keep is a mobile app for iOS and Android focused on the wellness of having stuff, specifically keeping track of it and getting rid of it.

## Table of Contents
- [Installation](#installation)
- [Usage](#how-to-use)
- [Deployment](#ci--cd)
- [UI Prototype](#UI-Prototype)

## Installation

Download all of the source code, and in both ./What2Keep and ./expressjs-backend, install with the node package manager

```bash
cd What2Keep
npm install
cd ..
cd expressjs-backend
npm install
```

**Note** you may need to run 
```bash 
npm audit fix
``` 
to resolve a security vulnerability

## How to Use

What2Keep runs on React Native and ExpoGo. Launching the app takes two steps
##### 1. Launch the Backend:
In the subdirectory ./expressjs-backend

```bash
npm run start
```

Proper response should say
```bash
REST API is listening.
```

##### 2. Launch the Frontend:
Navigate back and into the subdirectory ./What2Keep and run

```bash
npm run start
```

Expo should launch, and a QR Code should appear to scan with a mobile phone. Alternatively you may choose to use an android or iOS simulator to launch expo.

<img width="706" alt="Screen Shot 2022-11-18 at 12 40 17 PM" src="https://user-images.githubusercontent.com/57431775/202798506-2434cf68-741a-416a-8fce-61788db1f812.png">

> example of what expected output when running frontend looks like
From there you are free to start using the app!

## CI / CD
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/what2keep/what2keep/Frontend%20Checks?label=Frontend%20Checks&style=for-the-badge) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/what2keep/what2keep/Build%20and%20Deploy%20-%20Backend?label=Bulid%20and%20Deploy%20-%20Backend&style=for-the-badge)

**To access the Azure deployment for our backend, use this link:**
[What2Keep Backend](https://what2keep.azurewebsites.net/)

## UI Prototype
[Click Here to View to the UI Prototype (links to figma)](https://www.figma.com/proto/sXftcp87dF9KisXNEv8noA/UI-Prototype%2FStoryboarding?scaling=scale-down&page-id=0%3A1&starting-point-node-id=4%3A2&node-id=4%3A2) last edited: 11/14/2022

## Tools Used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)



## Contributors
Camille Paradis: https://github.com/camilleparadis FrontEnd Developer

Jeremiah Lee: https://github.com/jkailee DevOps and Documentation

Ryan Takahashi: https://github.com/rhtakaha Backend Engineer

Sujanya Srinath: https://github.com/sujanyasrinath Data Layer Engineer

## Want to Contribute?
What2Keep utilizes the Airbnb code style, found here: https://airbnb.io/javascript/react/

Prettier is used in this project to enforce consistent code style to increase readability/maintainability.
The Prettier extension can be installed in VSCode by searching for prettier and installing it under extensions.
Ensure that "editor.defaultFormatter": "esbenp.prettier-vscode" is in VSCode settings to allow prettier to be the formatter.
"editor.formatOnSave": true, is another settings that may be added to ensure that whenever a file is saved it will be made to comply with the prettier settings. These settings can be found in the .prettierrc file.

If you see something that you would like to change, feel free to submit a pull request!

## License

[MIT](https://choosealicense.com/licenses/mit/)
