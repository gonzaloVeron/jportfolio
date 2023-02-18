import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bokeh',
  templateUrl: './bokeh.component.html',
  styleUrls: ['./bokeh.component.scss']
})
export class BokehComponent implements AfterViewInit {

  cameraPerspective: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  render: THREE.WebGLRenderer;
  orbitControls: OrbitControls;
  bufferGeometry: THREE.BufferGeometry;
  points: THREE.Points;
  textureObj: { pointTexture: { value: THREE.Texture } }; 

  s: number = 1e3;
  E: number = 50;
  u: number = 10; 

  ngAfterViewInit(): void {
    this.mainn();
  }
  
  algo() {
    requestAnimationFrame(() => {
      this.cameraPerspective.aspect = window.innerWidth / window.innerHeight;
      this.cameraPerspective.updateProjectionMatrix();
      this.render.setSize(window.innerWidth, window.innerHeight);
    });
    this.orbitControls.update();
    this.render.render(this.scene, this.cameraPerspective);
  }

  mainn(){
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
    const w = document.createElement("div");
    document.body.appendChild(w);
    this.scene = new THREE.Scene();
    this.render = new THREE.WebGLRenderer({ antialias: !0, alpha: !0 });
    this.render.setPixelRatio(window.devicePixelRatio);
    this.render.setSize(window.innerWidth, window.innerHeight);
    this.render.outputEncoding = THREE.sRGBEncoding;
    w.appendChild(this.render.domElement);
    this.cameraPerspective = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .01, 3 * this.E)
    this.cameraPerspective.position.set(0, 0, this.E);
    this.cameraPerspective.lookAt(0, 0, 0);
    const l: THREE.AmbientLight = new THREE.AmbientLight(16777215);
    this.scene.add(l);
    this.scene.fog = new THREE.FogExp2(0, .003);
    this.textureObj = {
      pointTexture: {
        value: new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/spark1.png")
      }
    }
    const h = new THREE.ShaderMaterial({
      uniforms: this.textureObj,
      vertexShader: shadVertex,
      fragmentShader: shadFrag,
      blending: THREE.AdditiveBlending,
      depthTest: !1,
      transparent: !0,
      vertexColors: !0
    });
    this.bufferGeometry = new THREE.BufferGeometry();
    const m = [];
    const p = [];
    const c = [];
    const g = new THREE.Color();
    for(let e = 0; e < this.s; e++) { 
      m.push((2 * Math.random() - 1) * this.E);
      m.push((2 * Math.random() - 1) * this.E);
      m.push((2 * Math.random() - 1) * this.E);
      g.setHSL(e / this.s, 1, .65);
      p.push(g.r, g.g, g.b);
      c.push(this.u);
      this.bufferGeometry.setAttribute("position", new THREE.Float32BufferAttribute(m, 3));
      this.bufferGeometry.setAttribute("color", new THREE.Float32BufferAttribute(p, 3));
      this.bufferGeometry.setAttribute("size", new THREE.Float32BufferAttribute(c, 1).setUsage(THREE.DynamicCopyUsage));
      this.points = new THREE.Points(this.bufferGeometry, h);
      this.scene.add(this.points);
      this.orbitControls = new OrbitControls(this.cameraPerspective, this.render.domElement)
      this.orbitControls.autoRotate = !0;
      this.orbitControls.autoRotateSpeed = 1;
      this.orbitControls.enableDamping = !0;
      this.orbitControls.enablePan = !1;
      this.orbitControls.minDistance = .1;
      this.orbitControls.maxDistance = this.E * Math.sqrt(2);
      this.orbitControls.minPolarAngle = 0;
      this.orbitControls.maxPolarAngle = Math.PI / 2;
      this.orbitControls.target.set(0, 0, 0);
      this.orbitControls.update();
    }
    window.addEventListener("resize", () => {
      this.cameraPerspective.aspect = window.innerWidth / window.innerHeight;
      this.cameraPerspective.updateProjectionMatrix();
      this.render.setSize(window.innerWidth, window.innerHeight);
    });
    this.algo();
  }


}
