import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { QuizStep } from '../types';

interface ThreeSceneProps {
  step: QuizStep;
  scrollOffset?: number; // 0 to 1
  activeProductIndex?: number; // 0 to 3
  isInteractive?: boolean; // enable orbit drag
  onBottleClick?: (index: number) => void;
  compactMode?: boolean; // e.g. for result preview or cards
}

export interface BottleInfo {
  id: string;
  name: string;
  frenchName: string;
  line: string;
  colorName: string;
  primaryColor: number;
  liquidColor: number;
  glassColor: number;
  pumpColor: number;
  benefits: string;
}

export const BOTTLE_CATALOG: BottleInfo[] = [
  {
    id: 'blond-absolu',
    name: 'ユイル シカエクストリーム',
    frenchName: "L'Huile Cicaextreme",
    line: 'BLOND ABSOLU',
    colorName: 'バイオレット・アメジスト',
    primaryColor: 0x8B5CF6,
    liquidColor: 0x7c3aed,
    glassColor: 0xa78bfa,
    pumpColor: 0xe2e8f0, // silver/chrome
    benefits: 'ブリーチ・ハイトーン補修 / 集中保湿'
  },
  {
    id: 'chroma-absolu',
    name: 'ユイル クロマ グロス',
    frenchName: 'Huile Chroma Gloss',
    line: 'CHROMA ABSOLU',
    colorName: 'ローズクォーツ',
    primaryColor: 0xF43F5E,
    liquidColor: 0xe11d48,
    glassColor: 0xfb7185,
    pumpColor: 0xfce7f3, // rose chrome
    benefits: 'カラーヘアの色持ち / 艶やかなコーティング'
  },
  {
    id: 'chronologiste',
    name: 'ユイル クロノロジスト R',
    frenchName: 'Huile de Parfum',
    line: 'CHRONOLOGISTE',
    colorName: 'オブシディアン・ゴールド',
    primaryColor: 0x18181b,
    liquidColor: 0x27272a,
    glassColor: 0x27272a,
    pumpColor: 0xD4AF37, // 24K Gold
    benefits: '全方位エイジングケア / 最高峰の輝き'
  },
  {
    id: 'elixir-ultime',
    name: 'ユイル スブリム / エリクサーウルティム',
    frenchName: "L'Huile Originale",
    line: 'ELIXIR ULTIME',
    colorName: 'アンバー・ゴールド',
    primaryColor: 0xD97706,
    liquidColor: 0xb45309,
    glassColor: 0xf59e0b,
    pumpColor: 0xD4AF37, // 24K Gold
    benefits: '至高のツヤとまとまり / 230℃熱保護'
  }
];

const ThreeScene: React.FC<ThreeSceneProps> = ({
  step,
  scrollOffset = 0,
  activeProductIndex = 2,
  isInteractive = true,
  onBottleClick,
  compactMode = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const bottlesRef = useRef<THREE.Group[]>([]);
  const swirlRibbonRef = useRef<THREE.Mesh | null>(null);
  const dropletsRef = useRef<THREE.InstancedMesh | null>(null);
  const dropletDataRef = useRef<{ pos: THREE.Vector3; speed: number; orbitRadius: number; angle: number; yOffset: number; size: number }[]>([]);
  const cameraTargetRef = useRef<{ pos: THREE.Vector3; lookAt: THREE.Vector3 }>({
    pos: new THREE.Vector3(0, 0, 7.8),
    lookAt: new THREE.Vector3(0, 0, 0)
  });
  const dragRef = useRef<{ isDragging: boolean; startX: number; startY: number; rotX: number; rotY: number }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    rotX: 0,
    rotY: 0
  });

  const [hoveredBottle, setHoveredBottle] = useState<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup: Bright Luminous Studio ---
    const scene = new THREE.Scene();
    // Warm luminous atmospheric fog (replaces dark fog)
    scene.fog = new THREE.FogExp2(0xfaf8f5, 0.015);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Bright Studio Lighting ---
    // Warm diffuse ambient light for clear bottle visibility
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 2.5);
    scene.add(ambientLight);

    // Crisp Key Light from upper right
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(4, 7, 6);
    scene.add(keyLight);

    // Warm Gold Rim Light from left rear to separate bottles from background
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 3.2);
    rimLight.position.set(-5, 5, -3);
    scene.add(rimLight);

    // Top-down chandelier focus
    const topLight = new THREE.PointLight(0xfffbeb, 2.8, 16);
    topLight.position.set(0, 6, 2);
    scene.add(topLight);

    // Front soft fill light
    const frontFill = new THREE.DirectionalLight(0xfff1f2, 1.8);
    frontFill.position.set(0, 0, 7);
    scene.add(frontFill);

    // --- Polished Pearl Studio Floor Pedestal ---
    const floorGeo = new THREE.PlaneGeometry(35, 35);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf5f2eb, // pearl ivory
      roughness: 0.12,
      metalness: 0.25
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.1;
    scene.add(floor);

    // Golden reflective accent ring on floor
    const ringGeo = new THREE.RingGeometry(2.6, 2.65, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -2.08;
    scene.add(ring);

    // --- Bottle Builder Helper ---
    const createBottle = (info: BottleInfo, xPos: number, index: number) => {
      const bottleGroup = new THREE.Group();
      bottleGroup.position.set(xPos, -0.2, 0);

      const bottleHeight = 2.4;
      const bottleRadius = 0.52;

      // 1. Outer Glass Body (crystal clear luxury glass with vibrant tint)
      const glassGeo = new THREE.CylinderGeometry(bottleRadius * 0.94, bottleRadius, bottleHeight, 48, 1, false);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: info.glassColor,
        roughness: 0.05,
        metalness: 0.08,
        transmission: 0.8, // high transmission for clear bright luxury glass
        thickness: 0.85,
        ior: 1.52,
        reflectivity: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03
      });
      const glassBody = new THREE.Mesh(glassGeo, glassMat);
      glassBody.position.y = 0;
      bottleGroup.add(glassBody);

      // Thick Base Glass Bottom
      const baseGeo = new THREE.CylinderGeometry(bottleRadius * 1.01, bottleRadius * 1.01, 0.22, 48);
      const baseMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.03,
        metalness: 0.05,
        transmission: 0.9,
        ior: 1.54
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = -bottleHeight / 2 + 0.11;
      bottleGroup.add(base);

      // 2. Inner Colored Liquid Core
      const liquidGeo = new THREE.CylinderGeometry(bottleRadius * 0.82, bottleRadius * 0.86, bottleHeight * 0.82, 32);
      const liquidMat = new THREE.MeshPhysicalMaterial({
        color: info.liquidColor,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.5,
        thickness: 1.1
      });
      const liquid = new THREE.Mesh(liquidGeo, liquidMat);
      liquid.position.y = -0.05;
      bottleGroup.add(liquid);

      // 3. Gold / Silver Metallic Shoulder & Neck
      const shoulderGeo = new THREE.CylinderGeometry(0.38, bottleRadius * 0.94, 0.22, 48);
      const shoulderMat = new THREE.MeshStandardMaterial({
        color: info.pumpColor,
        metalness: 0.95,
        roughness: 0.12
      });
      const shoulder = new THREE.Mesh(shoulderGeo, shoulderMat);
      shoulder.position.y = bottleHeight / 2 + 0.1;
      bottleGroup.add(shoulder);

      // Neck ring
      const neckGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.24, 32);
      const neck = new THREE.Mesh(neckGeo, shoulderMat);
      neck.position.y = bottleHeight / 2 + 0.28;
      bottleGroup.add(neck);

      // 4. Luxury Pump Dispenser & Spout
      const pumpHeadGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.35, 32);
      const pumpHeadMat = new THREE.MeshStandardMaterial({
        color: info.id === 'chronologiste' ? 0x222222 : info.pumpColor,
        metalness: info.id === 'chronologiste' ? 0.6 : 0.95,
        roughness: 0.15
      });
      const pumpHead = new THREE.Mesh(pumpHeadGeo, pumpHeadMat);
      pumpHead.position.y = bottleHeight / 2 + 0.52;
      bottleGroup.add(pumpHead);

      // Spout nozzle
      const nozzleGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.26, 16);
      const nozzle = new THREE.Mesh(nozzleGeo, pumpHeadMat);
      nozzle.rotation.z = Math.PI / 2.8;
      nozzle.position.set(0.18, bottleHeight / 2 + 0.58, 0);
      bottleGroup.add(nozzle);

      // 5. Embossed Front Emblem (High contrast, clearly readable)
      const emblemCanvas = document.createElement('canvas');
      emblemCanvas.width = 256;
      emblemCanvas.height = 512;
      const ctx = emblemCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 256, 512);

        // Kérastase Paris branding text in crisp luxury typography
        ctx.fillStyle = info.id === 'chronologiste' ? '#F4D06F' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.font = '700 20px "Cinzel", serif';
        ctx.fillText('KÉRASTASE', 128, 70);

        ctx.font = '600 13px "Cinzel", serif';
        ctx.letterSpacing = '6px';
        ctx.fillText('PARIS', 128, 92);

        // Center Emblem Monogram
        ctx.font = 'bold 155px "Cinzel", serif';
        ctx.fillStyle = info.id === 'chronologiste' || info.id === 'elixir-ultime' ? '#B45309' : '#0f172a';
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 8;
        ctx.fillText('K', 128, 260);

        // Product Line & Name
        ctx.shadowBlur = 0;
        ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(info.line, 128, 310);

        ctx.font = '600 12px "Noto Sans JP", sans-serif';
        ctx.fillStyle = '#334155';
        ctx.fillText(info.frenchName, 128, 340);
        ctx.fillText('REFILLABLE', 128, 370);
      }

      const emblemTexture = new THREE.CanvasTexture(emblemCanvas);
      emblemTexture.needsUpdate = true;
      const emblemPlane = new THREE.PlaneGeometry(0.82, 1.64);
      const emblemMat = new THREE.MeshBasicMaterial({
        map: emblemTexture,
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide
      });
      const emblemMesh = new THREE.Mesh(emblemPlane, emblemMat);
      emblemMesh.position.set(0, -0.05, bottleRadius + 0.02);
      bottleGroup.add(emblemMesh);

      // Subtle warm aura spotlight behind each bottle
      const auraGeo = new THREE.PlaneGeometry(2.4, 4.2);
      const auraCanvas = document.createElement('canvas');
      auraCanvas.width = 128;
      auraCanvas.height = 256;
      const actx = auraCanvas.getContext('2d');
      if (actx) {
        const radGrad = actx.createRadialGradient(64, 128, 10, 64, 128, 120);
        const hex = '#' + info.primaryColor.toString(16).padStart(6, '0');
        radGrad.addColorStop(0, hex);
        radGrad.addColorStop(1, 'transparent');
        actx.fillStyle = radGrad;
        actx.fillRect(0, 0, 128, 256);
      }
      const auraTex = new THREE.CanvasTexture(auraCanvas);
      const auraMat = new THREE.MeshBasicMaterial({
        map: auraTex,
        transparent: true,
        opacity: 0.28,
        blending: THREE.NormalBlending,
        side: THREE.DoubleSide
      });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.position.set(0, 0, -0.15);
      bottleGroup.add(aura);

      // Tag bottle index for raycasting
      bottleGroup.userData = { index, info };

      scene.add(bottleGroup);
      return bottleGroup;
    };

    // Instantiate 4 signature bottles
    const bottlePositions = [-2.45, -0.82, 0.82, 2.45];
    const createdBottles = BOTTLE_CATALOG.map((info, idx) =>
      createBottle(info, bottlePositions[idx], idx)
    );
    bottlesRef.current = createdBottles;

    // --- Dynamic 3D Liquid Splash Swirl Ribbon (Luminous Amber & Gold) ---
    const numPoints = 80;
    const curvePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const angle = t * Math.PI * 4.2;
      const radius = 2.4 + Math.sin(t * Math.PI) * 1.5;
      const x = Math.sin(angle) * radius;
      const y = -1.6 + t * 3.4;
      const z = Math.cos(angle) * (radius * 0.8);
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 90, 0.08, 16, false);
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b, // Luminous warm amber gold
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      roughness: 0.08,
      metalness: 0.3,
      transmission: 0.75,
      ior: 1.45,
      transparent: true,
      opacity: 0.9
    });
    const swirlRibbon = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(swirlRibbon);
    swirlRibbonRef.current = swirlRibbon;

    // --- 3D Instanced Splashing Droplets & Liquid Pearls ---
    const dropletCount = 140;
    const dropGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const dropMat = new THREE.MeshPhysicalMaterial({
      color: 0xfde047,
      roughness: 0.04,
      metalness: 0.15,
      transmission: 0.88,
      thickness: 0.4,
      clearcoat: 1.0
    });
    const dropInstanced = new THREE.InstancedMesh(dropGeo, dropMat, dropletCount);
    scene.add(dropInstanced);
    dropletsRef.current = dropInstanced;

    const dropletData: { pos: THREE.Vector3; speed: number; orbitRadius: number; angle: number; yOffset: number; size: number }[] = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < dropletCount; i++) {
      const orbitRadius = 1.2 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = -1.5 + Math.random() * 3.8;
      const speed = 0.4 + Math.random() * 0.8;
      const size = 0.4 + Math.random() * 1.2;

      const pos = new THREE.Vector3(
        Math.cos(angle) * orbitRadius,
        yOffset,
        Math.sin(angle) * (orbitRadius * 0.7)
      );

      dummy.position.copy(pos);
      dummy.scale.set(size, size, size);
      dummy.updateMatrix();
      dropInstanced.setMatrixAt(i, dummy.matrix);

      dropletData.push({ pos, speed, orbitRadius, angle, yOffset, size });
    }
    dropInstanced.instanceMatrix.needsUpdate = true;
    dropletDataRef.current = dropletData;

    // --- Sparkling Golden Bokeh Dust Particles ---
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 12;
      dustPositions[i + 1] = (Math.random() - 0.5) * 6;
      dustPositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xd97706,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // --- Raycasting for Bottle Clicks / Hover ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      dragRef.current.isDragging = true;
      dragRef.current.startX = clientX;
      dragRef.current.startY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (dragRef.current.isDragging && isInteractive) {
        const dx = clientX - dragRef.current.startX;
        const dy = clientY - dragRef.current.startY;
        dragRef.current.rotY += dx * 0.005;
        dragRef.current.rotX = Math.max(-0.4, Math.min(0.4, dragRef.current.rotX + dy * 0.004));
        dragRef.current.startX = clientX;
        dragRef.current.startY = clientY;
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      let foundIndex: number | null = null;
      for (const hit of intersects) {
        let cur: THREE.Object3D | null = hit.object;
        while (cur) {
          if (cur.userData && typeof cur.userData.index === 'number') {
            foundIndex = cur.userData.index;
            break;
          }
          cur = cur.parent;
        }
        if (foundIndex !== null) break;
      }
      setHoveredBottle(foundIndex);
    };

    const handlePointerUp = () => {
      dragRef.current.isDragging = false;
    };

    const handleClick = () => {
      if (hoveredBottle !== null && onBottleClick) {
        onBottleClick(hoveredBottle);
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating animation
      bottlesRef.current.forEach((bottle, i) => {
        const offset = i * 0.8;
        bottle.position.y = -0.2 + Math.sin(elapsedTime * 1.4 + offset) * 0.08;
        bottle.rotation.z = Math.sin(elapsedTime * 1.1 + offset) * 0.035;
        bottle.rotation.y = (elapsedTime * 0.25 + offset) * 0.15;

        const isTarget = hoveredBottle === i || activeProductIndex === i;
        const targetScale = isTarget ? 1.08 : 1.0;
        bottle.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      // Liquid Splash Ribbon dynamics
      if (swirlRibbonRef.current) {
        swirlRibbonRef.current.rotation.y = elapsedTime * 0.55 + dragRef.current.rotY * 0.5;
        swirlRibbonRef.current.rotation.x = Math.sin(elapsedTime * 0.8) * 0.1;
      }

      // Orbiting Droplets
      if (dropletsRef.current && dropletDataRef.current.length > 0) {
        const dMesh = dropletsRef.current;
        const dData = dropletDataRef.current;

        for (let i = 0; i < dData.length; i++) {
          const item = dData[i];
          item.angle += 0.015 * item.speed;

          const curRadius = item.orbitRadius + Math.sin(elapsedTime * 2 + i) * 0.2;
          const x = Math.cos(item.angle) * curRadius;
          const z = Math.sin(item.angle) * (curRadius * 0.8);
          const y = item.yOffset + Math.sin(elapsedTime * 1.8 + i) * 0.25;

          dummy.position.set(x, y, z);
          const s = item.size * (0.8 + Math.sin(elapsedTime * 3 + i) * 0.2);
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          dMesh.setMatrixAt(i, dummy.matrix);
        }
        dMesh.instanceMatrix.needsUpdate = true;
      }

      if (dustParticles) {
        dustParticles.rotation.y = elapsedTime * 0.04;
      }

      // Smooth Camera Choreography
      const currentTarget = cameraTargetRef.current;
      const targetPos = currentTarget.pos.clone();
      const targetLookAt = currentTarget.lookAt.clone();

      targetPos.x += dragRef.current.rotY * 2.2;
      targetPos.y += dragRef.current.rotX * 1.8;

      camera.position.lerp(targetPos, 0.06);
      camera.lookAt(targetLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      container.removeEventListener('click', handleClick);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // --- Dynamic Camera Director based on Step & Scroll & Active Bottle ---
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const baseZ = isMobile ? 8.4 : 7.2;

    switch (step) {
      case QuizStep.START:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(0, 0.1, baseZ),
          lookAt: new THREE.Vector3(0, -0.1, 0)
        };
        break;

      case QuizStep.Q1_HAIR_TYPE:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(-1.1, -0.4, baseZ * 0.72),
          lookAt: new THREE.Vector3(-0.8, 0.1, 0)
        };
        break;

      case QuizStep.Q2_SCALP_TYPE:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(0.5, 1.4, baseZ * 0.78),
          lookAt: new THREE.Vector3(0.2, 0.4, 0)
        };
        break;

      case QuizStep.Q3_FRIZZ_WAVE:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(1.6, -0.1, baseZ * 0.75),
          lookAt: new THREE.Vector3(1.0, 0, 0)
        };
        break;

      case QuizStep.Q4_DAMAGE_LEVEL:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(0.82, 0.0, baseZ * 0.62),
          lookAt: new THREE.Vector3(0.82, 0.1, 0)
        };
        break;

      case QuizStep.Q5_AGING_CARE:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(0.3, 0.3, baseZ * 0.65),
          lookAt: new THREE.Vector3(0.5, 0.2, 0)
        };
        break;

      case QuizStep.Q6_IDEAL_FINISH:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(-0.6, 0.2, baseZ * 0.75),
          lookAt: new THREE.Vector3(0, 0, 0)
        };
        break;

      case QuizStep.Q7_PRIORITY:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(0, 0.6, baseZ * 0.8),
          lookAt: new THREE.Vector3(0, 0.1, 0)
        };
        break;

      case QuizStep.LOADING:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(0, 0.2, baseZ * 0.5),
          lookAt: new THREE.Vector3(0, 0.2, 0)
        };
        break;

      case QuizStep.RESULTS: {
        const bottlePos = [-2.45, -0.82, 0.82, 2.45];
        const targetX = bottlePos[Math.max(0, Math.min(3, activeProductIndex))];
        cameraTargetRef.current = {
          pos: new THREE.Vector3(targetX, 0.1, baseZ * 0.62),
          lookAt: new THREE.Vector3(targetX, 0.1, 0)
        };
        break;
      }

      default:
        cameraTargetRef.current = {
          pos: new THREE.Vector3(0, 0.2, baseZ),
          lookAt: new THREE.Vector3(0, 0, 0)
        };
    }
  }, [step, activeProductIndex]);

  useEffect(() => {
    if (scrollOffset && step !== QuizStep.LOADING) {
      cameraTargetRef.current.pos.y += (scrollOffset - 0.5) * 0.8;
    }
  }, [scrollOffset, step]);

  return (
    <div className={`relative w-full h-full select-none ${compactMode ? 'rounded-2xl overflow-hidden' : ''}`}>
      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Interaction Badge & Bottle Tooltip (Bright Luxury High Contrast) */}
      {hoveredBottle !== null && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300">
          <div className="glass-panel-light px-5 py-2.5 rounded-full text-center shadow-xl flex items-center gap-2 border border-amber-500/40">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[11px] font-serif-luxury tracking-widest text-slate-900 uppercase font-bold">
              {BOTTLE_CATALOG[hoveredBottle].line}
            </span>
            <span className="text-slate-400 text-xs">·</span>
            <span className="text-[11px] text-slate-700 tracking-wider font-medium">
              {BOTTLE_CATALOG[hoveredBottle].name}
            </span>
          </div>
        </div>
      )}

      {/* Subtle Bottom 3D Gesture Helper (Dark, high-contrast readable text) */}
      {step === QuizStep.START && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none text-center">
          <p className="text-[11px] tracking-[0.3em] text-slate-600 font-medium uppercase bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-200 shadow-sm">
            3Dドラッグで回転 · スクロール連動
          </p>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
