// scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Using the distanceTo method of the Vector2 class

var createDepthData = function(mesh, camera, maxDist, width, height){
    var size = width * height;
    var data = new Uint8Array( 4 * size );

    // d1 - distance from mesh to camera
    var d1 = mesh.position.distanceTo( camera.position );
    d1 = d1 > maxDist ? maxDist : d1;
    var d1Per = d1 / maxDist;
   console.log(d1Per)
    for ( let i = 0; i < size; i ++ ) {
        var stride = i * 4,
        x = i % width,
        y = Math.floor(i / width),
        v2 = new THREE.Vector2(x, y),
        // d1 - px distance from center of canvas
        d2 = v2.distanceTo( new THREE.Vector2(width / 2, height / 2) ),
        d2Per = d2 / (width / 2);
        d2Per = d2Per > 1 ? 1 : d2Per;
        // set r, g, b, and alpha data values
        var v = 255 - Math.floor(245 * d2Per) * ( 1 - d1Per );
        data[ stride ] = v;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = v;
        data[ stride + 3 ] = 255;
    }
    return data;
};

// creating a mesh with this texture as a color map
var box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
       color: 0xffffff,
       transparent: true,
       opacity: 1
    })
);
box.position.set(-1.5, 0, -1.5);
var width = 16, height = 16;
var data = createDepthData(box, camera, 10, width, height);
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
box.material.map = texture;


scene.add(box);
// render
renderer.render(scene, camera);