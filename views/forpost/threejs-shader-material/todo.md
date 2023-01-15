# threejs-shader-material todo list

* RawShaderMaterial might be a better choice for getting started with GLSL alone
* THREE.ShaderChunk can be used to get built in GLSL code
* It might be best to stick to THREE.ShaderChunk and the TRHEEJS repo for code examples

GLSL Ref guid

```
https://registry.khronos.org/OpenGL-Refpages/gl4/
```

<!-- Section ideas -->

## () - sx-2-examples-outline - exmaples section
* () continue with the basic solid color one, only now see about having an outline for each triangle
* () rename sx-1-crosshatch to sx-2-examples-crosshatch

## () - sx-1-inline - using script tags for GLSL code
* () start a inline GLSL section with a basic example using script tags
* () use 'x-shader/x-vertex' for a script tag that will include the vertex shader
* () use 'x-shader/x-fragment' for a script tag that will include the fragment shader
* () the basic example can just be the same as s1-1-basic-diffuse

## () - sx-1-depth - start a section on custom depth shading
* () the next step with this might be some kind of depth shading

<!-- NEXT -->

## () - sx-2-crosshatch-opacity
* () see about adding opacity for this


<!-- DONE -->

## ( done 01/13/2023 ) - s2-1-vertexcolors - vec2 for ratio
* (done) I should be able to define a vec2 for the ratio of base color to vertex color

## ( done 01/13/2023 ) - s2-1-vertexcolors - some changes
* (done) there should just be a uBasecolor and opacity value for uniforms
* (done) expand remaining #includes with the exception of 'common'

## ( done 01/13/2023 ) - s2-1-vertexcolors
* (done) start a section in which vertexcolors are used starting with a basic example
* (done) start with the mesh basic material GLSL code
* (done) create a color attribute for the geometry
* (done) remove code that does not have to do with vertex colors
* (done) have vertex colors just be part of what effects the over all diffuse color

## ( done 01/12/2023 ) - s1-3-basic-shader-chunk-code
* (done) same as s1-2-basic-shader-chunk but now I am using the shader code strings

## ( done 01/12/2023 ) - s1-2-basic-shader-chunk
* (done) basic example of the THREE.ShaderChunk object

## ( done 01/12/2023 ) - s1-1-basic-diffuse
* (done) make a very simply solid color shader like the basic material, only it is just a solid color only

## ( done 01/12/2023 ) start for post folder
* (done) for post folder started with r146 demo