<img align="right" src="https://i.imgur.io/Amj2BQi_d.webp?maxwidth=640&shape=thumb&fidelity=medium" width="280px" draggable="false">

# Bedroz
[Bedroz.lol](https://bedroz.lol) is a website made with ReactJS, which has all your favorite movies and tv shows, in a nice and clean UI. 

## Requirements
- [NodeJS](https://nodejs.org/en/download/)

## Usage
1. Run `install.bat` to install all dependencies.
2. Add your TMDB API Key in /src/config.ts
3. Optional changes:

- `Logo`: Change the site logo by uploading a png file to /public/assets and naming it logo.png
- `Theme Color`: Change the main color of the site by opening /src/styles/main.scss and editing the line with `$primary-color: ...;`
- `Site Name`: Change the config in /src/config.ts and change the site name in /index.html

3. Run `start.bat` to test in the dev server. 
4. Run `build.bat` to build the production files (/dist) that will be uploaded on your hosting server.
5. Voila, you are now done 

## Support
If you need any help, encounter any issues, or just have a suggestion, feel free to open an issue in this repository or contact me on Discord (tornado#7262).
