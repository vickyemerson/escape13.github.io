import * as THREE from 'three';

import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild( renderer.domElement );

const light1 = new THREE.PointLight( 0xffffff, 10, 100 );
light1.position.set( -1, 0, 2 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 10, 100 );
light2.position.set( 1, 1, 2 );
scene.add( light2 );

camera.position.z = 1.75;

camera.lookAt(new THREE.Vector3(0, 0 , 0));

/*

const loader = new GLTFLoader();

loader.load( '/protein.glb', function ( gltf ) {

	scene.add( gltf.scene );

    const protein = scene.children[2];

    const animate = function () {
        requestAnimationFrame( animate );
        protein.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    animate();

}, undefined, function ( error ) {

	console.error( error );

} );

*/

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();