# Solar System Explorer 🌞

An educational Solar System website built with HTML, CSS, JavaScript and Three.js.

## Project focus
This project focuses only on our Solar System. It does not include other galaxies, nebulae, or black holes.

## Features
- Interactive 3D Solar System with the Sun, eight planets and selected dwarf planets
- Elliptical orbital paths and animated orbital motion
- Selectable worlds with camera focus
- Major moons displayed in orbit around their parent planets
- Optional asteroid belt visualization
- Toggle orbital paths and background stars
- Pause and speed controls for the simulation
- Planet profiles with diameter, gravity, average temperature, rotation, orbital period, distance, mass, atmosphere and discovery facts
- Planet guide and comparison table
- Responsive desktop, tablet and mobile interface
- Procedural planet textures and a stylized Sun, Earth atmosphere and Saturn rings

## Run locally
An internet connection is needed to load Three.js and the Google Fonts.

Open the project in VS Code and use the Live Server extension.

Alternatively run:
```bash
python -m http.server 8000
```
Then open http://localhost:8000. Do not open index.html directly using file:// because browser ES modules work best from a local server.

## Publish with GitHub Pages
1. Open repository Settings.
2. Select Pages.
3. Under Build and deployment, choose Deploy from a branch.
4. Select branch main and folder /(root), then save.

Website: https://iknowb4ll.github.io/SPACE-EXPLORER/

## Controls
- Drag in the 3D window to rotate the camera.
- Scroll to zoom.
- Click a planet or moon to select it.
- Use Orbits, Stars and Asteroid Belt to show or hide scene elements.
- Pause or change the orbit speed with the controls below the 3D view.
- Use Planet Guide to open a world profile.
- Use Compare Worlds to compare planetary facts.

## Data and accuracy
This is an educational, artistic-scale model. Planet sizes and orbital distances are compressed so the entire Solar System fits in one view. Orbital motion is accelerated and is not a live JPL ephemeris. Planetary reference values are rounded.

Reference data:
- NASA Goddard Space Flight Center, Planetary Fact Sheet: https://nssdc.gsfc.nasa.gov/planetary/factsheet/
- NASA Solar System Exploration, Planet Compare: https://solarsystem.nasa.gov/planet-compare/
- NASA, Solar System Temperatures: https://science.nasa.gov/resource/solar-system-temperatures/
