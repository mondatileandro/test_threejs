var line, renderer, scene, camera, camera2, controls;
var line1;
var matLine, matLineBasic, matLineDashed;
var stats;
var gui;
// viewport
var insetWidth;
var insetHeight;
init();
animate();
function init() {

    // renderer
    renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(-40, 0, 60);
    insetWidth = 320 / 4; // square
    insetHeight = 240 / 4;
    //camera2 = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    //camera2.position.copy(camera.position);

    // controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 500;

    // Position and Color Data
    var positions = [],
    colors = [],
    points = hilbert3D(new THREE.Vector3(0, 0, 0), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7),
    spline = new THREE.CatmullRomCurve3(points),
    divisions = Math.round(12 * points.length),
    color = new THREE.Color();

    for (var i = 0, l = divisions; i < l; i++) {
        var point = spline.getPoint(i / l);
        positions.push(point.x, point.y, point.z);
        color.setHSL(i / l, 1.0, 0.5);
        colors.push(color.r, color.g, color.b);
    }

    // THREE.Line2 ( LineGeometry, LineMaterial )
    var geometry = new THREE.LineGeometry();
    geometry.setPositions(positions);
    geometry.setColors(colors);
    matLine = new THREE.LineMaterial({
            color: 0xffffff,
            linewidth: 5, // in pixels
            vertexColors: THREE.VertexColors,
            //resolution:  // to be set by renderer, eventually
            dashed: false
        });
    line = new THREE.Line2(geometry, matLine);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    scene.add(line);
    // THREE.Line ( BufferGeometry, LineBasicMaterial ) - rendered with gl.LINE_STRIP
    var geo = new THREE.BufferGeometry();
    geo.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    matLineBasic = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors
        });
    matLineDashed = new THREE.LineDashedMaterial({
            vertexColors: THREE.VertexColors,
            scale: 2,
            dashSize: 1,
            gapSize: 1
        });
    line1 = new THREE.Line(geo, matLineBasic);
    line1.computeLineDistances();
    line1.visible = false;
    scene.add(line1);

}

function animate() {
    requestAnimationFrame(animate);
    //stats.update();
    // main scene
    renderer.setClearColor(0x000000, 0);
    renderer.setViewport(0, 0, 320, 240);

    // renderer will set this eventually
    matLine.resolution.set(320, 240); // resolution of the viewport
    renderer.render(scene, camera);

    // inset scene
    renderer.setClearColor(0x222222, 1);
    renderer.clearDepth(); // important!

}
