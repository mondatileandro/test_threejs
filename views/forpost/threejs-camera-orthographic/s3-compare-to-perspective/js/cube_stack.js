// Cube Stack example for s3-compare-to-perspective example in threejs-camera-orthographic
var CubeStack = (function () {
    // the stack constructor
    var api = {};
    // create the plane
    var createPlane = function (opt) {
        opt = opt || {};
        var plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(opt.gx, opt.gy, opt.gx, opt.gy),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                }));
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };
    // append mesh objects
    var appendBoxMeshObjects = function (group, opt) {
        opt = opt || {};
        opt.boxCount = opt.boxCount === undefined ? 30 : opt.boxCount;
        var boxIndex = 0, boxArray = [], x, y, z, box;
        // place some boxes on the plane
        while (boxIndex < opt.boxCount) {
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0x00ffff,
                        emissive: 0x0a0a0a
                    }));
            x = Math.floor(opt.gx * Math.random());
            y = 0;
            z = Math.floor(opt.gy * Math.random());
            if (boxArray[z] === undefined) {
                boxArray[z] = [];
            }
            if (boxArray[z][x] === undefined) {
                boxArray[z][x] = [];
            }
            boxArray[z][x].push(box);
            y = boxArray[z][x].length - 1;
            box.position.set(
                -2 + x,
                y,
                -2 + z);
            group.add(box);
            boxIndex += 1;
        }
    };
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        opt.gx = opt.gx === undefined ? 5: opt.gx;
        opt.gy = opt.gy === undefined ? 5: opt.gy;
        var group = new THREE.Group();
        appendBoxMeshObjects(group, opt)
        var plane = createPlane(opt);
        group.add(plane);
        return group;
    };
    // retrun public api
    return api;
}
    ());
