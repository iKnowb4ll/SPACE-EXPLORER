# SPACE EXPLORER 🌌

An educational astronomy website built with HTML, CSS, JavaScript, and Three.js.

## Main features
- Mission-control dashboard with astronomy facts
- Interactive 3D Solar System with the Sun and eight planets
- Selectable dwarf planets, moons, asteroids, comets, black holes, galaxies, star clusters, and nebulae
- Procedural planet surface textures, Saturn's rings, starfield, and stylized deep-space objects
- Camera controls: drag to rotate, scroll to zoom, select objects to focus
- Destination mode for inspecting selected celestial objects (not a real flight simulator)
- Searchable encyclopedia with object categories
- Ten-question astronomy quiz with scoring and explanations
- Constellation guide
- NASA public image-library search
- Favorites saved in the current browser
- Responsive desktop, tablet, and mobile layout

## Run locally
An internet connection is required for Three.js, fonts, and NASA image search.

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
5. Wait for deployment to finish.

Site URL: https://iknowb4ll.github.io/SPACE-EXPLORER/

## Controls
- In the 3D map, drag to rotate and scroll to zoom.
- Select an object chip or visible object to inspect it.
- Use destination mode to focus the camera on an object.
- Pause or resume orbital motion and reset the camera.
- Search and filter the encyclopedia.
- Save objects to Favorites; saved items remain in that browser.

## Accuracy notes
This is a stylized educational model, not a scale-accurate astronomy simulator. Planet sizes, distances, object positions, and orbital speeds are simplified. NASA image search depends on the public NASA Images API and may be unavailable temporarily.