# basic

Basic example of the slerp method in threejs where I create two quatrenion objects and slerp from one to another. To create these quaternion objects I am making use of the set from axis angle method to do so. Once I have two quaternion objects I can then use them to update the quaternion object of a mesh object by copying the first quaternion to the quaternion of the mesh, after which I can then class the slerp method and pass the second one. I then pass an alpha value as the second argument for the slerp method of 0.5 which should result in the state of the mesh object being between the two quaternions and it is.