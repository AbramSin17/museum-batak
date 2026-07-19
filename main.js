// Register A-Frame Custom Component: Room Boundary Constraint
// This keeps the player inside the 30m x 10m x 7m hall and at a constant height (y: 1.6)
AFRAME.registerComponent('room-boundary-constraint', {
  schema: {
    minX: { type: 'number', default: -4.6 },
    maxX: { type: 'number', default: 4.6 },
    minZ: { type: 'number', default: -14.6 },
    maxZ: { type: 'number', default: 14.6 },
    fixedY: { type: 'number', default: 1.6 }
  },

  init: function () {
    this.initialPosition = new THREE.Vector3();
    this.initialPosition.copy(this.el.object3D.position);
  },

  tick: function () {
    const pos = this.el.object3D.position;

    // Constrain X position
    if (pos.x < this.data.minX) {
      pos.x = this.data.minX;
    } else if (pos.x > this.data.maxX) {
      pos.x = this.data.maxX;
    }

    // Constrain Z position
    if (pos.z < this.data.minZ) {
      pos.z = this.data.minZ;
    } else if (pos.z > this.data.maxZ) {
      pos.z = this.data.maxZ;
    }

    // Lock Y to maintain height and prevent falling/flying
    pos.y = this.data.fixedY;
  }
});

// Register A-Frame Custom Component: Gorga Wood-Carving Texture Generator
// Generates traditional Batak Gorga pattern programmatically onto a canvas and maps it to the pillar material.
AFRAME.registerComponent('gorga-texture', {
  init: function () {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const COLOR_RED = '#b31515';   // Batak red
    const COLOR_GOLD = '#d4af37';  // Gold accent
    const COLOR_BLACK = '#0d0d0d'; // Deep charcoal black

    ctx.fillStyle = COLOR_BLACK;
    ctx.fillRect(0, 0, 512, 1024);

    const tileSize = 256;
    for (let y = 0; y < 1024; y += tileSize) {
      const columnWidth = 256;
      for (let c = 0; c < 2; c++) {
        const xOffset = c * columnWidth;
        const cx = xOffset + 128;
        const cy = y + 128;

        // Draw background diamonds (Red)
        ctx.fillStyle = COLOR_RED;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 110);
        ctx.lineTo(xOffset + 230, cy);
        ctx.lineTo(cx, cy + 110);
        ctx.lineTo(xOffset + 26, cy);
        ctx.closePath();
        ctx.fill();

        // Inner black diamond
        ctx.fillStyle = COLOR_BLACK;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 85);
        ctx.lineTo(xOffset + 205, cy);
        ctx.lineTo(cx, cy + 85);
        ctx.lineTo(xOffset + 51, cy);
        ctx.closePath();
        ctx.fill();

        // Draw classic Gorga spirals (Simeol-meol curves)
        ctx.strokeStyle = COLOR_GOLD;
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';

        // Left spiral
        ctx.beginPath();
        ctx.arc(cx - 50, cy, 35, Math.PI * 0.5, Math.PI * 2.2);
        ctx.stroke();

        // Right spiral
        ctx.beginPath();
        ctx.arc(cx + 50, cy, 35, Math.PI * 1.5, Math.PI * 3.2);
        ctx.stroke();

        // Center connecting arch
        ctx.beginPath();
        ctx.moveTo(cx - 50, cy);
        ctx.quadraticCurveTo(cx, cy - 40, cx + 50, cy);
        ctx.stroke();

        // Dark detailing inside spirals
        ctx.strokeStyle = COLOR_BLACK;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(cx - 50, cy, 20, 0, Math.PI * 1.8);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 50, cy, 20, Math.PI, Math.PI * 2.8);
        ctx.stroke();

        // Central medallion (Ipong-ipong)
        ctx.fillStyle = COLOR_GOLD;
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLOR_RED;
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();

        // Side border dots
        ctx.fillStyle = COLOR_GOLD;
        ctx.beginPath();
        ctx.arc(xOffset + 12, cy - 60, 6, 0, Math.PI * 2);
        ctx.arc(xOffset + 12, cy, 6, 0, Math.PI * 2);
        ctx.arc(xOffset + 12, cy + 60, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(xOffset + 244, cy - 60, 6, 0, Math.PI * 2);
        ctx.arc(xOffset + 244, cy, 6, 0, Math.PI * 2);
        ctx.arc(xOffset + 244, cy + 60, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = COLOR_GOLD;
      ctx.fillRect(0, y, 512, 8);
      ctx.fillStyle = COLOR_RED;
      ctx.fillRect(0, y + 8, 512, 4);
      ctx.fillStyle = COLOR_BLACK;
      ctx.fillRect(0, y + 12, 512, 8);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 3);

    const renderer = this.el.sceneEl.renderer;
    if (renderer) {
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }

    const applyTexture = () => {
      const mesh = this.el.getObject3D('mesh');
      if (mesh && mesh.material) {
        mesh.material.map = texture;
        mesh.material.needsUpdate = true;
      }
    };

    if (this.el.getObject3D('mesh')) {
      applyTexture();
    } else {
      this.el.addEventListener('object3dset', applyTexture);
    }
  }
});

// Register A-Frame Custom Component: Video Controller
// Handles clicking via raycaster to play/pause video. Unmutes video on first click.
AFRAME.registerComponent('video-controller', {
  schema: {
    videoEl: { type: 'selector' }
  },
  init: function () {
    const video = this.data.videoEl;
    const el = this.el;

    if (!video) return;

    // Listen for click event
    el.addEventListener('click', () => {
      if (video.paused) {
        // Unmute upon click so user can hear the audio
        video.muted = false;
        video.play().catch(err => {
          console.warn("Video failed to play with sound, playing muted:", err);
          video.muted = true;
          video.play();
        });
        console.log("Playing video:", video.id);
      } else {
        video.pause();
        console.log("Paused video:", video.id);
      }
    });

    // Mouse hover feedback (micro-animation scale up)
    el.addEventListener('mouseenter', () => {
      el.setAttribute('scale', '1.02 1.02 1.02');
      const cursor = document.getElementById('camera');
      if (cursor) {
        // Change color/look of crosshair dynamically in CSS if wanted
        document.getElementById('crosshair').classList.add('active');
      }
    });

    el.addEventListener('mouseleave', () => {
      el.setAttribute('scale', '1 1 1');
      document.getElementById('crosshair').classList.remove('active');
    });
  }
});

// Register A-Frame Scene Component: Exhibits Generator
// Preloads assets and dynamically instantiates interactive museum exhibits inside the room shell.
AFRAME.registerComponent('exhibits-generator', {
  init: function () {
    const sceneEl = this.el;

    // Get or create <a-assets> container
    let assetsEl = sceneEl.querySelector('a-assets');
    if (!assetsEl) {
      assetsEl = document.createElement('a-assets');
      sceneEl.appendChild(assetsEl);
    }

    // 1. Programmatically inject media assets to <a-assets>
    EXHIBITS_DATA.forEach(exhibit => {
      if (exhibit.type === 'video') {
        const video = document.createElement('video');
        video.setAttribute('id', `${exhibit.id}-asset`);
        video.setAttribute('src', exhibit.src);
        video.setAttribute('loop', 'true');
        video.setAttribute('muted', 'true');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('crossorigin', 'anonymous');
        video.style.display = 'none';
        assetsEl.appendChild(video);
      } else if (exhibit.type === 'image') {
        const img = document.createElement('img');
        img.setAttribute('id', `${exhibit.id}-asset`);
        img.setAttribute('src', exhibit.src);
        img.setAttribute('crossorigin', 'anonymous');
        img.style.display = 'none';
        assetsEl.appendChild(img);
      } else if (exhibit.type === 'model') {
        const assetItem = document.createElement('a-asset-item');
        assetItem.setAttribute('id', `${exhibit.id}-asset`);
        assetItem.setAttribute('src', exhibit.src);
        assetsEl.appendChild(assetItem);
      }
    });

    // 2. Instantiate and assemble exhibits in the 3D scene
    EXHIBITS_DATA.forEach(exhibit => {
      const container = document.createElement('a-entity');
      container.setAttribute('id', exhibit.id);
      container.setAttribute('position', `${exhibit.position.x} ${exhibit.position.y} ${exhibit.position.z}`);
      container.setAttribute('rotation', `${exhibit.rotation.x} ${exhibit.rotation.y} ${exhibit.rotation.z}`);

      if (exhibit.type === 'image') {
        // IMAGE EXHIBIT WITH GORGA-THEMED LAYOUT BORDERS
        // Black framing backing board (rough wood)
        const frameBack = document.createElement('a-box');
        frameBack.setAttribute('width', '2.2');
        frameBack.setAttribute('height', '1.6');
        frameBack.setAttribute('depth', '0.04');
        frameBack.setAttribute('material', 'color: #0c0c0c; roughness: 0.85; metalness: 0.05; shader: standard');
        container.appendChild(frameBack);

        // Batak Red border ring
        const frameRed = document.createElement('a-box');
        frameRed.setAttribute('width', '2.14');
        frameRed.setAttribute('height', '1.54');
        frameRed.setAttribute('depth', '0.045');
        frameRed.setAttribute('material', 'color: #a61c1c; roughness: 0.8; metalness: 0.05');
        container.appendChild(frameRed);

        // Gold inner border ring
        const frameGold = document.createElement('a-box');
        frameGold.setAttribute('width', '2.08');
        frameGold.setAttribute('height', '1.48');
        frameGold.setAttribute('depth', '0.05');
        frameGold.setAttribute('material', 'color: #d4af37; shader: flat');
        container.appendChild(frameGold);

        // Image canvas itself
        const imgPlane = document.createElement('a-plane');
        imgPlane.setAttribute('width', '2.0');
        imgPlane.setAttribute('height', '1.4');
        imgPlane.setAttribute('position', '0 0 0.026'); // Positioned on top of the borders
        imgPlane.setAttribute('material', `src: #${exhibit.id}-asset; shader: standard; roughness: 0.7; metalness: 0.0`);
        imgPlane.setAttribute('class', 'clickable');

        // Dynamic scale hover effect
        imgPlane.addEventListener('mouseenter', () => {
          imgPlane.setAttribute('scale', '1.01 1.01 1.01');
          document.getElementById('crosshair').classList.add('active');
        });
        imgPlane.addEventListener('mouseleave', () => {
          imgPlane.setAttribute('scale', '1 1 1');
          document.getElementById('crosshair').classList.remove('active');
        });
        container.appendChild(imgPlane);

        // Title text underneath
        const titleEl = document.createElement('a-entity');
        titleEl.setAttribute('text', `value: ${exhibit.title}; align: center; color: #d4af37; width: 3.2; font: roboto;`);
        titleEl.setAttribute('position', '0 -0.95 0.04');
        container.appendChild(titleEl);

        // Description text
        const descEl = document.createElement('a-entity');
        descEl.setAttribute('text', `value: ${exhibit.description}; align: center; color: #dfdfdf; width: 2.0; font: roboto;`);
        descEl.setAttribute('position', '0 -1.25 0.04');
        container.appendChild(descEl);

      } else if (exhibit.type === 'model') {
        // 3D MODEL EXHIBIT IN ELEGANT GLASS VITRINE
        // Pedestal base
        const pedestal = document.createElement('a-box');
        pedestal.setAttribute('width', '1.2');
        pedestal.setAttribute('height', '0.8');
        pedestal.setAttribute('depth', '1.2');
        pedestal.setAttribute('position', '0 0.4 0');
        pedestal.setAttribute('material', 'color: #16110d; roughness: 0.8; metalness: 0.1; shader: standard');
        container.appendChild(pedestal);

        // Gorga decorative gold trim around top edge of base
        const trim = document.createElement('a-box');
        trim.setAttribute('width', '1.22');
        trim.setAttribute('height', '0.04');
        trim.setAttribute('depth', '1.22');
        trim.setAttribute('position', '0 0.75 0');
        trim.setAttribute('material', 'color: #d4af37; shader: flat');
        container.appendChild(trim);

        // Glass containment box
        const glass = document.createElement('a-box');
        glass.setAttribute('width', '1.18');
        glass.setAttribute('height', '1.4');
        glass.setAttribute('depth', '1.18');
        glass.setAttribute('position', '0 1.5 0');
        glass.setAttribute('material', 'color: #ffffff; transparent: true; opacity: 0.16; metalness: 0.9; roughness: 0.1; side: double');
        container.appendChild(glass);

        // Accent spotlight inside vitrine ceiling pointing down
        const spotlight = document.createElement('a-entity');
        spotlight.setAttribute('light', 'type: spot; color: #fffbec; intensity: 0.9; distance: 2.5; angle: 55; decay: 1.2');
        spotlight.setAttribute('position', '0 2.1 0');
        spotlight.setAttribute('rotation', '-90 0 0');
        container.appendChild(spotlight);

        // 3D GLTF Model entity inside cage
        const modelEl = document.createElement('a-entity');
        modelEl.setAttribute('gltf-model', `#${exhibit.id}-asset`);
        modelEl.setAttribute('position', '0 1.25 0');
        modelEl.setAttribute('scale', `${exhibit.scale.x} ${exhibit.scale.y} ${exhibit.scale.z}`);
        // Slow Y rotation animation
        modelEl.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 16000; easing: linear; rgb: true');
        container.appendChild(modelEl);

        // Tilted descriptive metal plaque on front of base
        const plaque = document.createElement('a-plane');
        plaque.setAttribute('width', '0.7');
        plaque.setAttribute('height', '0.35');
        plaque.setAttribute('position', '0 0.75 0.62');
        plaque.setAttribute('rotation', '-20 0 0');
        plaque.setAttribute('material', 'color: #1c1a17; roughness: 0.6; metalness: 0.4');

        // Plaque Text
        const titleText = document.createElement('a-entity');
        titleText.setAttribute('text', `value: ${exhibit.title}; align: center; color: #d4af37; width: 1.5; font: roboto;`);
        titleText.setAttribute('position', '0 0.06 0.01');
        plaque.appendChild(titleText);

        const descText = document.createElement('a-entity');
        descText.setAttribute('text', `value: Model 3D Interaktif\n(Berputar Otomatis); align: center; color: #cccccc; width: 1.0; font: roboto;`);
        descText.setAttribute('position', '0 -0.07 0.01');
        plaque.appendChild(descText);

        container.appendChild(plaque);

      } else if (exhibit.type === 'video') {
        // VIDEO EXHIBIT SCREEN IN MONITOR CASING
        // Back monitor board (wood)
        const frameBack = document.createElement('a-box');
        frameBack.setAttribute('width', '2.2');
        frameBack.setAttribute('height', '1.4');
        frameBack.setAttribute('depth', '0.06');
        frameBack.setAttribute('material', 'color: #1a0f08; roughness: 0.85; metalness: 0.1; shader: standard');
        container.appendChild(frameBack);

        // Gold border inner bezel
        const bezelGold = document.createElement('a-box');
        bezelGold.setAttribute('width', '2.06');
        bezelGold.setAttribute('height', '1.26');
        bezelGold.setAttribute('depth', '0.065');
        bezelGold.setAttribute('material', 'color: #d4af37; shader: flat');
        container.appendChild(bezelGold);

        // Screen plane mapping the video texture
        const screen = document.createElement('a-plane');
        screen.setAttribute('width', '2.0');
        screen.setAttribute('height', '1.2');
        screen.setAttribute('position', '0 0 0.035'); // Raised above frame bezel
        screen.setAttribute('material', `src: #${exhibit.id}-asset; shader: flat;`);
        screen.setAttribute('class', 'clickable');
        screen.setAttribute('video-controller', `videoEl: #${exhibit.id}-asset`);
        container.appendChild(screen);

        // Title below screen
        const titleEl = document.createElement('a-entity');
        titleEl.setAttribute('text', `value: ${exhibit.title}; align: center; color: #d4af37; width: 3.2; font: roboto;`);
        titleEl.setAttribute('position', '0 -0.85 0.04');
        container.appendChild(titleEl);

        // Description below title
        const descEl = document.createElement('a-entity');
        descEl.setAttribute('text', `value: ${exhibit.description}; align: center; color: #dfdfdf; width: 2.0; font: roboto;`);
        descEl.setAttribute('position', '0 -1.23 0.04');
        container.appendChild(descEl);
      }

      sceneEl.appendChild(container);
    });
  }
});

// Setup DOM UI Interactions & Pointer Lock Controls
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const enterBtn = document.getElementById('enter-btn');
  const scene = document.querySelector('a-scene');

  const enterExperience = () => {
    if (scene && scene.canvas) {
      scene.canvas.requestPointerLock();
    }
  };

  if (enterBtn) {
    enterBtn.addEventListener('click', enterExperience);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        enterExperience();
      }
    });
  }

  document.addEventListener('pointerlockchange', () => {
    if (scene && scene.canvas && document.pointerLockElement === scene.canvas) {
      if (overlay) overlay.classList.add('hidden');
    } else {
      if (overlay && !window.popupActive) overlay.classList.remove('hidden');
    }
  });
});

// Register A-Frame Custom Component: Portal Teleportation
// Handles click events on a portal to navigate to a new page, releasing pointer lock first.
AFRAME.registerComponent('portal-teleport', {
  schema: {
    url: { type: 'string' }
  },
  init: function () {
    const el = this.el;
    el.classList.add('clickable');
    
    el.addEventListener('click', () => {
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
      setTimeout(() => {
        window.location.href = this.data.url;
      }, 100);
    });
    
    el.addEventListener('mouseenter', () => {
      el.setAttribute('scale', '1.1 1.1 1.1');
      const crosshair = document.getElementById('crosshair');
      if (crosshair) crosshair.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      el.setAttribute('scale', '1 1 1');
      const crosshair = document.getElementById('crosshair');
      if (crosshair) crosshair.classList.remove('active');
    });
  }
});

// Register A-Frame Custom Component: Hotspot & Portal Gaze Trigger
// Handles both detail popups (Scene 2) and portal transitions across all scenes.
AFRAME.registerComponent('hotspot-trigger', {
  schema: {
    topic: { type: 'string' }
  },
  init: function () {
    const el = this.el;
    el.classList.add('clickable');

    el.addEventListener('click', () => {
      const topic = this.data.topic;
      if (topic.startsWith('portal-')) {
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
        let targetUrl = 'index.html';
        if (topic === 'portal-scene2') {
          targetUrl = 'scene2.html';
        } else if (topic === 'portal-scene3') {
          targetUrl = 'scene3-model.html';
        }
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 100);
      } else {
        if (typeof HOTSPOTS_INFO !== 'undefined' && typeof showPopup === 'function') {
          const data = HOTSPOTS_INFO[topic];
          if (data) {
            showPopup(data);
          }
        }
      }
    });
  }
});

// Register A-Frame Custom Component: Face Camera
// Rotates the entity dynamically to face the player's camera.
AFRAME.registerComponent('face-camera', {
  tick: function () {
    const camera = this.el.sceneEl.camera;
    if (camera) {
      this.el.object3D.lookAt(camera.position);
    }
  }
});

// Register A-Frame Custom Component: Spin On Click
// Triggers a fast 360-degree rotation spin animation on click, lasting 1000ms.
AFRAME.registerComponent('spin-on-click', {
  init: function () {
    const el = this.el;
    let spinning = false;
    
    el.classList.add('clickable');
    
    el.addEventListener('click', () => {
      if (spinning) return;
      spinning = true;
      
      const currRot = el.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
      const targetY = currRot.y + 360;
      
      el.setAttribute('animation', {
        property: 'rotation',
        to: `${currRot.x} ${targetY} ${currRot.z}`,
        dur: 1000,
        easing: 'easeOutQuad'
      });
      
      setTimeout(() => {
        el.removeAttribute('animation');
        el.setAttribute('rotation', `${currRot.x} ${targetY % 360} ${currRot.z}`);
        spinning = false;
      }, 1000);
    });

    el.addEventListener('mouseenter', () => {
      const crosshair = document.getElementById('crosshair');
      if (crosshair) crosshair.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      const crosshair = document.getElementById('crosshair');
      if (crosshair) crosshair.classList.remove('active');
    });
  }
});

// Register A-Frame Custom Component: World Boundary Constraint
// Restricts player movement to a boundary box in Scene 3 to prevent walking off the floor.
AFRAME.registerComponent('world-boundary-constraint', {
  schema: {
    minX: { type: 'number', default: -25 },
    maxX: { type: 'number', default: 25 },
    minZ: { type: 'number', default: -25 },
    maxZ: { type: 'number', default: 25 },
    fixedY: { type: 'number', default: 1.6 }
  },
  tick: function () {
    const pos = this.el.object3D.position;
    if (pos.x < this.data.minX) pos.x = this.data.minX;
    if (pos.x > this.data.maxX) pos.x = this.data.maxX;
    if (pos.z < this.data.minZ) pos.z = this.data.minZ;
    if (pos.z > this.data.maxZ) pos.z = this.data.maxZ;
    pos.y = this.data.fixedY;
  }
});
