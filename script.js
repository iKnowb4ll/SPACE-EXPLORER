import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const objects=[
{name:'Sun',kind:'Star',color:0xffb45e,size:2.1,orbit:0,desc:'The star at the center of our Solar System. Its gravity holds the planetary system together.',distance:'0 km',fact:'About 4.6 billion years old',tag:'G-type main-sequence star'},
{name:'Mercury',kind:'Planet',color:0xaaa69f,size:.48,orbit:5.3,desc:'A small, crater-covered world racing around the Sun faster than any other planet.',distance:'57.9 million km',fact:'88 Earth-day year',tag:'Terrestrial planet'},
{name:'Venus',kind:'Planet',color:0xd9ad78,size:.78,orbit:7.3,desc:'A brilliant world wrapped in dense clouds, with a surface hot enough to melt lead.',distance:'108.2 million km',fact:'Surface about 465°C',tag:'Terrestrial planet'},
{name:'Earth',kind:'Planet',color:0x397ed0,size:.84,orbit:9.6,desc:'Our pale blue home, and the only world currently known to support life.',distance:'149.6 million km',fact:'One natural moon',tag:'Terrestrial planet'},
{name:'Mars',kind:'Planet',color:0xc66b4d,size:.65,orbit:12,desc:'A cold desert world with ancient river valleys, towering volcanoes, and two tiny moons.',distance:'227.9 million km',fact:'Home to Olympus Mons',tag:'Terrestrial planet'},
{name:'Jupiter',kind:'Planet',color:0xc7a47f,size:1.72,orbit:16.2,desc:'The largest planet, with swirling cloud bands and a long-lived storm called the Great Red Spot.',distance:'778.6 million km',fact:'At least 95 confirmed moons',tag:'Gas giant'},
{name:'Saturn',kind:'Planet',color:0xd6c39a,size:1.48,orbit:20.8,desc:'A gas giant surrounded by a spectacular system of icy rings.',distance:'1.43 billion km',fact:'Famous for its rings',tag:'Gas giant'},
{name:'Uranus',kind:'Planet',color:0x80cbd1,size:1.12,orbit:25.2,desc:'An ice giant that rotates on its side, giving it extreme seasonal changes.',distance:'2.87 billion km',fact:'84 Earth-year orbit',tag:'Ice giant'},
{name:'Neptune',kind:'Planet',color:0x4169ce,size:1.08,orbit:29.4,desc:'A distant blue ice giant swept by supersonic winds.',distance:'4.50 billion km',fact:'164.8 Earth-year orbit',tag:'Ice giant'},
{name:'Moon',kind:'Moon',color:0xb9bec8,size:.23,orbit:0,desc:'Earth’s only natural satellite. Its changing phases have shaped calendars and skywatching for millennia.',distance:'384,400 km from Earth',fact:'Tidally locked to Earth',tag:'Natural satellite'},
{name:'Phobos',kind:'Moon',color:0x8a8179,size:.16,orbit:0,desc:'The larger and closer of Mars’s two small, irregular moons.',distance:'9,376 km from Mars',fact:'Orbits Mars in about 7.7 hours',tag:'Martian moon'},
{name:'Europa',kind:'Moon',color:0xc7b99b,size:.27,orbit:0,desc:'Jupiter’s icy moon. Scientists study its hidden ocean as a possible environment for life.',distance:'671,000 km from Jupiter',fact:'Likely subsurface ocean',tag:'Jovian moon'},
{name:'Titan',kind:'Moon',color:0xd39a55,size:.34,orbit:0,desc:'Saturn’s largest moon, with a thick atmosphere and lakes of liquid hydrocarbons.',distance:'1.22 million km from Saturn',fact:'Dense nitrogen atmosphere',tag:'Saturnian moon'},
{name:'Ganymede',kind:'Moon',color:0x9e9c91,size:.37,orbit:0,desc:'The largest moon in the Solar System, even larger than the planet Mercury.',distance:'1.07 million km from Jupiter',fact:'Has its own magnetic field',tag:'Jovian moon'},
{name:'Pluto',kind:'Dwarf planet',color:0xb59b8d,size:.35,orbit:34,desc:'A distant icy dwarf planet in the Kuiper Belt, visited by NASA’s New Horizons spacecraft.',distance:'About 5.9 billion km',fact:'One of several known dwarf planets',tag:'Kuiper Belt object'},
{name:'Ceres',kind:'Dwarf planet',color:0x99958e,size:.31,orbit:14,desc:'The largest object in the asteroid belt between Mars and Jupiter.',distance:'About 414 million km',fact:'Visited by NASA’s Dawn mission',tag:'Asteroid-belt dwarf planet'},
{name:'Halley’s Comet',kind:'Comet',color:0xb9d9e8,size:.28,orbit:0,desc:'A famous periodic comet that returns to the inner Solar System about every 76 years.',distance:'Varies along its orbit',fact:'Last appeared in 1986',tag:'Periodic comet'},
{name:'Asteroid Vesta',kind:'Asteroid',color:0xb1a99c,size:.25,orbit:0,desc:'One of the largest objects in the asteroid belt, explored by NASA’s Dawn mission.',distance:'About 326 million km',fact:'A differentiated protoplanet',tag:'Asteroid'},
{name:'Sagittarius A*',kind:'Black hole',color:0x9e78ff,size:1.3,orbit:0,desc:'The supermassive black hole at the center of the Milky Way galaxy.',distance:'About 26,000 light-years from Earth',fact:'About 4 million solar masses',tag:'Supermassive black hole'},
{name:'M87*',kind:'Black hole',color:0xff8e62,size:1.55,orbit:0,desc:'A supermassive black hole in the galaxy Messier 87, famously imaged by the Event Horizon Telescope.',distance:'About 55 million light-years',fact:'First black hole imaged by EHT',tag:'Supermassive black hole'},
{name:'Andromeda Galaxy',kind:'Galaxy',color:0x88aaff,size:2.6,orbit:0,desc:'The large spiral galaxy nearest to the Milky Way. It is approaching our galaxy.',distance:'About 2.5 million light-years',fact:'Contains roughly a trillion stars',tag:'Spiral galaxy'},
{name:'Pleiades',kind:'Star cluster',color:0x9ecbff,size:.9,orbit:0,desc:'A bright open star cluster also known as the Seven Sisters, visible to the naked eye.',distance:'About 440 light-years',fact:'Young open star cluster',tag:'Open star cluster'},
{name:'Orion Nebula',kind:'Nebula',color:0xff9fc8,size:1.4,orbit:0,desc:'A nearby stellar nursery where new stars are forming inside clouds of gas and dust.',distance:'About 1,344 light-years',fact:'Visible as a fuzzy patch in Orion',tag:'Emission nebula'}
];
const facts=['A day on Venus is longer than its year.','Jupiter’s Great Red Spot is a gigantic storm that has persisted for centuries.','Saturn is less dense than water on average, although there is no ocean large enough to hold it.','The footprints left on the Moon can remain for a very long time because there is no wind or rain.','Neutron stars are so dense that a small amount of their material would have an enormous mass.','The Milky Way is one of billions of galaxies in the observable universe.','Light from the Sun takes about eight minutes to reach Earth.','Uranus rotates on its side compared with most planets.','The largest volcano known in the Solar System is Olympus Mons on Mars.','Some comets develop long tails when solar heating releases gas and dust.'];
const questions=[
['Which planet is known as the Red Planet?',['Venus','Mars','Mercury','Neptune'],1,'Mars looks reddish because iron minerals in its soil have oxidized.'],
['Which planet has the most prominent ring system?',['Earth','Jupiter','Saturn','Mars'],2,'Saturn’s bright rings are made mostly of countless pieces of ice and rock.'],
['What is the name of the galaxy that contains our Solar System?',['Andromeda','Whirlpool','Milky Way','Sombrero'],2,'Our Solar System is located in the Milky Way galaxy.'],
['Which is the largest planet in our Solar System?',['Saturn','Jupiter','Neptune','Earth'],1,'Jupiter is the largest planet by both diameter and mass.'],
['What is the Sun?',['A planet','A moon','A star','A comet'],2,'The Sun is a G-type main-sequence star.'],
['Which planet rotates almost on its side?',['Uranus','Mars','Venus','Mercury'],0,'Uranus has an extreme axial tilt of about 98 degrees.'],
['What is the name of Earth’s natural satellite?',['Europa','Titan','Phobos','The Moon'],3,'The Moon is Earth’s only natural satellite.'],
['Which object is at the center of the Milky Way?',['A supermassive black hole','A neutron star','The Sun','A planet'],0,'The Milky Way’s center contains the supermassive black hole Sagittarius A*.'],
['Which planet is farthest from the Sun among the eight planets?',['Uranus','Saturn','Neptune','Jupiter'],2,'Neptune is the eighth and most distant recognized planet.'],
['What do we call a cloud of gas and dust in space?',['Nebula','Asteroid','Pulsar','Meteorite'],0,'Nebulae are interstellar clouds of gas and dust.']
];
const constellations=[
{name:'Orion',season:'Northern winter',story:'One of the most recognizable constellations, marked by the three bright stars of Orion’s Belt. It includes the red supergiant Betelgeuse and the blue-white Rigel.',stars:[[18,35],[39,42],[60,35],[30,65],[48,68],[67,62],[33,18],[63,18]],lines:[[0,1],[1,2],[0,3],[3,4],[4,5],[2,5],[0,6],[2,7]]},
{name:'Ursa Major',season:'Northern spring',story:'The Great Bear contains the familiar Big Dipper asterism. The two stars at the end of its bowl point toward Polaris.',stars:[[12,32],[28,43],[45,37],[62,52],[78,62],[83,34],[60,18]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,2]]},
{name:'Cassiopeia',season:'Northern autumn',story:'A distinctive W-shaped constellation named for a queen in Greek mythology. It lies in a rich region of the Milky Way.',stars:[[10,28],[29,65],[49,26],[69,67],[88,31]],lines:[[0,1],[1,2],[2,3],[3,4]]},
{name:'Scorpius',season:'Northern summer',story:'A curved constellation representing a scorpion. Its bright reddish star Antares marks the heart of the scorpion.',stars:[[12,24],[28,33],[45,47],[57,62],[72,55],[80,36],[88,20],[60,20]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[4,7]]},
{name:'Leo',season:'Northern spring',story:'The Lion features a sickle-shaped pattern of stars often imagined as a backwards question mark. Regulus marks its heart.',stars:[[18,60],[30,40],[48,28],[58,42],[48,62],[70,66],[83,48]],lines:[[0,1],[1,2],[2,3],[3,4],[4,1],[4,5],[5,6]]},
{name:'Crux',season:'Southern autumn',story:'The Southern Cross is a compact constellation that helps observers locate the south celestial pole.',stars:[[50,10],[50,88],[18,50],[82,50],[63,38]],lines:[[0,1],[2,3],[4,1]]}
];
const $=s=>document.querySelector(s);
const safeStore={get(){try{return JSON.parse(localStorage.getItem('spaceExplorerFavorites')||'[]')}catch{return[]}},set(v){try{localStorage.setItem('spaceExplorerFavorites',JSON.stringify(v))}catch{}}};
let favorites=safeStore.get(),selectedName='Earth',selectedIndex=3,paused=false,travelTarget='Earth',quizIndex=0,quizScore=0,answered=false,currentFilter='All';
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2200)}
function showView(name){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id==='view-'+name));document.querySelectorAll('.nav-item').forEach(v=>v.classList.toggle('active',v.dataset.view===name));$('#sidebar').classList.remove('open');if(name==='favorites')renderFavorites();if(name==='galaxy'||name==='travel')setTimeout(()=>{if(renderer)resize3D()},80)}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();showView(b.dataset.view)}));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.go)));
$('#menuToggle').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
function clock(){const d=new Date();$('#utcClock').textContent=d.toISOString().slice(11,19)+' UTC';$('#missionDate').textContent=d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
clock();setInterval(clock,1000);
function randomFact(){const f=facts[Math.floor(Math.random()*facts.length)];$('#dailyFact').textContent=f}
$('#newFact').addEventListener('click',randomFact);randomFact();

let scene,camera,renderer,controls,planetMeshes=[],orbitGroups=[],raycaster,mouse,clock3d,cameraTween=null,selectedMesh=null;
function textureFor(color,index){const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#'+color.toString(16).padStart(6,'0');ctx.fillRect(0,0,512,256);for(let i=0;i<170;i++){const y=Math.random()*256,h=THREE.MathUtils.randFloat(1,10),a=THREE.MathUtils.randFloat(.025,.18);ctx.fillStyle=i%2?'rgba(255,255,255,'+a+')':'rgba(10,15,30,'+a+')';if([5,6,7,8].includes(index))ctx.fillRect(0,y,512,h);else{ctx.beginPath();ctx.ellipse(Math.random()*512,y,THREE.MathUtils.randFloat(5,45),h,Math.random(),0,Math.PI*2);ctx.fill()}}if(index===3){ctx.fillStyle='rgba(66,160,105,.85)';for(let i=0;i<40;i++){ctx.beginPath();ctx.ellipse(Math.random()*512,Math.random()*256,Math.random()*22+4,Math.random()*10+2,Math.random()*3,0,Math.PI*2);ctx.fill()}}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
function init3D(){
 const host=$('.sim-stage');
 scene=new THREE.Scene();
 scene.background=new THREE.Color(0x050816);
 camera=new THREE.PerspectiveCamera(48,host.clientWidth/Math.max(1,host.clientHeight),.1,900);
 camera.position.set(0,25,47);
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));
 renderer.setSize(host.clientWidth,host.clientHeight);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.domElement.style.position='absolute';
 renderer.domElement.style.inset='0';
 renderer.domElement.style.zIndex='1';
 host.appendChild(renderer.domElement);
 controls=new OrbitControls(camera,renderer.domElement);
 controls.enableDamping=true;controls.dampingFactor=.05;
 controls.minDistance=5;controls.maxDistance=220;
 controls.maxPolarAngle=Math.PI*.49;
 scene.add(new THREE.AmbientLight(0x91b5ec,.8));
 scene.add(new THREE.PointLight(0xffd6a0,210,200,1.3));
 const starGeo=new THREE.BufferGeometry(),pos=new Float32Array(5200*3);
 for(let i=0;i<5200;i++){const r=THREE.MathUtils.randFloat(65,240),a=Math.random()*Math.PI*2,z=THREE.MathUtils.randFloatSpread(2),q=Math.sqrt(1-z*z);pos.set([r*q*Math.cos(a),r*z,r*q*Math.sin(a)],i*3)}
 starGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
 scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xc6ddff,size:.32,transparent:true,opacity:.9})));
 const sun=new THREE.Mesh(new THREE.SphereGeometry(2.1,48,48),new THREE.MeshBasicMaterial({color:0xffbc65}));
 sun.userData.objectIndex=0;scene.add(sun);planetMeshes.push(sun);
 scene.add(new THREE.PointLight(0xffa64d,70,40));
 const displayPositions={
  'Moon':[-8,1,5],'Phobos':[-11,-1,5],'Europa':[-14,2,5],'Titan':[-17,-2,5],'Ganymede':[-20,1,5],
  'Halley’s Comet':[-8,4,-8],'Asteroid Vesta':[-12,-3,-8],
  'Sagittarius A*':[-16,3,-12],'M87*':[-23,-2,-12],
  'Andromeda Galaxy':[13,3,-15],'Pleiades':[19,1,-12],'Orion Nebula':[25,-2,-10]
 };
 objects.forEach((o,i)=>{
  if(i===0)return;
  const group=new THREE.Group();
  const orbital=o.orbit>0;
  if(orbital){group.position.set(0,0,0);orbitGroups.push(group)}
  else {const p=displayPositions[o.name]||[30+i,0,-10];group.position.set(p[0],p[1],p[2])}
  scene.add(group);
  const material=new THREE.MeshStandardMaterial({map:textureFor(o.color,i),roughness:.82,metalness:.02});
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(o.size,48,48),material);
  if(orbital)mesh.position.x=o.orbit;
  mesh.userData.objectIndex=i;group.add(mesh);planetMeshes.push(mesh);
  if(o.name==='Saturn'){
   const ring=new THREE.Mesh(new THREE.RingGeometry(o.size*1.35,o.size*2.1,96),new THREE.MeshBasicMaterial({color:0xc8b58e,side:THREE.DoubleSide,transparent:true,opacity:.72}));
   ring.rotation.x=Math.PI/2.3;mesh.add(ring);
  }
  if(o.kind==='Black hole'){
   mesh.material=new THREE.MeshBasicMaterial({color:0x010106});
   const disk=new THREE.Mesh(new THREE.TorusGeometry(o.size*1.65,o.size*.42,16,120),new THREE.MeshBasicMaterial({color:o.color,side:THREE.DoubleSide,transparent:true,opacity:.88}));
   disk.rotation.x=.28;group.add(disk);
   const outer=new THREE.Mesh(new THREE.TorusGeometry(o.size*2.05,.07,8,120),new THREE.MeshBasicMaterial({color:0xffbd83,transparent:true,opacity:.72}));
   outer.rotation.x=.28;group.add(outer);
  }
  if(o.kind==='Galaxy'||o.kind==='Nebula'){
   const halo=new THREE.Mesh(new THREE.SphereGeometry(o.size*1.55,32,32),new THREE.MeshBasicMaterial({color:o.color,transparent:true,opacity:.12,side:THREE.BackSide}));
   group.add(halo);
   const swirl=new THREE.Mesh(new THREE.TorusGeometry(o.size*1.25,.045,6,100),new THREE.MeshBasicMaterial({color:o.color,transparent:true,opacity:.6}));
   swirl.rotation.x=.7;group.add(swirl);
  }
  if(o.kind==='Star cluster'){
   const starPositions=[];
   for(let n=0;n<90;n++){const radius=THREE.MathUtils.randFloat(.3,2.8),a=Math.random()*Math.PI*2,z=THREE.MathUtils.randFloatSpread(1);starPositions.push(Math.cos(a)*radius,z*radius*.45,Math.sin(a)*radius)}
   const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(starPositions,3));
   group.add(new THREE.Points(geo,new THREE.PointsMaterial({color:0xc9e6ff,size:.11, sizeAttenuation:true})));
  }
  if(orbital){
   const pts=[];for(let j=0;j<200;j++){const a=j/200*Math.PI*2;pts.push(Math.cos(a)*o.orbit,0,Math.sin(a)*o.orbit)}
   const g=new THREE.BufferGeometry().setFromPoints(pts);
   scene.add(new THREE.LineLoop(g,new THREE.LineBasicMaterial({color:0x294363,transparent:true,opacity:.45})));
  }
 });
 raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();
 renderer.domElement.addEventListener('click',e=>{
  const rect=renderer.domElement.getBoundingClientRect();
  mouse.x=((e.clientX-rect.left)/rect.width)*2-1;
  mouse.y=-((e.clientY-rect.top)/rect.height)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const hit=raycaster.intersectObjects(planetMeshes);
  if(hit.length){const o=objects[hit[0].object.userData.objectIndex];if(o)selectObject(o.name,true)}
 });
 window.addEventListener('resize',resize3D);
 animate3D();
}
function resize3D(){if(!camera||!renderer)return;const host=$('.sim-stage');camera.aspect=host.clientWidth/Math.max(1,host.clientHeight);camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)}
function animate3D(now=0){requestAnimationFrame(animate3D);if(!renderer)return;const dt=Math.min(.05,(now-(animate3D.last||now))/1000);animate3D.last=now;if(!paused){orbitGroups.forEach((g,i)=>g.rotation.y+=dt*(.008/(1+i*.23)));planetMeshes.forEach(m=>m.rotation.y+=dt*.09)}if(cameraTween){const t=Math.min(1,(now-cameraTween.start)/900),e=1-Math.pow(1-t,3);camera.position.lerpVectors(cameraTween.from,cameraTween.to,e);controls.target.lerpVectors(cameraTween.fromTarget,cameraTween.toTarget,e);if(t>=1)cameraTween=null}controls.update();renderer.render(scene,camera)}
function focusObject(name){const o=objects.find(x=>x.name===name);if(!o||!camera)return;const mesh=planetMeshes.find(m=>objects[m.userData.objectIndex]?.name===name);const target=mesh?mesh.getWorldPosition(new THREE.Vector3()):new THREE.Vector3();const dir=new THREE.Vector3().subVectors(camera.position,controls.target).normalize();cameraTween={from:camera.position.clone(),to:target.clone().add(dir.multiplyScalar(Math.max(7,o.size*5))),fromTarget:controls.target.clone(),toTarget:target,start:performance.now()}}
function selectObject(name,focus=false){const o=objects.find(x=>x.name===name);if(!o)return;selectedName=name;selectedIndex=objects.indexOf(o);$('#objectName').textContent=o.name;$('#objectDesc').textContent=o.desc;$('#objectFacts').innerHTML='<div><span>CLASSIFICATION</span><b>'+o.kind+'</b></div><div><span>DISTANCE</span><b>'+o.distance+'</b></div><div><span>QUICK FACT</span><b>'+o.fact+'</b></div>';$('#favoriteSelected').textContent=favorites.includes(name)?'♥ SAVED TO FAVORITES':'♡ SAVE TO FAVORITES';document.querySelectorAll('.object-chip').forEach(b=>b.classList.toggle('active',b.dataset.name===name));if(focus)focusObject(name)}
function renderObjectChips(){const el=$('#objectChips');el.innerHTML='';objects.forEach(o=>{const b=document.createElement('button');b.className='object-chip';b.dataset.name=o.name;b.textContent=o.name;b.addEventListener('click',()=>selectObject(o.name,true));el.appendChild(b)})}
function renderTravelChoices(){const el=$('#travelChoices');objects.filter(o=>['Planet','Dwarf planet','Moon','Black hole','Galaxy','Nebula'].includes(o.kind)).forEach(o=>{const b=document.createElement('button');b.className='travel-choice'+(o.name===travelTarget?' active':'');b.innerHTML='<i style="background:#'+o.color.toString(16).padStart(6,'0')+'"></i>'+o.name;b.addEventListener('click',()=>{travelTarget=o.name;renderTravelChoices();$('#travelStatus').textContent='DESTINATION LOCKED';$('#travelDistance').textContent='DESTINATION: '+o.name.toUpperCase()});el.appendChild(b)})}
$('#launchTravel').addEventListener('click',()=>{const o=objects.find(x=>x.name===travelTarget);if(!o)return;showView('galaxy');selectObject(o.name,true);$('#travelStatus').textContent='JOURNEY INITIATED';$('#travelMessage').textContent='ARRIVING AT '+o.name.toUpperCase();toast('Navigation set: '+o.name)});
$('#travelSelected').addEventListener('click',()=>{travelTarget=selectedName;showView('travel');renderTravelChoices();$('#travelStatus').textContent='DESTINATION LOCKED';$('#travelDistance').textContent='DESTINATION: '+travelTarget.toUpperCase()});
$('#favoriteSelected').addEventListener('click',()=>toggleFavorite(selectedName));
$('#pauseOrbits').addEventListener('click',()=>{paused=!paused;$('#pauseOrbits').textContent=paused?'▶ RESUME':'Ⅱ PAUSE'});
$('#resetCamera').addEventListener('click',()=>{cameraTween={from:camera.position.clone(),to:new THREE.Vector3(0,25,47),fromTarget:controls.target.clone(),toTarget:new THREE.Vector3(),start:performance.now()};selectObject('Earth')});
function toggleFavorite(name){favorites=favorites.includes(name)?favorites.filter(x=>x!==name):[...favorites,name];safeStore.set(favorites);updateFavoriteCount();if(name===selectedName)$('#favoriteSelected').textContent=favorites.includes(name)?'♥ SAVED TO FAVORITES':'♡ SAVE TO FAVORITES';renderFavorites();toast(favorites.includes(name)?name+' saved':'Removed from favorites')}
function updateFavoriteCount(){$('#favoriteCount').textContent=favorites.length}
function entryCard(o){const saved=favorites.includes(o.name);const card=document.createElement('article');card.className='entry-card';card.innerHTML='<div class="entry-top"><span class="entry-kind">'+o.kind.toUpperCase()+'</span><button class="entry-save '+(saved?'saved':'')+'" aria-label="Save '+o.name+'">'+(saved?'♥':'♡')+'</button></div><h3>'+o.name+'</h3><p>'+o.desc+'</p><div class="entry-meta">'+o.tag+'</div>';card.querySelector('.entry-save').addEventListener('click',()=>{toggleFavorite(o.name);renderEncyclopedia();});card.addEventListener('click',e=>{if(e.target.closest('button'))return;showView('galaxy');selectObject(o.name,true)});return card}
function renderEncyclopedia(){const term=$('#encyclopediaSearch').value.trim().toLowerCase();const el=$('#encyclopediaGrid');el.innerHTML='';const data=objects.filter(o=>(currentFilter==='All'||(currentFilter==='Other'&&!['Planet','Moon','Dwarf planet','Star'].includes(o.kind))||o.kind===currentFilter)&&(!term||(o.name+' '+o.kind+' '+o.desc+' '+o.tag).toLowerCase().includes(term)));data.forEach(o=>el.appendChild(entryCard(o)));if(!data.length)el.innerHTML='<p class="muted">No objects found. Try another search.</p>'}
function renderFavorites(){const el=$('#favoritesGrid');el.innerHTML='';const data=objects.filter(o=>favorites.includes(o.name));data.forEach(o=>el.appendChild(entryCard(o)));$('#emptyFavorites').style.display=data.length?'none':'block'}
$('#encyclopediaSearch').addEventListener('input',renderEncyclopedia);document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{currentFilter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderEncyclopedia()}));
function renderQuiz(){answered=false;const q=questions[quizIndex];$('#quizProgress').textContent='QUESTION '+(quizIndex+1)+' / '+questions.length;$('#quizProgressBar').style.width=((quizIndex+1)/questions.length*100)+'%';$('#quizQuestion').textContent=q[0];$('#quizFeedback').textContent='';$('#quizScore').textContent='SCORE: '+quizScore;$('#nextQuestion').disabled=true;$('#nextQuestion').textContent=quizIndex===questions.length-1?'SEE RESULTS →':'NEXT QUESTION →';const el=$('#quizAnswers');el.innerHTML='';q[1].forEach((answer,i)=>{const b=document.createElement('button');b.className='quiz-answer';b.textContent=String.fromCharCode(65+i)+'. '+answer;b.addEventListener('click',()=>{if(answered)return;answered=true;const correct=i===q[2];if(correct)quizScore++;[...el.children].forEach((x,j)=>{x.disabled=true;if(j===q[2])x.classList.add('correct');if(j===i&&!correct)x.classList.add('wrong')});$('#quizFeedback').textContent=(correct?'CORRECT! ':'NOT QUITE. ')+q[3];$('#quizScore').textContent='SCORE: '+quizScore;$('#nextQuestion').disabled=false});el.appendChild(b)})}
$('#nextQuestion').addEventListener('click',()=>{if(!answered)return;if(quizIndex===questions.length-1){$('#quizQuestion').textContent='Mission complete! You scored '+quizScore+' out of '+questions.length+'.';$('#quizAnswers').innerHTML='';$('#quizFeedback').textContent=quizScore>=8?'Excellent cosmic knowledge!':'Great effort. Every explorer keeps learning.';$('#nextQuestion').textContent='PLAY AGAIN ↻';$('#nextQuestion').disabled=false;$('#nextQuestion').onclick=()=>{quizIndex=0;quizScore=0;$('#nextQuestion').onclick=null;renderQuiz()};return}quizIndex++;renderQuiz()});
function constellationSVG(c){const lines=c.lines.map(([a,b])=>'<line x1="'+c.stars[a][0]+'%" y1="'+c.stars[a][1]+'%" x2="'+c.stars[b][0]+'%" y2="'+c.stars[b][1]+'%"/>').join('');const stars=c.stars.map(([x,y])=>'<circle cx="'+x+'%" cy="'+y+'%" r="2.2"/>').join('');return '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><g stroke="#6b9fcb" stroke-width=".7" opacity=".7">'+lines+'</g><g fill="#dff6ff" style="filter:drop-shadow(0 0 3px #9bdfff)">'+stars+'</g></svg>'}
function renderConstellations(){$('#constellationGrid').innerHTML=constellations.map(c=>'<article class="constellation-card">'+constellationSVG(c)+'<h3>'+c.name+'</h3><small>BEST VIEWED: '+c.season.toUpperCase()+'</small><p>'+c.story+'</p></article>').join('')}
async async function loadGallery(query){const status=$('#galleryStatus'),grid=$('#galleryGrid');status.textContent='Searching NASA’s public media library...';grid.innerHTML='';try{const url='https://images-api.nasa.gov/search?q='+encodeURIComponent(query)+'&media_type=image&page_size=18';const response=await fetch(url);if(!response.ok)throw new Error('NASA image search unavailable');const data=await response.json();const items=(data.collection?.items||[]).filter(x=>x.links?.some(l=>l.render==='image')&&x.data?.[0]?.title);if(!items.length){status.textContent='No images found. Try a different search.';return}status.textContent='Showing '+items.length+' results from NASA’s public media library.';items.forEach(item=>{const d=item.data[0],link=item.links.find(l=>l.render==='image');const card=document.createElement('article');card.className='gallery-card';const img=document.createElement('img');img.loading='lazy';img.src=link.href;img.alt=d.title;const info=document.createElement('div');const title=document.createElement('b');title.textContent=d.title;const small=document.createElement('small');small.textContent=(d.date_created||'NASA image').slice(0,10)+' · NASA';info.append(title,small);card.append(img,info);grid.appendChild(card)})}catch(e){status.textContent='Could not load NASA images right now. Check your internet connection and try again.'}}
$('#gallerySearchButton').addEventListener('click',()=>loadGallery($('#gallerySearch').value.trim()||'space'));$('#gallerySearch').addEventListener('keydown',e=>{if(e.key==='Enter')loadGallery($('#gallerySearch').value.trim()||'space')});
async async function loadLiveSpaceData(){try{const r=await fetch('https://api.wheretheiss.at/v1/satellites/25544');if(!r.ok)throw new Error('ISS data unavailable');const d=await r.json();const iss={name:'International Space Station',kind:'Live orbital data',color:0x7ce7f2,size:.3,orbit:0,desc:'A continuously crewed research laboratory orbiting Earth. Position below is retrieved live when the service is available.',distance:'Altitude '+Math.round(d.altitude)+' km',fact:'Speed '+Math.round(d.velocity)+' km/h',tag:'Live satellite telemetry'};const old=objects.findIndex(x=>x.name===iss.name);if(old>=0)objects.splice(old,1);objects.push(iss);renderObjectChips();renderEncyclopedia();}catch{const status=document.createElement('p');status.className='muted';status.textContent='Live ISS telemetry is temporarily unavailable. Other explorer features still work.';$('#view-galaxy').appendChild(status)}}
init3D();renderObjectChips();renderTravelChoices();renderEncyclopedia();renderConstellations();renderQuiz();updateFavoriteCount();selectObject('Earth');loadGallery('galaxy nebula');loadLiveSpaceData();
