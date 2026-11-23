import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const worlds = [
 {id:'sun',name:'Sun',kind:'G-type main-sequence star',type:'STAR',color:0xffb64f,light:0xffe1a1,display:1.45,au:0,period:0,diameter:'1,391,400 km',gravity:'274 m/s²',temperature:'About 5,500 °C',day:'About 25–35 Earth days at the surface',year:'About 225–250 million Earth years around the Milky Way',distance:'Centre of the Solar System',mass:'1.989 × 10³⁰ kg',atmosphere:'Hot plasma; mostly hydrogen and helium',moons:'No natural satellites',summary:'The star at the centre of our Solar System. Its gravity holds the planets, dwarf planets, asteroids and comets in orbit.',fact:'The Sun contains about 99.86% of the total mass of the Solar System.'},
 {id:'mercury',name:'Mercury',kind:'Terrestrial planet',type:'INNER PLANET',color:0xa8a49d,light:0xe0d9cb,display:.22,au:.387,period:87.97,diameter:'4,879 km',gravity:'3.7 m/s²',temperature:'167 °C mean',day:'58.6 Earth days rotation',year:'88 Earth days',distance:'57.9 million km · 0.39 AU',mass:'3.30 × 10²³ kg',atmosphere:'Very thin exosphere: oxygen, sodium, hydrogen, helium and potassium',moons:'0 known',summary:'The smallest planet and the closest to the Sun. Its heavily cratered surface resembles Earth’s Moon.',fact:'A solar day on Mercury lasts about 176 Earth days.'},
 {id:'venus',name:'Venus',kind:'Terrestrial planet',type:'INNER PLANET',color:0xd8ad79,light:0xf4dbad,display:.34,au:.723,period:224.7,diameter:'12,104 km',gravity:'8.9 m/s²',temperature:'464 °C mean',day:'243 Earth days rotation · retrograde',year:'225 Earth days',distance:'108.2 million km · 0.72 AU',mass:'4.87 × 10²⁴ kg',atmosphere:'Very thick carbon-dioxide atmosphere with clouds of sulfuric acid',moons:'0 known',summary:'A rocky world wrapped in thick clouds. Its powerful greenhouse effect makes it the hottest planet.',fact:'Venus rotates backwards compared with most planets and its rotation is slower than its orbit around the Sun.'},
 {id:'earth',name:'Earth',kind:'Terrestrial planet',type:'INNER PLANET',color:0x2877c7,light:0x9de5ff,display:.36,au:1,period:365.256,diameter:'12,756 km',gravity:'9.8 m/s²',temperature:'15 °C mean',day:'23.9 hours rotation',year:'365.25 days',distance:'149.6 million km · 1 AU',mass:'5.97 × 10²⁴ kg',atmosphere:'Mostly nitrogen and oxygen',moons:'1 known · the Moon',summary:'Our home world. Liquid surface water and a protective atmosphere support a remarkable diversity of life.',fact:'Earth is the only world currently known to support life.'},
 {id:'mars',name:'Mars',kind:'Terrestrial planet',type:'INNER PLANET',color:0xc66d4e,light:0xf0a27b,display:.28,au:1.524,period:686.98,diameter:'6,792 km',gravity:'3.7 m/s²',temperature:'−65 °C mean',day:'24.6 hours',year:'687 Earth days',distance:'227.9 million km · 1.52 AU',mass:'6.42 × 10²³ kg',atmosphere:'Thin, mostly carbon dioxide',moons:'2 known · Phobos and Deimos',summary:'A cold desert planet with volcanoes, canyons, polar ice and evidence of ancient flowing water.',fact:'Olympus Mons on Mars is the largest known volcano in the Solar System.'},
 {id:'jupiter',name:'Jupiter',kind:'Gas giant',type:'OUTER PLANET',color:0xc5a17e,light:0xf0d2ae,display:.88,au:5.203,period:4332.6,diameter:'142,984 km',gravity:'23.1 m/s²',temperature:'−110 °C at cloud level',day:'9.9 hours',year:'11.86 Earth years',distance:'778.6 million km · 5.20 AU',mass:'1.90 × 10²⁷ kg',atmosphere:'Mostly hydrogen and helium, with ammonia and water clouds',moons:'Many known · including Io, Europa, Ganymede and Callisto',summary:'The largest planet. Its atmosphere contains colourful cloud bands, powerful storms and the long-lived Great Red Spot.',fact:'Jupiter is more than twice as massive as all the other planets combined.'},
 {id:'saturn',name:'Saturn',kind:'Gas giant',type:'OUTER PLANET',color:0xd7c394,light:0xf5e4bd,display:.74,au:9.537,period:10759,diameter:'120,536 km',gravity:'9.0 m/s²',temperature:'−140 °C at cloud level',day:'About 10.7 hours',year:'29.45 Earth years',distance:'1.43 billion km · 9.54 AU',mass:'5.68 × 10²⁶ kg',atmosphere:'Mostly hydrogen and helium',moons:'Many known · including Titan and Enceladus',summary:'A gas giant famous for its broad, bright rings made mostly of water ice, with some rocky material.',fact:'Saturn’s rings are extremely wide but remarkably thin compared with their diameter.'},
 {id:'uranus',name:'Uranus',kind:'Ice giant',type:'OUTER PLANET',color:0x82cbd0,light:0xc6fbff,display:.53,au:19.191,period:30687,diameter:'51,118 km',gravity:'8.7 m/s²',temperature:'−195 °C at atmospheric level',day:'17.2 hours · retrograde',year:'84 Earth years',distance:'2.87 billion km · 19.19 AU',mass:'8.68 × 10²⁵ kg',atmosphere:'Hydrogen, helium and methane',moons:'27 known',summary:'A pale blue ice giant that rotates on its side, giving it extreme seasons.',fact:'Uranus has an axial tilt of about 98 degrees.'},
 {id:'neptune',name:'Neptune',kind:'Ice giant',type:'OUTER PLANET',color:0x416ad0,light:0x9fb8ff,display:.51,au:30.07,period:60190,diameter:'49,528 km',gravity:'11.0 m/s²',temperature:'−200 °C at atmospheric level',day:'16.1 hours',year:'165 Earth years',distance:'4.50 billion km · 30.07 AU',mass:'1.02 × 10²⁶ kg',atmosphere:'Hydrogen, helium and methane',moons:'14 known',summary:'A distant blue ice giant with very fast winds and a dark, dynamic atmosphere.',fact:'Neptune was the first planet located through mathematical prediction.'}
];

const dwarfPlanets = [
 {id:'ceres',name:'Ceres',kind:'Dwarf planet',type:'ASTEROID BELT',color:0x9c9b98,light:0xd2d0c9,display:.12,au:2.77,period:1681.6,diameter:'About 940 km',gravity:'0.28 m/s²',temperature:'About −105 °C',day:'9.1 hours',year:'4.6 Earth years',distance:'About 414 million km · 2.77 AU',mass:'9.38 × 10²⁰ kg',atmosphere:'No substantial atmosphere',moons:'0 known',summary:'The largest object in the asteroid belt between Mars and Jupiter, and the only dwarf planet in the inner Solar System.',fact:'Ceres contains water ice and bright salt deposits.'},
 {id:'pluto',name:'Pluto',kind:'Dwarf planet',type:'KUIPER BELT',color:0xb99c8c,light:0xe1c9ba,display:.15,au:39.48,period:90560,diameter:'2,376 km',gravity:'0.62 m/s²',temperature:'About −225 °C',day:'6.4 Earth days',year:'248 Earth years',distance:'About 5.9 billion km · 39.5 AU',mass:'1.30 × 10²² kg',atmosphere:'Thin nitrogen atmosphere with methane and carbon monoxide',moons:'5 known',summary:'An icy dwarf planet in the Kuiper Belt with mountains, glaciers and a complex system of moons.',fact:'Pluto and its largest moon, Charon, orbit a shared centre of mass outside Pluto.'}
];

const moons = [
 {id:'moon',name:'Moon',parent:'earth',kind:'Natural satellite',type:'EARTH MOON',color:0xb9bec8,light:0xf1f2f3,display:.105,orbit:0.82,period:27.32,diameter:'3,475 km',gravity:'1.62 m/s²',temperature:'Wide day-night temperature range',day:'27.3 Earth days rotation',year:'27.3 days around Earth',distance:'384,400 km average from Earth',mass:'7.35 × 10²² kg',atmosphere:'Extremely thin exosphere',moons:'Orbits Earth',summary:'Earth’s only natural satellite. Its gravity drives ocean tides and its phases have shaped calendars and skywatching.',fact:'The same lunar hemisphere generally faces Earth because the Moon is tidally locked.'},
 {id:'phobos',name:'Phobos',parent:'mars',kind:'Natural satellite',type:'MARS MOON',color:0x8b8279,light:0xc2b8ad,display:.045,orbit:.65,period:.32,diameter:'About 22 km',gravity:'Very weak',temperature:'Very cold',day:'Tidally locked',year:'7.7 hours around Mars',distance:'About 9,376 km from Mars',mass:'1.07 × 10¹⁶ kg',atmosphere:'No substantial atmosphere',moons:'Orbits Mars',summary:'The larger and closer of Mars’s two small, irregularly shaped moons.',fact:'Phobos orbits Mars faster than Mars rotates.'},
 {id:'deimos',name:'Deimos',parent:'mars',kind:'Natural satellite',type:'MARS MOON',color:0xa59d93,light:0xd5cec5,display:.035,orbit:.93,period:1.26,diameter:'About 12 km',gravity:'Very weak',temperature:'Very cold',day:'Tidally locked',year:'30.3 hours around Mars',distance:'About 23,460 km from Mars',mass:'1.48 × 10¹⁵ kg',atmosphere:'No substantial atmosphere',moons:'Orbits Mars',summary:'The smaller and more distant of Mars’s two moons.',fact:'Deimos moves slowly across the Martian sky because it orbits far from the planet.'},
 {id:'io',name:'Io',parent:'jupiter',kind:'Natural satellite',type:'JUPITER MOON',color:0xd7c06e,light:0xf5e49b,display:.10,orbit:1.42,period:1.77,diameter:'3,643 km',gravity:'1.80 m/s²',temperature:'Varies greatly; active volcanic surface',day:'1.77 Earth days',year:'1.77 days around Jupiter',distance:'About 421,700 km from Jupiter',mass:'8.93 × 10²² kg',atmosphere:'Thin sulfur dioxide atmosphere',moons:'Orbits Jupiter',summary:'A volcanically active moon whose surface is continually reshaped by eruptions.',fact:'Io is the most volcanically active world known in the Solar System.'},
 {id:'europa',name:'Europa',parent:'jupiter',kind:'Natural satellite',type:'JUPITER MOON',color:0xc8bda7,light:0xf2e6d2,display:.095,orbit:1.8,period:3.55,diameter:'3,122 km',gravity:'1.31 m/s²',temperature:'About −160 °C at the surface',day:'3.55 Earth days',year:'3.55 days around Jupiter',distance:'About 671,000 km from Jupiter',mass:'4.80 × 10²² kg',atmosphere:'Very thin oxygen atmosphere',moons:'Orbits Jupiter',summary:'An icy moon with a cracked surface. Evidence suggests a global salty ocean may exist beneath its ice shell.',fact:'Europa is one of the leading places scientists study when investigating potentially habitable environments.'},
 {id:'ganymede',name:'Ganymede',parent:'jupiter',kind:'Natural satellite',type:'JUPITER MOON',color:0x99978f,light:0xd0cdc4,display:.12,orbit:2.25,period:7.15,diameter:'5,268 km',gravity:'1.43 m/s²',temperature:'Very cold',day:'7.15 Earth days',year:'7.15 days around Jupiter',distance:'About 1.07 million km from Jupiter',mass:'1.48 × 10²³ kg',atmosphere:'Very thin oxygen atmosphere',moons:'Orbits Jupiter',summary:'The largest moon in the Solar System, larger in diameter than the planet Mercury.',fact:'Ganymede is the only moon known to have its own intrinsic magnetic field.'},
 {id:'callisto',name:'Callisto',parent:'jupiter',kind:'Natural satellite',type:'JUPITER MOON',color:0x827e78,light:0xb9b4ab,display:.105,orbit:2.75,period:16.69,diameter:'4,821 km',gravity:'1.24 m/s²',temperature:'About −139 °C',day:'16.69 Earth days',year:'16.69 days around Jupiter',distance:'About 1.88 million km from Jupiter',mass:'1.08 × 10²³ kg',atmosphere:'Extremely thin carbon-dioxide atmosphere',moons:'Orbits Jupiter',summary:'A heavily cratered moon with one of the oldest landscapes in the Solar System.',fact:'Callisto’s surface preserves a long record of impacts.'},
 {id:'titan',name:'Titan',parent:'saturn',kind:'Natural satellite',type:'SATURN MOON',color:0xc18d4f,light:0xe7b66f,display:.115,orbit:1.75,period:15.95,diameter:'5,150 km',gravity:'1.35 m/s²',temperature:'About −179 °C',day:'15.95 Earth days',year:'15.95 days around Saturn',distance:'About 1.22 million km from Saturn',mass:'1.35 × 10²³ kg',atmosphere:'Dense nitrogen atmosphere with methane',moons:'Orbits Saturn',summary:'Saturn’s largest moon, with a thick atmosphere, rivers and lakes of liquid methane and ethane.',fact:'Titan is the only moon known to have stable liquid lakes and seas on its surface.'},
 {id:'enceladus',name:'Enceladus',parent:'saturn',kind:'Natural satellite',type:'SATURN MOON',color:0xcbd5dc,light:0xffffff,display:.055,orbit:1.32,period:1.37,diameter:'About 504 km',gravity:'0.11 m/s²',temperature:'Very cold ice surface',day:'1.37 Earth days',year:'1.37 days around Saturn',distance:'About 238,000 km from Saturn',mass:'1.08 × 10²⁰ kg',atmosphere:'Very tenuous water-vapour plume environment',moons:'Orbits Saturn',summary:'A small icy moon that releases plumes of water vapour and ice particles from fractures near its south pole.',fact:'The plumes provide evidence for a global subsurface ocean.'},
 {id:'triton',name:'Triton',parent:'neptune',kind:'Natural satellite',type:'NEPTUNE MOON',color:0xb6a9a1,light:0xe1d5cd,display:.085,orbit:1.2,period:5.88,diameter:'2,707 km',gravity:'0.78 m/s²',temperature:'About −235 °C',day:'5.88 Earth days',year:'5.88 days around Neptune',distance:'About 355,000 km from Neptune',mass:'2.14 × 10²² kg',atmosphere:'Thin nitrogen atmosphere',moons:'Orbits Neptune',summary:'Neptune’s largest moon. It travels around the planet in a retrograde direction.',fact:'Triton may be a captured object from the Kuiper Belt.'}
];

const $ = (selector) => document.querySelector(selector);
let scene, camera, renderer, controls, raycaster, pointer;
let worldMeshes = new Map(), moonMeshes = new Map(), planetGroups = new Map(), orbitLines = [];
let starField, asteroidField, paused = false, orbitVisible = true, starsVisible = true, beltVisible = false;
let timeSpeed = 1, selectedId = 'earth', cameraTween = null, lastFrame = 0; beltVisible = true;
const allObjects = [...worlds, ...dwarfPlanets, ...moons];
const bodyById = new Map(allObjects.map(body => [body.id, body]));

function makeTexture(body) {
 const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 512;
 const ctx = canvas.getContext('2d');
 const base = '#' + body.color.toString(16).padStart(6,'0');
 const grad = ctx.createLinearGradient(0,0,0,512);
 grad.addColorStop(0,base); grad.addColorStop(.62,base); grad.addColorStop(1,'#101725');
 ctx.fillStyle = grad; ctx.fillRect(0,0,1024,512);
 let seed = body.id.split('').reduce((sum,ch)=>sum+ch.charCodeAt(0),17);
 const rand = () => { seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; };
 if(['Jupiter','Saturn','Uranus','Neptune'].includes(body.name)) {
  for(let y=0;y<512;y+=12+rand()*18){ctx.fillStyle=rand()>.5?'rgba(255,245,225,.17)':'rgba(20,26,39,.17)';ctx.fillRect(0,y,1024,5+rand()*13);}
  if(body.name==='Jupiter'){ctx.fillStyle='rgba(167,76,49,.85)';ctx.beginPath();ctx.ellipse(690,305,77,34,-.12,0,Math.PI*2);ctx.fill();}
 } else {
  for(let i=0;i<2400;i++){const x=rand()*1024,y=rand()*512,r=rand()*2.4+.3;ctx.fillStyle=rand()>.5?'rgba(255,255,255,.055)':'rgba(0,0,0,.10)';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
 }
 if(body.name==='Earth'){
  ctx.fillStyle='#347b50';
  const continents=[[[110,125],[165,88],[235,108],[260,170],[225,218],[188,296],[140,270],[112,210]],[[270,275],[325,249],[369,302],[349,392],[315,445],[285,365]],[[482,101],[562,82],[625,132],[593,195],[535,205],[498,161]],[[575,248],[652,234],[714,289],[680,372],[620,402],[580,330]],[[748,101],[854,117],[892,187],[844,228],[778,190]]];
  continents.forEach(points=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();});
  ctx.strokeStyle='rgba(245,250,255,.26)';ctx.lineWidth=8;
  for(let y=70;y<500;y+=95){ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(280,y-30,700,y+34,1024,y-10);ctx.stroke();}
 }
 if(['Mercury','Mars','Moon','Ceres','Pluto','Callisto'].includes(body.name)){
  for(let i=0;i<100;i++){const x=rand()*1024,y=rand()*512,r=2+rand()*15;ctx.fillStyle='rgba(10,12,18,.2)';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=2;ctx.stroke();}
 }
 if(body.name==='Saturn'){
  ctx.fillStyle='rgba(239,222,184,.16)';for(let y=110;y<400;y+=27)ctx.fillRect(0,y,1024,7);
 }
 const texture = new THREE.CanvasTexture(canvas);
 texture.colorSpace = THREE.SRGBColorSpace;
 texture.anisotropy = Math.min(8,renderer?.capabilities.getMaxAnisotropy?.()||4);
 return texture;
}

function makeGlowTexture() {
 const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
 const ctx=canvas.getContext('2d');const g=ctx.createRadialGradient(64,64,2,64,64,62);
 g.addColorStop(0,'rgba(255,240,190,.9)');g.addColorStop(.2,'rgba(255,175,75,.38)');g.addColorStop(1,'rgba(255,130,35,0)');
 ctx.fillStyle=g;ctx.fillRect(0,0,128,128);return new THREE.CanvasTexture(canvas);
}
function addOrbit(radius, inclination=0, eccentricity=0) {
 const points=[];
 for(let i=0;i<256;i++){const a=i/256*Math.PI*2;const x=radius*Math.cos(a)-radius*eccentricity;const z=radius*Math.sin(a)*Math.sqrt(1-eccentricity*eccentricity);points.push(new THREE.Vector3(x,0,z));}
 const geometry=new THREE.BufferGeometry().setFromPoints(points);
 const line=new THREE.LineLoop(geometry,new THREE.LineBasicMaterial({color:0x54749e,transparent:true,opacity:.34}));
 line.rotation.x=inclination;scene.add(line);orbitLines.push(line);return line;
}
const orbitRadius = {mercury:4.2,venus:5.8,earth:7.6,mars:10.0,ceres:12.1,jupiter:14.5,saturn:18.4,uranus:22.2,neptune:25.7,pluto:29};
const orbitInclination = {mercury:.04,venus:.03,earth:0,mars:.03,ceres:.08,jupiter:.02,saturn:.04,uranus:.02,neptune:.03,pluto:.17};
function makePlanetGroup(body) {
 const group=new THREE.Group();scene.add(group);planetGroups.set(body.id,group);
 const material=new THREE.MeshStandardMaterial({map:makeTexture(body),roughness:body.id==='sun'?.45:.88,metalness:0});
 if(body.id==='sun'){
  const sun=new THREE.Mesh(new THREE.SphereGeometry(body.display,64,64),new THREE.MeshBasicMaterial({map:makeTexture(body)}));
  sun.userData.objectId=body.id;group.add(sun);worldMeshes.set(body.id,sun);
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:makeGlowTexture(),color:0xffc16e,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
  glow.scale.set(8,8,1);group.add(glow);
  const light=new THREE.PointLight(0xffd7a0,145,240,1.35);group.add(light);
  return;
 }
 const mesh=new THREE.Mesh(new THREE.SphereGeometry(body.display,48,48),material);
 mesh.userData.objectId=body.id;group.add(mesh);worldMeshes.set(body.id,mesh);
 if(body.id==='earth'){
  const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(body.display*1.045,48,48),new THREE.MeshBasicMaterial({color:0x5cbcff,transparent:true,opacity:.11,side:THREE.BackSide}));
  group.add(atmosphere);
 }
 if(body.id==='saturn'){
  const ring=new THREE.Mesh(new THREE.RingGeometry(body.display*1.32,body.display*2.2,128),new THREE.MeshStandardMaterial({color:0xd9c69e,roughness:.9,side:THREE.DoubleSide,transparent:true,opacity:.78}));
  ring.rotation.x=Math.PI/2.12;mesh.add(ring);
  const ringGap=new THREE.Mesh(new THREE.RingGeometry(body.display*1.58,body.display*1.72,96),new THREE.MeshBasicMaterial({color:0x30291f,side:THREE.DoubleSide,transparent:true,opacity:.55}));
  ringGap.rotation.x=Math.PI/2.12;mesh.add(ringGap);
 }
 if(body.id==='uranus'){
  const ring=new THREE.Mesh(new THREE.RingGeometry(body.display*1.3,body.display*1.7,80),new THREE.MeshBasicMaterial({color:0x9dc4c5,side:THREE.DoubleSide,transparent:true,opacity:.34}));
  ring.rotation.x=Math.PI/2.55;mesh.add(ring);
 }
}
function addMoon(body) {
 const parent=planetGroups.get(body.parent);if(!parent)return;
 const orbitGroup=new THREE.Group();parent.add(orbitGroup);
 const radius=body.orbit;
 const points=[];for(let i=0;i<128;i++){const a=i/128*Math.PI*2;points.push(new THREE.Vector3(Math.cos(a)*radius,0,Math.sin(a)*radius));}
 const line=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x6f8daf,transparent:true,opacity:.28}));
 orbitGroup.add(line);orbitLines.push(line);
 const mesh=new THREE.Mesh(new THREE.SphereGeometry(body.display,24,24),new THREE.MeshStandardMaterial({map:makeTexture(body),roughness:.9}));
 mesh.userData.objectId=body.id;orbitGroup.add(mesh);moonMeshes.set(body.id,mesh);orbitGroup.userData.period=body.period;orbitGroup.userData.phase=Math.random()*Math.PI*2;orbitGroup.userData.radius=radius;orbitGroup.userData.moonId=body.id;
 moonOrbitGroups.push(orbitGroup);
}

let moonOrbitGroups=[];
function initScene() {
 const host=$('#threeContainer');
 scene=new THREE.Scene();scene.background=new THREE.Color(0x030714);
 camera=new THREE.PerspectiveCamera(46,host.clientWidth/Math.max(1,host.clientHeight),.1,500);
 camera.position.set(0,37,57);
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8));
 renderer.setSize(host.clientWidth,host.clientHeight);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 host.appendChild(renderer.domElement);
 controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.055;controls.minDistance=7;controls.maxDistance=110;controls.maxPolarAngle=Math.PI*.49;
 scene.add(new THREE.AmbientLight(0x9fb8e2,.65));
 const fill=new THREE.DirectionalLight(0x9db8e8,.38);fill.position.set(-25,35,25);scene.add(fill);
 const starsGeometry=new THREE.BufferGeometry(),starPositions=new Float32Array(4500*3);
 for(let i=0;i<4500;i++){const r=THREE.MathUtils.randFloat(58,145),a=Math.random()*Math.PI*2,y=THREE.MathUtils.randFloatSpread(2);starPositions.set([Math.cos(a)*r,y*r*.55,Math.sin(a)*r],i*3);}
 starsGeometry.setAttribute('position',new THREE.BufferAttribute(starPositions,3));
 starField=new THREE.Points(starsGeometry,new THREE.PointsMaterial({color:0xd8e7ff,size:.35,transparent:true,opacity:.9,sizeAttenuation:true}));scene.add(starField);
 makePlanetGroup(worlds[0]);
 worlds.slice(1).forEach(body=>{
  const r=orbitRadius[body.id]||body.au;
  addOrbit(r,orbitInclination[body.id]||0,body.id==='pluto'?.18:body.id==='mercury'?.2:.04);
  makePlanetGroup(body);
 });
 dwarfPlanets.forEach(body=>{
  const r=orbitRadius[body.id];addOrbit(r,orbitInclination[body.id]||.08,body.id==='pluto'?.18:.08);makePlanetGroup(body);
 });
 // Main planets move along compressed, elliptical orbits for legibility.
 allObjects.filter(body=>worldMeshes.has(body.id)&&body.id!=='sun').forEach(body=>{
  const group=planetGroups.get(body.id);group.userData.bodyId=body.id;group.userData.radius=orbitRadius[body.id];group.userData.period=body.period;group.userData.phase=Math.random()*Math.PI*2;group.userData.inclination=orbitInclination[body.id]||0;
 });
 // Asteroid belt: particles between the Mars and Jupiter orbits.
 const asteroidPositions=new Float32Array(1300*3);
 for(let i=0;i<1300;i++){const r=THREE.MathUtils.randFloat(11.45,13.25),a=Math.random()*Math.PI*2;asteroidPositions.set([Math.cos(a)*r,THREE.MathUtils.randFloatSpread(.16),Math.sin(a)*r],i*3);}
 const asteroidGeometry=new THREE.BufferGeometry();asteroidGeometry.setAttribute('position',new THREE.BufferAttribute(asteroidPositions,3));
 asteroidField=new THREE.Points(asteroidGeometry,new THREE.PointsMaterial({color:0xa99f92,size:.075,transparent:true,opacity:.77}));asteroidField.visible=beltVisible;scene.add(asteroidField);
 moons.forEach(addMoon);
 raycaster=new THREE.Raycaster();pointer=new THREE.Vector2();
 let pointerStart=null;
 renderer.domElement.addEventListener('pointerdown',event=>{pointerStart={x:event.clientX,y:event.clientY};});
 renderer.domElement.addEventListener('pointerup',event=>{
  if(!pointerStart)return;
  const moved=Math.hypot(event.clientX-pointerStart.x,event.clientY-pointerStart.y);pointerStart=null;
  if(moved>8)return;
  const rect=renderer.domElement.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width*2-1;pointer.y=-(event.clientY-rect.top)/rect.height*2+1;
  raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects([...worldMeshes.values(),...moonMeshes.values()],false);
  if(hits.length){const id=hits[0].object.userData.objectId;if(id)selectObject(id,true);}
 });
 window.addEventListener('resize',resizeScene);
 $('#sceneLoading').classList.add('hidden');
 animate(0);
}
function resizeScene(){if(!renderer||!camera)return;const host=$('#threeContainer');camera.aspect=host.clientWidth/Math.max(1,host.clientHeight);camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);}
function currentPosition(bodyId){
 const body=bodyById.get(bodyId);if(bodyId==='sun')return new THREE.Vector3(0,0,0);if(!body)return new THREE.Vector3();
 scene.updateMatrixWorld(true);
 const moon=moonMeshes.get(bodyId);if(moon)return moon.getWorldPosition(new THREE.Vector3());
 const group=planetGroups.get(bodyId);return group?group.getWorldPosition(new THREE.Vector3()):new THREE.Vector3();
}
function focusObject(id){
 const target=currentPosition(id);const body=bodyById.get(id);const distance=Math.max(5,(body?.display||.4)*6+4);
 const direction=new THREE.Vector3().subVectors(camera.position,controls.target);if(direction.lengthSq()<.001)direction.set(0,.45,1);direction.normalize();
 cameraTween={from:camera.position.clone(),to:target.clone().add(direction.multiplyScalar(distance)),fromTarget:controls.target.clone(),toTarget:target.clone(),start:performance.now(),duration:850};
}
function animate(now){
 requestAnimationFrame(animate);if(!renderer)return;
 const dt=Math.min(.05,(now-(lastFrame||now))/1000);lastFrame=now;
 if(!paused){
  worlds.slice(1).concat(dwarfPlanets).forEach(body=>{
   const group=planetGroups.get(body.id);if(!group)return;
   const r=group.userData.radius,ecc=body.id==='pluto'?.18:body.id==='mercury'?.2:.04;
   group.userData.phase+=dt*timeSpeed*.11/Math.sqrt(Math.max(.08,body.period/365.25));
   const a=group.userData.phase;
   group.position.set(r*(Math.cos(a)-ecc),Math.sin(a)*r*Math.sin(group.userData.inclination),r*Math.sin(a)*Math.sqrt(1-ecc*ecc));
   const mesh=worldMeshes.get(body.id);if(mesh)mesh.rotation.y+=dt*timeSpeed*.28;
  });
  moonOrbitGroups.forEach(group=>{group.rotation.y+=dt*timeSpeed*.18/Math.sqrt(Math.max(.02,group.userData.period/27));const mesh=group.children[1];if(mesh)mesh.rotation.y+=dt*.05;});
 }
 if(cameraTween){const t=Math.min(1,(now-cameraTween.start)/cameraTween.duration),e=1-Math.pow(1-t,3);camera.position.lerpVectors(cameraTween.from,cameraTween.to,e);controls.target.lerpVectors(cameraTween.fromTarget,cameraTween.toTarget,e);if(t>=1)cameraTween=null;}
 controls.update();renderer.render(scene,camera);
}
function updateDetail(id){
 const body=bodyById.get(id);if(!body)return;
 selectedId=id;$('#sceneSelection').textContent='SELECTED: '+body.name.toUpperCase();
 $('#detailIndex').textContent=String(allObjects.indexOf(body)+1).padStart(2,'0')+' / '+String(allObjects.length).padStart(2,'0');
 $('#detailType').textContent=body.type||body.kind.toUpperCase();$('#detailName').textContent=body.name;
 $('#detailSummary').textContent=body.summary;$('#detailFact').textContent=body.fact;
 $('#planetPortrait').style.setProperty('--portrait-color','#'+body.color.toString(16).padStart(6,'0'));
 $('#planetPortrait').style.setProperty('--portrait-light','#'+body.light.toString(16).padStart(6,'0'));
 $('#planetPortrait').style.setProperty('--portrait-glow','rgba(115,180,240,.22)');
 $('#portraitSymbol').textContent='';
 const stats=[['DIAMETER',body.diameter],['MASS',body.mass],['GRAVITY',body.gravity],['MEAN TEMP.',body.temperature],['DAY / ROTATION',body.day],['YEAR / ORBIT',body.year],['DISTANCE',body.distance],['ATMOSPHERE',body.atmosphere],['MOONS',body.moons]];
 $('#detailStats').innerHTML=stats.map(([label,value])=>'<div class="stat"><span>'+label+'</span><b>'+value+'</b></div>').join('');
 document.querySelectorAll('[data-world-id]').forEach(button=>button.classList.toggle('active',button.dataset.worldId===id));
 document.querySelectorAll('[data-moon-id]').forEach(button=>button.classList.toggle('active',button.dataset.moonId===id));
}
function selectObject(id,focus=false){if(!bodyById.has(id))return;updateDetail(id);if(focus&&renderer)focusObject(id);}
function makeWorldChip(body){
 const b=document.createElement('button');b.className='world-chip';b.dataset.worldId=body.id;b.style.setProperty('--color','#'+body.color.toString(16).padStart(6,'0'));b.style.setProperty('--light','#'+body.light.toString(16).padStart(6,'0'));b.style.setProperty('--glow','rgba(115,180,240,.2)');
 b.innerHTML='<span class="world-dot"></span><b>'+body.name+'</b><small>'+body.kind.toUpperCase()+'</small>';b.addEventListener('click',()=>selectObject(body.id,true));return b;
}
function renderSelectors(){
 const worldSelector=$('#worldSelector'),moonSelector=$('#moonSelector');worldSelector.innerHTML='';moonSelector.innerHTML='';
 worlds.slice(1).forEach(body=>worldSelector.appendChild(makeWorldChip(body)));
 dwarfPlanets.forEach(body=>worldSelector.appendChild(makeWorldChip(body)));
 moons.forEach(body=>{const b=document.createElement('button');b.className='moon-chip';b.dataset.moonId=body.id;b.innerHTML='<b>'+body.name+'</b><small>'+body.parent.toUpperCase()+' MOON</small>';b.addEventListener('click',()=>selectObject(body.id,true));moonSelector.appendChild(b);});
}
function guideCard(body){
 const article=document.createElement('article');article.className='guide-card';article.tabIndex=0;
 article.style.setProperty('--color','#'+body.color.toString(16).padStart(6,'0'));article.style.setProperty('--light','#'+body.light.toString(16).padStart(6,'0'));article.style.setProperty('--glow','rgba(115,180,240,.2)');
 const facts=[['DIAMETER',body.diameter],['MASS',body.mass],['GRAVITY',body.gravity],['TEMPERATURE',body.temperature],['DAY / ROTATION',body.day],['YEAR / ORBIT',body.year],['ATMOSPHERE',body.atmosphere],['MOONS',body.moons]];
 article.innerHTML='<div class="guide-visual"><span></span></div><span class="guide-type">'+(body.type||body.kind).toUpperCase()+'</span><h3>'+body.name+'</h3><p>'+body.summary+'</p><p class="guide-discovery"><strong>QUICK DISCOVERY</strong><br>'+body.fact+'</p><div class="guide-facts">'+facts.map(([label,value])=>'<div><small>'+label+'</small><b>'+value+'</b></div>').join('')+'</div><div class="guide-meta"><span>'+body.distance+'</span><span>OPEN 3D PROFILE ↗</span></div>';
 const open=()=>{showView('system');selectObject(body.id,true);};article.addEventListener('click',open);article.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});return article;
}
function renderGuide(){
 const grid=$('#guideGrid'),dwarfs=$('#dwarfGrid'),moonGrid=$('#moonGuideGrid');grid.innerHTML='';dwarfs.innerHTML='';moonGrid.innerHTML='';
 worlds.forEach(body=>grid.appendChild(guideCard(body)));
 dwarfPlanets.forEach(body=>dwarfs.appendChild(guideCard(body)));
 moons.forEach(body=>moonGrid.appendChild(guideCard(body)));
}
function renderComparison(){
 const tbody=$('#compareBody');tbody.innerHTML='';
 worlds.slice(1).forEach(body=>{
  const tr=document.createElement('tr');tr.tabIndex=0;
  const cells=[body.name,body.diameter,body.gravity,body.temperature,body.distance,body.day,body.year];
  tr.innerHTML=cells.map(value=>'<td>'+value+'</td>').join('');
  const open=()=>{showView('system');selectObject(body.id,true);};
  tr.addEventListener('click',open);tr.addEventListener('keydown',e=>{if(e.key==='Enter'){open();}});
  tbody.appendChild(tr);
 });
}
function showView(name){
 document.querySelectorAll('.view').forEach(view=>view.classList.toggle('active',view.id==='view-'+name));
 document.querySelectorAll('.nav-link').forEach(button=>button.classList.toggle('active',button.dataset.view===name));
 $('.main-nav').classList.remove('open');
 if(name==='system')setTimeout(resizeScene,60);
 window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();showView(button.dataset.view);}));
$('#menuToggle').addEventListener('click',()=>$('.main-nav').classList.toggle('open'));
$('#pauseButton').addEventListener('click',()=>{paused=!paused;$('#pauseButton').textContent=paused?'▶ RESUME':'Ⅱ PAUSE';});
$('#resetButton').addEventListener('click',()=>{if(!camera)return;cameraTween={from:camera.position.clone(),to:new THREE.Vector3(0,37,57),fromTarget:controls.target.clone(),toTarget:new THREE.Vector3(),start:performance.now(),duration:850};selectObject('earth');});
$('#focusSunButton').addEventListener('click',()=>selectObject('sun',true));
$('#focusSelected').addEventListener('click',()=>selectObject(selectedId,true));
$('#showWorlds').addEventListener('click',()=>showView('worlds'));
$('#orbitToggle').addEventListener('click',()=>{orbitVisible=!orbitVisible;orbitLines.forEach(line=>line.visible=orbitVisible);$('#orbitToggle').classList.toggle('active',orbitVisible);$('#orbitToggle').textContent='Orbits '+(orbitVisible?'ON':'OFF');$('#orbitToggle').setAttribute('aria-pressed',String(orbitVisible));});
$('#starToggle').addEventListener('click',()=>{starsVisible=!starsVisible;if(starField)starField.visible=starsVisible;$('#starToggle').classList.toggle('active',starsVisible);$('#starToggle').textContent='Stars '+(starsVisible?'ON':'OFF');$('#starToggle').setAttribute('aria-pressed',String(starsVisible));});
$('#beltToggle').addEventListener('click',()=>{beltVisible=!beltVisible;if(asteroidField)asteroidField.visible=beltVisible;$('#beltToggle').classList.toggle('active',beltVisible);$('#beltToggle').textContent='Asteroid belt '+(beltVisible?'ON':'OFF');$('#beltToggle').setAttribute('aria-pressed',String(beltVisible));});
$('#timeSpeed').addEventListener('input',event=>{timeSpeed=Number(event.target.value);$('#speedLabel').textContent=timeSpeed.toFixed(1)+'×';});
function updateClock(){const now=new Date();$('#utcClock').textContent=now.toISOString().slice(11,16)+' UTC';}
updateClock();setInterval(updateClock,30000);

try{
 initScene();renderSelectors();renderGuide();renderComparison();selectObject('earth');
 $('#sceneLoading').classList.add('hidden');
}catch(error){
 console.error('Solar System Explorer failed to initialize:',error);
 $('#sceneLoading').textContent='3D VIEW UNAVAILABLE — Planet guide and comparison remain available.';
 $('#sceneLoading').classList.remove('hidden');
 renderSelectors();renderGuide();renderComparison();selectObject('earth');
}
