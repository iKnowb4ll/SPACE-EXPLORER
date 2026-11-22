# SPACE EXPLORER 🌌

An interactive space exploration website built with **HTML, CSS, JavaScript, and Three.js**.

## Explore
- Mission-control dashboard with quick links and a rotating discovery fact
- Interactive 3D Solar System and stylized galaxy map
- Selectable planets, dwarf planets, moons, comets, asteroids, star clusters, nebulae, galaxies, and black holes
- Planet and celestial-object encyclopedia with search and category filters
- 3D planet surfaces, Saturn's rings, starfield, and black-hole accretion disk
- Space travel destination selector and simulated navigation
- Earth view through the 3D globe in the Solar System
- Space quiz with ten questions, scoring, and explanations
- Constellation guide with star-pattern diagrams
- NASA public image-library search and photo gallery
- Favorites saved in the current browser
- Live International Space Station telemetry when the public data service is reachable
- Responsive layout for desktop, tablet, and mobile

## Run locally
An internet connection is required for Three.js, fonts, NASA image search, and live ISS telemetry.

Use VS Code with the Live Server extension and open `index.html`.

Alternatively, from the project folder run:
```bash
python -m http.server 8000
```
Then visit http://localhost:8000. Do not open the HTML file directly with `file://`; ES modules and browser requests work best through a local web server.

## Publish with GitHub Pages
1. Open repository **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**, then save.
5. Wait for the deployment to finish.

Site URL: https://iknowb4ll.github.io/SPACE-EXPLORER/

## Controls
- In the galaxy map, drag to rotate and scroll to zoom.
- Select a celestial-object chip or click a visible planet to inspect it.
- Use **Focus** / **Travel** to move the camera toward a destination.
- Pause or resume orbital motion and reset the camera.
- Search and filter the encyclopedia.
- Save objects to Favorites; saved items remain in that browser.

## Data and accuracy notes
This is an educational visualization, not a physically accurate scale model or flight simulator. Planet sizes, distances, and orbital paths are stylized. NASA image search and ISS telemetry use public services and may occasionally be unavailable due to network, browser, or service limitations. Favorites are stored locally in the browser and are not synced between devices.
