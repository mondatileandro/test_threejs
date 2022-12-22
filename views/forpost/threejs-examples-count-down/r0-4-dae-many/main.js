// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0.8, 0.8);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1.5, 2.5, 4.0);
camera.lookAt(0, 0.85, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.8);
dl.position.set(-2, 1, 2);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
// ---------- ----------
// CONST
// ---------- ----------
const SECS = 30;
// ---------- ----------
// HELPERS
// ---------- ----------
// create loop method with given update method
const create_loop = (update) => {
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = SECS * FPS_UPDATE;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    update = update || function(frame, frameMax){};
    // loop
    const loop = function() {
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
    return loop;
};
// ---------- ----------
// LOADING MANAGER
// ---------- ----------
countDown.DAE_loader(
    [
        '/dae/count_down_basic/cd3-nums.dae',
        '/dae/count_down_basic/cd3-ground.dae'
    ]
)
.then( (SOURCE_OBJECTS) => {
    console.log('Done Loading.');
    console.log(SOURCE_OBJECTS);
    // use canvas textures
    Object.keys(SOURCE_OBJECTS).forEach( (key) => {
        const obj = SOURCE_OBJECTS[key];
        if(parseInt(key) + '' != 'NaN'){
            countDown.addLine(obj, 1, new THREE.Vector3(), 2, 0xffffff);
        }else{
            countDown.addLine(obj, 1, new THREE.Vector3(0.01,0,0.01), 2, 0xffffff);
        }
    });
    //-------- ----------
    // SCENE CHILD OBJECTS
    //-------- ----------
    // count secs count down object
    const count_sec = countDown.create({
        countID: 'sec',
        digits: 2,
        width: 1.1,
        source_objects: SOURCE_OBJECTS
    });
    count_sec.scale.set(0.75, 0.75, 0.75);
    count_sec.position.set(0, 2.05, -0.5);
    scene.add(count_sec);
    // adding a frame count
    const count_frames = countDown.create({
        countID: 'frames',
        digits: 3,
        width: 1.4,
        source_objects: SOURCE_OBJECTS
    });
    count_frames.scale.set(0.25, 0.25, 0.25);
    count_frames.position.set(0, 0.80, 0.30);
    scene.add(count_frames);
    // add ground object
    scene.add( SOURCE_OBJECTS['ground_0'] );
    // ---------- ----------
    // UPDATE / ANIMATION LOOP
    // ---------- ----------
    const loop = create_loop(function(frame, frameMax){
        const a1 = (frame + 1) / frameMax;
        let secs = Math.floor(SECS - SECS * a1);
        countDown.set(count_sec, secs);
        countDown.set(count_frames, frame);
        // camera
        camera.position.x = 2 - 4 * a1;
        camera.lookAt( 0, 1.20, 0 );
    });
    loop();
})
.catch( (e) => {
    console.log(e.message);
    scene.add( new THREE.GridHelper(10, 10) );
    renderer.render(scene, camera);
});
