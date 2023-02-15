import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cube-b',
  templateUrl: './cube-b.component.html',
  styleUrls: ['./cube-b.component.scss']
})
export class CubeBComponent implements AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer;
  scene = null;
  camera = null;
  controls: OrbitControls = null;
  mesh = null;
  light = null;

  private calculateAspectRatio(): number {
    const height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, 800/640, 0.1, 1000)
  }

  ngAfterViewInit() {
    this.configScene();
    this.configCamera();
    this.configRenderer();
    this.configControls();

    // this.createLight();
    this.createMesh();  

    this.animate();
  }

  configScene() {
    this.scene.background = new THREE.Color(0, 0, 0);
  }

  configCamera() {
    this.camera.aspect = this.calculateAspectRatio();
    this.camera.updateProjectionMatrix();
	  this.camera.position.set( -15, 10, 15 );
	  this.camera.lookAt( this.scene.position );
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    // setClearColor for transparent background
    // i.e. scene or canvas background shows through
    // this.renderer.setClearColor( 0xff000000, 1 );
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    console.log('clientWidth', this.canvas.clientWidth);
    console.log('clientHeight', this.canvas.clientHeight);
  }

  configControls() {
    // this.controls = new OrbitControls(this.camera, this.canvas);
    // this.controls.autoRotate = false;
    // this.controls.enableZoom = true;
    // this.controls.enablePan = true;
    // this.controls.update();

    const E: number = 50;

    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.25;
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    // this.controls.minDistance = .1;
    this.controls.minDistance = E * Math.sqrt(2); // esto es lo que hacia parecer tener zoom
    this.controls.maxDistance = E * Math.sqrt(2); // esto es lo que hacia parecer tener zoom
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.target.set(0, 0, 0);
    this.controls.enableZoom = false;
  
    this.controls.update();
  }

  createLight() {
    this.light = new THREE.PointLight( 0xffffff );
	  this.light.position.set( -10, 10, 10 );
	  this.scene.add( this.light );
  }

  createMesh() {
    // const geometry1 = new THREE.BoxGeometry(5, 5, 5);
    // const material1 = new THREE.MeshLambertMaterial({ color: 0xdddddd });
    // this.mesh = new THREE.Mesh(geometry1, material1);
    // this.scene.add(this.mesh);

    const shadVertex = `attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( 300.0 / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const shadFrag = `uniform sampler2D pointTexture;
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4( vColor, 1.0 );
        gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
      }
    `;

    const texture = {
      pointTexture: {
        value: new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/spark1.png")
      }
    };

    const material = new THREE.ShaderMaterial({
      uniforms: texture,
      vertexShader: shadVertex,
      fragmentShader: shadFrag,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true
    });
  
    const geometry = new THREE.BufferGeometry();
    const m = []; // posiciones ¿?
    const p = []; // array posicional r g b
    const forSize = [];
    const color = new THREE.Color();
    const s: number = 1e3; // Significa 1000
    const E: number = 50;
    const size: number = 3; 
  
    for(let e = 0; e < s; e++) { 
      m.push((2 * Math.random() - 1) * E);
      m.push((2 * Math.random() - 1) * E);
      m.push((2 * Math.random() - 1) * E);
      color.setHSL(e / s, 1, .504);
      p.push(color.r, color.g, color.b);
      forSize.push(size);
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(m, 3));
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(p, 3));
      geometry.setAttribute("size", new THREE.Float32BufferAttribute(forSize, 1).setUsage(THREE.DynamicCopyUsage));
      const points = new THREE.Points(geometry, material);
      this.scene.add(points);
    }
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.01;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }


}
