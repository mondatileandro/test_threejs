//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(0, 2, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const makeCube = (texture, size) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshBasicMaterial({
            map: texture || null
    }));
};
//-------- ----------
// CANVAS WITH RND BUILT IN DRAW METHOD
//-------- ----------
let canObj2 = canvasMod.create({
    draw:'rnd',
    size: 16,
    update_mode: 'dual',
    state: { gSize: 12 },
    palette: ['red', 'lime', 'blue', 'cyan', 'purple', 'orange'] });

let cube1 = makeCube(canObj2.texture, 2);
cube1.position.set(2, 0, 0);
scene.add(cube1);

let cube2 = makeCube(canObj2.texture_data, 2);
cube2.position.set(-2, 0, 0);
scene.add(cube2);

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){

    canvasMod.update(canObj2)

};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
