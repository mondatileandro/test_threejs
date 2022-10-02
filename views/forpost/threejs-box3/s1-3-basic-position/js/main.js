var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10))
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0.4, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// mesh object
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// UISNG COMPUTE BOUNDING BOX OF THE GEOMETRY
// TO CREATE A BOX3 for the mesh at the boundingBox
// property of the geometry
mesh.geometry.computeBoundingBox();
// GETTING SIZE
var s = new THREE.Vector3();
var box3 = mesh.geometry.boundingBox;
box3.getSize(s);
// USING SIZE VECTOR3 to set Y position of mesh
mesh.position.y = s.y / 2;
scene.add(mesh);
// render
renderer.render(scene, camera);