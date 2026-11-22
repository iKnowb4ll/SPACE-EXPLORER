import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const PLANETS = [
  {name:'Mercury',type:'TERRESTRIAL PLANET',color:0xaaa69f,size:0.48,orbit:5.3,speed:0.82,distance:'57.9 million km',year:'88 Earth days',day:'58.6 Earth days',moons:'0',tag:'THE SWIFT PLANET',description:'A small, crater-covered world racing around the Sun faster than any other planet.',symbol:'☿',roughness:.95},
  {name:'Venus',type:'TERRESTRIAL PLANET',color:0xd9ad78,size:0.78,orbit:7.3,speed:0.59,distance:'108.2 million km',year:'225 Earth days',day:'243 Earth days',moons:'0',tag:'THE VEILED PLANET',description:'A brilliant world wrapped in dense clouds, with a surface hot enough to melt lead.',symbol:'♀',roughness:.9},
  {name:'Earth',type:'TERRESTRIAL PLANET',color:0x397ed0,size:0.84,orbit:9.6,speed:0.48,distance:'149.6 million km',year:'365.25 days',day:'23h 56m',moons:'1',tag:'THE BLUE MARBLE',description:'Our pale blue home, and the only world known to support life.',symbol:'⊕',roughness:.75},
  {name:'Mars',type:'TERRESTRIAL PLANET',color:0xc66b4d,size:0.65,orbit:12,speed:0.39,distance:'227.9 million km',year:'687 Earth days',day:'24h 37m',moons:'2',tag:'THE RED PLANET',description:'A cold desert world with ancient river valleys, towering volcanoes, and two tiny moons.',symbol:'♂',roughness:.95},
  {name:'Jupiter',type:'GAS GIANT',color:0xc7a47f,size:1.72,orbit:16.2,speed:0.21,distance:'778.6 million km',year:'11.86 Earth years',day:'9h 56m',moons:'95 confirmed',tag:'KING OF THE PLANETS',description:'A giant world of swirling clouds, powerful storms, and a famous Great Red Spot.',symbol:'♃',roughness:.8},
  {name:'Saturn',type:'GAS GIANT',color:0xd6c39a,size:1.48,orbit:20.8,speed:0.15,distance:'1.43 billion km',year:'29.4 Earth years',day:'10h 42m',moons:'146 confirmed',tag:'THE RINGED PLANET',description:'A magnificent gas giant surrounded by a broad system of icy rings.',symbol:'♄',roughness:.8},
  {name:'Uranus',type:'ICE GIANT',color:0x80cbd1,size:1.12,orbit:25.2,speed:0.105,distance:'2.87 billion km',year:'84 Earth years',day:'17h 14m',moons:'28 confirmed',tag:'THE SIDEWAYS PLANET',description:'An icy blue world that spins almost on its side, creating extreme seasons.',symbol:'♅',roughness:.7},
  {name:'Neptune',type:'ICE GIANT',color:0x4169ce,size:1.08,orbit:29.4,speed:0.082,distance:'4.50 billion km',year:'164.8 Earth years',day:'16h 6m',moons:'16 confirmed',tag:'THE WINDY PLANET',description:'A distant deep-blue planet swept by some of the fastest winds in the Solar System.',symbol:'♆',roughness:.7}
];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050816);
scene.fog = new THREE.FogExp2(0x050816, 0.0028);
const camera = new THREE.PerspectiveCamera(48, innerWidth/innerHeight, 0.1, 500);
camera.position.set(0, 28, 48);
const renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
document.querySelector('#scene').appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = .045;
controls.minDistance = 8;
controls.maxDistance = 95;
controls.maxPolarAngle = Math.PI*.48;
controls.target.set(0,0,0);

scene.add(new THREE.AmbientLight(0x8ca9df,.55));
const sunLight = new THREE.PointLight(0xffd6a0,170,180,1.25);
sunLight.position.set(0,0,0);
scene.add(sunLight);

function makeStars(){
  const count=3200, positions=new Float32Array(count*3), colors=new Float32Array(count*3);
  for(let i=0;i<count;i++){
    const radius=THREE.MathUtils.randFloat(65,180), theta=Math.random()*Math.PI*2, phi=Math.acos(THREE.MathUtils.randFloatSpread(2));
    positions[i*3]=radius*Math.sin(phi)*Math.cos(theta);
    positions[i*3+1]=radius*Math.cos(phi);
    positions[i*3+2]=radius*Math.sin(phi)*Math.sin(theta);
    const tint=THREE.MathUtils.randFloat(.65,1);
    colors[i*3]=tint*.78; colors[i*3+1]=tint*.88; colors[i*3+2]=tint;
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  const mat=new THREE.PointsMaterial({size:.28,vertexColors:true,transparent:true,opacity:.9,sizeAttenuation:true});
  scene.add(new THREE.Points(geo,mat));
}
makeStars();

const sun=new THREE.Mesh(new THREE.SphereGeometry(2.25,64,64),new THREE.MeshBasicMaterial({color:0xffc46b}));
scene.add(sun);
const sunGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:createGlow(),color:0xffa544,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
sunGlow.scale.set(15,15,1);scene.add(sunGlow);
function createGlow(){
  const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');
  const g=ctx.createRadialGradient(64,64,2,64,64,64);g.addColorStop(0,'rgba(255,218,145,0.9)');g.addColorStop(.18,'rgba(255,159,65,0.38)');g.addColorStop(1,'rgba(255,120,30,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,128,128);const tex=new THREE.CanvasTexture(c);return tex;
}

function createPlanetTexture(base,index){
  const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');
  ctx.fillStyle='#'+base.toString(16).padStart(6,'0');ctx.fillRect(0,0,512,256);
  for(let i=0;i<95;i++){
    const y=Math.random()*256,h=THREE.MathUtils.randFloat(1,12),alpha=THREE.MathUtils.randFloat(.025,.16);
    ctx.fillStyle=i%2?'rgba(255,255,255,'+alpha+')':'rgba(15,20,35,'+alpha+')';
    if(index===4||index===5){ctx.fillRect(0,y,512,h);}
    else{ctx.beginPath();ctx.ellipse(Math.random()*512,y,THREE.MathUtils.randFloat(8,70),h,0,0,Math.PI*2);ctx.fill();}
  }
  if(index===2){
    ctx.fillStyle='rgba(70,170,105,.8)';
    for(let i=0;i<28;i++){ctx.beginPath();ctx.ellipse(Math.random()*512,Math.random()*256,THREE.MathUtils.randFloat(5,28),THREE.MathUtils.randFloat(3,15),Math.random()*3,0,Math.PI*2);ctx.fill();}
  }
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;return tex;
}

const planetMeshes=[];
const orbitGroups=[];
PLANETS.forEach((p,i)=>{
  const orbit=new THREE.Group();scene.add(orbit);orbitGroups.push(orbit);
  const geo=new THREE.SphereGeometry(p.size,48,48);
  const mat=new THREE.MeshStandardMaterial({map:createPlanetTexture(p.color,i),roughness:p.roughness,metalness:0});
  const mesh=new THREE.Mesh(geo,mat);mesh.position.x=p.orbit;mesh.rotation.z=i===6?-.7:0;orbit.add(mesh);
  mesh.userData.planetIndex=i;planetMeshes.push(mesh);
  const ringGeo=new THREE.BufferGeometry();const pts=[];
  for(let j=0;j<=256;j++){const a=j/256*Math.PI*2;pts.push(Math.cos(a)*p.orbit,0,Math.sin(a)*p.orbit);}
  ringGeo.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
  const ring=new THREE.LineLoop(ringGeo,new THREE.LineBasicMaterial({color:0x304363,transparent:true,opacity:.48}));
  scene.add(ring);
  if(i===5){
    const ringMesh=new THREE.Mesh(new THREE.RingGeometry(p.size*1.35,p.size*2.15,96),new THREE.MeshBasicMaterial({color:0xc7b58f,side:THREE.DoubleSide,transparent:true,opacity:.68}));
    ringMesh.rotation.x=Math.PI/2.35;mesh.add(ringMesh);
    const ring2=new THREE.Mesh(new THREE.RingGeometry(p.size*1.48,p.size*1.72,96),new THREE.MeshBasicMaterial({color:0x786e5d,side:THREE.DoubleSide,transparent:true,opacity:.55}));
    ring2.rotation.x=Math.PI/2.35;mesh.add(ring2);
  }
  if(i===2){
    const moon=new THREE.Mesh(new THREE.SphereGeometry(.19,20,20),new THREE.MeshStandardMaterial({color:0xd5d4cb}));
    moon.position.set(1.5,.12,0);mesh.add(moon);mesh.userData.moon=moon;
  }
});

const raycaster=new THREE.Raycaster(), pointer=new THREE.Vector2();
let selected=2, paused=false, elapsed=0, focused=false;
const list=document.querySelector('#planetList');
PLANETS.forEach((p,i)=>{
  const button=document.createElement('button');button.className='planet-choice'+(i===selected?' active':'');
  button.innerHTML='<span class="dot" style="background:#'+p.color.toString(16).padStart(6,'0')+';color:#'+p.color.toString(16).padStart(6,'0')+'"></span>'+p.name;
  button.addEventListener('click',()=>selectPlanet(i,true));list.appendChild(button);
});

function selectPlanet(i,moveCamera=false){
  selected=i;const p=PLANETS[i];
  document.querySelectorAll('.planet-choice').forEach((b,j)=>b.classList.toggle('active',j===i));
  document.querySelector('#planetIndex').textContent='PLANET '+String(i+1).padStart(2,'0')+' / 08';
  document.querySelector('#planetType').textContent=p.type;
  document.querySelector('#planetName').textContent=p.name;
  document.querySelector('#planetSymbol').textContent=p.symbol;
  document.querySelector('#planetDescription').textContent=p.description;
  document.querySelector('#distance').textContent=p.distance;
  document.querySelector('#year').textContent=p.year;
  document.querySelector('#day').textContent=p.day;
  document.querySelector('#moons').textContent=p.moons;
  document.querySelector('#planetTagline').textContent=p.tag;
  document.querySelector('#planetColor').style.background='#'+p.color.toString(16).padStart(6,'0');
  document.querySelector('#sceneLabel').textContent='DESTINATION // '+p.name.toUpperCase();
  if(moveCamera)focusPlanet(i);
}
function focusPlanet(i){
  const mesh=planetMeshes[i];const target=mesh.getWorldPosition(new THREE.Vector3());
  const direction=new THREE.Vector3().subVectors(camera.position,controls.target).normalize();
  const distance=Math.max(7,PLANETS[i].size*5.5);
  const destination=target.clone().add(direction.multiplyScalar(distance));
  animateCamera(destination,target);
}
let cameraTween=null;
function animateCamera(position,target){cameraTween={from:camera.position.clone(),to:position,fromTarget:controls.target.clone(),toTarget:target.clone(),start:performance.now(),duration:1100};}
document.querySelector('#focusButton').addEventListener('click',()=>focusPlanet(selected));
document.querySelector('#homeButton').addEventListener('click',e=>{e.preventDefault();selected=2;selectPlanet(2);animateCamera(new THREE.Vector3(0,28,48),new THREE.Vector3(0,0,0));});
document.querySelector('#pauseButton').addEventListener('click',()=>{
  paused=!paused;document.querySelector('#pauseIcon').textContent=paused?'▶':'Ⅱ';document.querySelector('#pauseText').textContent=paused?'RESUME ORBITS':'PAUSE ORBITS';
});
document.querySelector('#resetButton').addEventListener('click',()=>{selectPlanet(2);animateCamera(new THREE.Vector3(0,28,48),new THREE.Vector3(0,0,0));});
document.querySelector('#fullscreenButton').addEventListener('click',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.();});
document.querySelector('#soundButton').addEventListener('click',()=>{const b=document.querySelector('#soundButton');b.textContent=b.textContent==='♫'?'♪':'♫';b.title='Ambient sound is not enabled in this version';});

renderer.domElement.addEventListener('pointerdown',e=>{pointer.x=(e.clientX/innerWidth)*2-1;pointer.y=-(e.clientY/innerHeight)*2+1;raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(planetMeshes);if(hits.length)selectPlanet(hits[0].object.userData.planetIndex,true);});
function updateClock(){const d=new Date();document.querySelector('#clock').textContent=d.toISOString().slice(11,19)+' UTC';}
function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));}
window.addEventListener('resize',resize);

function animate(now){
  requestAnimationFrame(animate);
  const dt=Math.min(.05,(now-(animate.last||now))/1000);animate.last=now;
  if(!paused){elapsed+=dt;planetMeshes.forEach((m,i)=>{orbitGroups[i].rotation.y=elapsed*PLANETS[i].speed*.075;m.rotation.y+=dt*(i===0?.16:.08);if(m.userData.moon)m.userData.moon.position.set(Math.cos(elapsed*1.4)*1.5,.12,Math.sin(elapsed*1.4)*1.5);});}
  sun.rotation.y+=dt*.035;sunGlow.position.copy(sun.position);
  if(cameraTween){const t=Math.min(1,(now-cameraTween.start)/cameraTween.duration),e=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;camera.position.lerpVectors(cameraTween.from,cameraTween.to,e);controls.target.lerpVectors(cameraTween.fromTarget,cameraTween.toTarget,e);if(t>=1)cameraTween=null;}
  controls.update();renderer.render(scene,camera);
}
selectPlanet(2);updateClock();setInterval(updateClock,1000);requestAnimationFrame(animate);
document.querySelector('#loading').classList.add('hidden');
setTimeout(()=>document.querySelector('#loading').remove(),800);