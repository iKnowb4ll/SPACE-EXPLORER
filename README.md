# SPACE EXPLORER 🌌

An interactive 3D Solar System experience built with **HTML, CSS, JavaScript, and Three.js**.

## Features
- Interactive 3D Solar System with the Sun and all eight planets
- Animated planetary orbits and rotation
- Select planets to view their facts and statistics
- Drag to rotate the view and scroll to zoom
- Focus on a selected planet, pause orbits, reset view, and use full screen
- Responsive desktop and mobile layout
- Procedurally generated planet surfaces and starfield

## Run locally
You need an internet connection because Three.js and fonts are loaded from CDNs.

Use VS Code with the Live Server extension, then right-click `index.html` and choose **Open with Live Server**.

Alternatively, run:
```bash
python -m http.server 8000
```
Then visit http://localhost:8000. Do not open `index.html` directly as a file; ES modules work best through a local web server.

## Publish with GitHub Pages
1. Open repository **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**, then save.
5. Wait for deployment to finish.

Site URL: https://iknowb4ll.github.io/SPACE-EXPLORER/

## Controls
- **Drag:** rotate the camera
- **Scroll:** zoom in and out
- **Planet buttons:** select a destination
- **Focus on planet:** move the camera toward the selected planet
- **Pause orbits:** stop/resume orbital motion
- **Reset view:** return to overview
- **Full screen:** toggle browser full screen

Planet sizes, distances, and orbital speeds are stylized for an enjoyable educational visualization and are not to scale.
