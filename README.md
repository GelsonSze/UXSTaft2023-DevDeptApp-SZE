# UXSTaft2023-DevDeptApp-SZE

This is a simple web application that displays all the jobs being offered on Arbeitnow.com from their API and aggregates them in a simple table. The API used in this project is from [Arbeitnow](https://documenter.getpostman.com/view/18545278/UVJbJdKh), which can be found in the [list of free public APIs](https://github.com/public-apis/public-apis). Since the API requires CORS, Express is used as a backend server to request the API.

## Tools/Frameworks used

- React: a free and open-source front-end JavaScript library for building user interfaces based on components
- Vite: a frontend tool for building fast and optimized web applications and a development server
- ExpressJS: a back-end framework for NodeJS 
- [ViteExpress](https://github.com/szymmis/vite-express): used for integrating Vite and ExpressJS 
- Vanilla CSS
- Vanilla JavaScript

## Installation

To install and run the project locally:

1. Clone the repository.
2. Install dependencies with `npm install` in the console directory of the project.
3. After the installation of dependencies, build vite using `vite build`.
4. After building, to start the server type `node index.js`.
5. Click on the link in the terminal or type go to `http://localhost:3001`

## Additional Remarks
When going to the [deployed website](https://uxstaft2023-devdeptapp-sze.onrender.com), since it is deployed with a free plan on [render.com](https://render.com), one of the limitations is that the server becomes inactive when not used for a while, so it may take a while to load when accessing the website. Accessing the website shortly after accessing it, however, shouldn't take as long.

Another note is that since the API is for job offerings in EU, the languages seen in the application are mostly non-English, however, some are written in English.
