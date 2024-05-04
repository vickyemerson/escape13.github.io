import * as THREE from '/three/build/three.module.js';
import { GLTFLoader } from '/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const container = document.getElementById( 'protein_render' );
const camera = new THREE.PerspectiveCamera( 30, container.clientWidth / container.clientHeight);
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( container.clientWidth, container.clientHeight);

container.appendChild( renderer.domElement );

const light1 = new THREE.PointLight( 0xffffff, 10, 100 );
light1.position.set( -1, 0, 2 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 10, 100 );
light2.position.set( 1, 1, 2 );
scene.add( light2 );

camera.position.z = 3.8;

camera.lookAt(new THREE.Vector3(0, 0 , 0));

const header = document.getElementsByClassName("research_title")[0]
console.log(header)

const loader = new GLTFLoader();

loader.load( '/protein.glb', function ( gltf ) {

	scene.add( gltf.scene );

    const protein = scene.children[2];

    const animate = function () {
        requestAnimationFrame( animate );
        var value = window.pageYOffset;
        protein.rotation.y = value / 150
        renderer.render( scene, camera );
    }
    animate();

}, undefined, function ( error ) {

	console.error( error );

} ); 