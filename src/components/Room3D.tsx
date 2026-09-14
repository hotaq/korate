import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRoomStore } from '../store/roomStore';
import * as THREE from 'three';
import { Square, X, Clock } from 'lucide-react';

// Medical Monitor Component
function MedicalMonitor({ position }: { position: [number, number, number] }) {
  const { roomData } = useRoomStore();
  const heartbeatRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (heartbeatRef.current && roomData.occupancy) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 1;
      heartbeatRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      {/* Monitor stand */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Monitor screen */}
      <mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 6, 0]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Screen display */}
      <mesh position={[0, 1.2, 0.026]} rotation={[0, Math.PI / 6, 0]}>
        <planeGeometry args={[0.35, 0.25]} />
        <meshStandardMaterial 
          color={roomData.occupancy ? "#00ff88" : "#004400"} 
          emissive={roomData.occupancy ? "#00ff88" : "#002200"}
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Heartbeat indicator */}
      {roomData.occupancy && (
        <mesh ref={heartbeatRef} position={[0, 1.2, 0.03]} rotation={[0, Math.PI / 6, 0]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
        </mesh>
      )}
    </group>
  );
}

// IV Stand Component
function IVStand({ position }: { position: [number, number, number] }) {
  const bagRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (bagRef.current) {
      bagRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.1, 16]} />
        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Hook */}
      <mesh position={[0, 2, 0]} castShadow>
        <torusGeometry args={[0.08, 0.015, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* IV Bag */}
      <mesh ref={bagRef} position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#e0f0ff" 
          transparent 
          opacity={0.6} 
          metalness={0.1} 
          roughness={0.3}
        />
      </mesh>
      {/* Tube */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// Ceiling Light Component
function CeilingLight({ position, intensity }: { position: [number, number, number]; intensity: number }) {
  return (
    <group position={position}>
      {/* Light fixture */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.35, 0.15, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffff99" 
          emissiveIntensity={intensity * 0.5}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      {/* Light source */}
      <pointLight 
        position={[0, -0.1, 0]} 
        intensity={intensity * 1.5} 
        distance={8} 
        decay={2}
        color="#fff8e1"
        castShadow
      />
      {/* Glow effect */}
      {intensity > 0.5 && (
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial 
            color="#ffff99" 
            transparent 
            opacity={0.2} 
          />
        </mesh>
      )}
    </group>
  );
}

// Wall Art Component
function WallArt({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.9, 0.7, 0.05]} />
        <meshStandardMaterial color="#8b7355" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Picture */}
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>
      {/* Picture detail */}
      <mesh position={[0, -0.15, 0.027]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshStandardMaterial color="#90ee90" />
      </mesh>
    </group>
  );
}

// Curtains Component
function Curtains({ position, open }: { position: [number, number, number]; open: boolean }) {
  const leftCurtainRef = useRef<THREE.Mesh>(null);
  const rightCurtainRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (leftCurtainRef.current && rightCurtainRef.current) {
      const targetLeft = open ? -0.6 : 0;
      const targetRight = open ? 0.6 : 0;
      leftCurtainRef.current.position.x = THREE.MathUtils.lerp(leftCurtainRef.current.position.x, targetLeft, 0.05);
      rightCurtainRef.current.position.x = THREE.MathUtils.lerp(rightCurtainRef.current.position.x, targetRight, 0.05);
    }
  });

  return (
    <group position={position}>
      {/* Curtain rod */}
      <mesh position={[0, 0.75, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 2.1, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left curtain */}
      <mesh ref={leftCurtainRef} position={[0, 0, 0.02]} castShadow>
        <planeGeometry args={[1, 1.5]} />
        <meshStandardMaterial 
          color="#4a90e2" 
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Right curtain */}
      <mesh ref={rightCurtainRef} position={[0, 0, 0.02]} castShadow>
        <planeGeometry args={[1, 1.5]} />
        <meshStandardMaterial 
          color="#5a9cf2" 
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function RoomContent({ hovered, onWindowClick, onWindowHover, onWindowOut }: { hovered: boolean; onWindowClick: () => void; onWindowHover: () => void; onWindowOut: () => void; }) {
  const { roomData } = useRoomStore();

  const doorPivot = useRef<THREE.Group>(null);

  // Animate door swing based on doorOpen
  useFrame(() => {
    if (doorPivot.current) {
      const target = roomData.doorOpen ? -Math.PI / 2.5 : 0;
      doorPivot.current.rotation.y = THREE.MathUtils.lerp(doorPivot.current.rotation.y, target, 0.1);
    }
  });

  const lightIntensity = roomData.lighting ? 0.8 : 0.25;

  // Create wood texture procedurally
  const woodTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, 0, 512, 512);
    
    for (let i = 0; i < 100; i++) {
      ctx.strokeStyle = `rgba(101, 67, 33, ${Math.random() * 0.3})`;
      ctx.lineWidth = Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * 512);
      ctx.lineTo(512, Math.random() * 512);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  }, []);

  // Create fabric texture procedurally
  const fabricTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = '#ecf4ff';
    ctx.fillRect(0, 0, 256, 256);
    
    for (let i = 0; i < 256; i += 4) {
      for (let j = 0; j < 256; j += 4) {
        ctx.fillStyle = `rgba(220, 235, 255, ${Math.random() * 0.3})`;
        ctx.fillRect(i, j, 2, 2);
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      {/* Enhanced Lighting System */}
      <ambientLight intensity={lightIntensity * 0.4} />
      <directionalLight
        position={[5, 6, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <hemisphereLight intensity={0.3} color="#ffffff" groundColor="#888888" />
      
      {/* Ceiling Lights */}
      <CeilingLight position={[-2, 5.9, -2]} intensity={lightIntensity} />
      <CeilingLight position={[2, 5.9, 2]} intensity={lightIntensity} />
      
      {/* Window light when open */}
      {roomData.windowOpen && (
        <>
          <pointLight position={[-5.8, 3.5, -2]} intensity={0.8} color="#add8e6" distance={6} />
          <spotLight 
            position={[-5.5, 3.5, -2]} 
            angle={0.6} 
            intensity={0.3} 
            color="#add8e6"
            target-position={[0, 0, 0]}
          />
        </>
      )}

      {/* Floor with wood texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial 
          map={woodTexture}
          roughness={0.9} 
          metalness={0.0}
        />
      </mesh>

      {/* Back wall (Z = -6) */}
      <mesh position={[0, 3, -6]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#eef2f7" />
      </mesh>

      {/* Left wall (X = -6) */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-6, 3, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#f7fafc" />
      </mesh>

      {/* Right wall (X = 6) */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[6, 3, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#f7fafc" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Enhanced Bed with Medical Equipment */}
      <group position={[-1.5, 0, -3]}>
        {/* Bed Frame */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[2.2, 0.2, 1.5]} />
          <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Mattress with fabric texture */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[2.1, 0.3, 1.4]} />
          <meshStandardMaterial map={fabricTexture} color="#ffffff" roughness={0.8} />
        </mesh>
        {/* Pillow */}
        <mesh position={[-0.9, 0.8, 0]} castShadow>
          <boxGeometry args={[0.5, 0.15, 0.7]} />
          <meshStandardMaterial color="#f0f8ff" roughness={0.9} />
        </mesh>
        {/* Blanket */}
        <mesh position={[0.2, 0.75, 0]} castShadow>
          <boxGeometry args={[1.5, 0.12, 1.3]} />
          <meshStandardMaterial color="#add8e6" roughness={0.7} />
        </mesh>
        {/* Headboard with wood texture */}
        <mesh position={[-1.15, 1, 0]} castShadow>
          <boxGeometry args={[0.08, 1.2, 1.5]} />
          <meshStandardMaterial map={woodTexture} roughness={0.6} />
        </mesh>
        {/* Bed rails (safety) */}
        <mesh position={[0, 0.85, 0.73]} castShadow>
          <boxGeometry args={[2, 0.35, 0.04]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.85, -0.73]} castShadow>
          <boxGeometry args={[2, 0.35, 0.04]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Patient (Occupant) */}
        {roomData.occupancy && (
          <group position={[-0.7, 0.95, 0]}>
            {/* Head */}
            <mesh castShadow>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color="#ffdbac" roughness={0.9} />
            </mesh>
            {/* Body under blanket indicator */}
            <mesh position={[0.5, -0.15, 0]} castShadow>
              <boxGeometry args={[1, 0.25, 0.7]} />
              <meshStandardMaterial color="#add8e6" roughness={0.7} />
            </mesh>
          </group>
        )}
      </group>
      
      {/* Medical Equipment */}
      <MedicalMonitor position={[1, 0, -4.2]} />
      <IVStand position={[-3.2, 0, -3.5]} />

      {/* Enhanced Window on left wall with curtains */}
      <group position={[-5.95, 3, -2]}>
        <group onPointerOver={onWindowHover} onPointerOut={onWindowOut} onClick={onWindowClick}>
          {/* Window frame */}
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[2, 1.5, 0.12]} />
            <meshStandardMaterial map={woodTexture} color={hovered ? "#9a8060" : "#8b7355"} />
          </mesh>
          {/* Window glass */}
          <mesh rotation={[0, Math.PI / 2, 0]} position={[0.06, 0, 0]}>
            <planeGeometry args={[1.85, 1.35]} />
            <meshStandardMaterial 
              color="#add8e6" 
              transparent 
              opacity={roomData.windowOpen ? 0.3 : 0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          {/* Window panes (cross) */}
          <mesh rotation={[0, Math.PI / 2, 0]} position={[0.07, 0, 0]}>
            <boxGeometry args={[1.85, 0.04, 0.04]} />
            <meshStandardMaterial color="#ffffff" metalness={0.5} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} position={[0.07, 0, 0]}>
            <boxGeometry args={[0.04, 1.35, 0.04]} />
            <meshStandardMaterial color="#ffffff" metalness={0.5} />
          </mesh>
        </group>
        {/* Curtains */}
        <Curtains position={[0.2, 0, 0]} open={roomData.windowOpen} />
      </group>

      {/* Enhanced Door on right wall with wood texture */}
      <group position={[5.95, 0, 2]} ref={doorPivot}>
        {/* Door frame */}
        <mesh position={[-0.05, 1.2, -0.55]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.1, 2.4, 0.12]} />
          <meshStandardMaterial map={woodTexture} />
        </mesh>
        <mesh position={[-0.05, 1.2, 0.55]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.1, 2.4, 0.12]} />
          <meshStandardMaterial map={woodTexture} />
        </mesh>
        <mesh position={[-0.05, 2.4, 0]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.1, 0.12, 0.12]} />
          <meshStandardMaterial map={woodTexture} />
        </mesh>
        
        {/* Door panel */}
        <mesh position={[0, 1.2, 0]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1, 2.2, 0.05]} />
          <meshStandardMaterial 
            map={woodTexture} 
            color="#d4a574" 
            roughness={0.7} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Door panels (decorative) */}
        <mesh position={[0.03, 1.55, 0.25]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.35, 0.8, 0.02]} />
          <meshStandardMaterial color="#c9a063" roughness={0.6} />
        </mesh>
        <mesh position={[0.03, 1.55, -0.25]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.35, 0.8, 0.02]} />
          <meshStandardMaterial color="#c9a063" roughness={0.6} />
        </mesh>
        <mesh position={[0.03, 0.65, 0.25]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.35, 0.8, 0.02]} />
          <meshStandardMaterial color="#c9a063" roughness={0.6} />
        </mesh>
        <mesh position={[0.03, 0.65, -0.25]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.35, 0.8, 0.02]} />
          <meshStandardMaterial color="#c9a063" roughness={0.6} />
        </mesh>
        
        {/* Door knob */}
        <mesh position={[0.03, 1.05, -0.42]} castShadow>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.03, 1.05, -0.45]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.08, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Enhanced Nightstand */}
      <group position={[0.8, 0, -4]}>
        {/* Body */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.5]} />
          <meshStandardMaterial map={woodTexture} color="#a0826d" roughness={0.6} />
        </mesh>
        {/* Drawer */}
        <mesh position={[0.28, 0.5, 0]} castShadow>
          <boxGeometry args={[0.05, 0.15, 0.35]} />
          <meshStandardMaterial color="#8b7355" roughness={0.5} />
        </mesh>
        {/* Drawer handle */}
        <mesh position={[0.31, 0.5, 0]} castShadow>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Lower drawer */}
        <mesh position={[0.28, 0.25, 0]} castShadow>
          <boxGeometry args={[0.05, 0.15, 0.35]} />
          <meshStandardMaterial color="#8b7355" roughness={0.5} />
        </mesh>
        <mesh position={[0.31, 0.25, 0]} castShadow>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Table lamp */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.05, 0.15, 16]} />
          <meshStandardMaterial color="#4a90e2" roughness={0.7} />
        </mesh>
        <pointLight position={[0, 0.95, 0]} intensity={lightIntensity * 0.3} distance={2} color="#fff8e1" />
      </group>

      {/* Enhanced Chair */}
      <group position={[4.5, 0, 1]}>
        {/* Seat */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.6, 0.08, 0.6]} />
          <meshStandardMaterial color="#4a90e2" roughness={0.8} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.85, -0.25]} castShadow>
          <boxGeometry args={[0.6, 0.7, 0.08]} />
          <meshStandardMaterial color="#4a90e2" roughness={0.8} />
        </mesh>
        {/* Legs */}
        {[[-0.25, -0.25], [-0.25, 0.25], [0.25, -0.25], [0.25, 0.25]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.25, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
            <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>
      
      {/* Wall Decorations */}
      <WallArt position={[0, 4, -5.98]} />
      <WallArt position={[3, 3.5, -5.98]} />
      
      {/* Emergency Call Button */}
      <group position={[-1, 1.5, -5.95]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
          <meshStandardMaterial 
            color={roomData.emergency ? "#ff0000" : "#ff4444"} 
            emissive={roomData.emergency ? "#ff0000" : "#000000"}
            emissiveIntensity={roomData.emergency ? 0.8 : 0}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
        {roomData.emergency && (
          <pointLight position={[0, 0, 0.1]} intensity={1} distance={3} color="#ff0000" />
        )}
      </group>
    </group>
  );
}

const initialCameraPos: [number, number, number] = [7, 4, 7];
const initialTarget: [number, number, number] = [0, 1.2, -2];

function formatRelativeTime(ts: number | null) {
  if (!ts) return '—';
  const diffMs = Date.now() - ts;
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  return `${hr}h ago`;
}

interface Room3DProps {
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
}

const Room3D: React.FC<Room3DProps> = ({ 
  cameraPosition = initialCameraPos, 
  cameraTarget = initialTarget 
}) => {
  const [windowHovered, setWindowHovered] = React.useState(false);
  const [windowModalOpen, setWindowModalOpen] = React.useState(false);
  const [windowLastChanged, setWindowLastChanged] = React.useState<number | null>(null);
  const { roomData, updateRoomData } = useRoomStore();

  // Keyboard shortcuts while modal is open
  React.useEffect(() => {
    if (!windowModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWindowModalOpen(false);
      else if (e.key.toLowerCase() === 'o') { updateRoomData({ windowOpen: true }); setWindowLastChanged(Date.now()); }
      else if (e.key.toLowerCase() === 'c') { updateRoomData({ windowOpen: false }); setWindowLastChanged(Date.now()); }
      else if (e.key === 'Enter') { updateRoomData({ windowOpen: !roomData.windowOpen }); setWindowLastChanged(Date.now()); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [windowModalOpen, roomData.windowOpen, updateRoomData]);

  const controlsRef = React.useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  React.useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...cameraTarget);
      controlsRef.current.object.position.set(...cameraPosition);
      controlsRef.current.update();
    }
  }, [cameraPosition, cameraTarget]);

  return (
    <div className="relative w-full h-[480px] rounded-xl overflow-hidden bg-white">
      <Canvas shadows camera={{ position: cameraPosition, fov: 50 }}>
        <RoomContent
          hovered={windowHovered}
          onWindowClick={() => setWindowModalOpen(true)}
          onWindowHover={() => { setWindowHovered(true); document.body.style.cursor = 'pointer'; }}
          onWindowOut={() => { setWindowHovered(false); document.body.style.cursor = 'default'; }}
        />
        <OrbitControls
          ref={controlsRef}
          enablePan
          enableZoom
          enableRotate
          minDistance={4}
          maxDistance={20}
          target={new THREE.Vector3(...cameraTarget)}
          makeDefault
        />
      </Canvas>

      {/* UI overlay */}
      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-md px-3 py-2 shadow text-xs text-gray-700">
        <div>Drag to rotate • Scroll to zoom • Shift+Drag to pan</div>
      </div>

      {windowModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="window-title"
          onClick={(e) => { if (e.target === e.currentTarget) setWindowModalOpen(false); }}
        >
          <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-xl ring-1 ring-black/5 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5" />
                  <h2 id="window-title" className="text-base sm:text-lg font-semibold">Window Control</h2>
                </div>
                <button
                  className="p-2 rounded-md hover:bg-white/20 transition"
                  aria-label="Close"
                  onClick={() => setWindowModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-white/90">Manage window status with quick actions and keyboard shortcuts.</p>
            </div>

            {/* Content */}
            <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Status and metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${roomData.windowOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {roomData.windowOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Change</span>
                  <span className="flex items-center gap-1 text-gray-800">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {formatRelativeTime(windowLastChanged)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-gray-200 bg-white/70 p-3">
                    <div className="text-xs text-gray-500">Temperature</div>
                    <div className="text-sm font-semibold text-gray-900">{roomData.temperature ?? '—'}°C</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white/70 p-3">
                    <div className="text-xs text-gray-500">Air Quality</div>
                    <div className="text-sm font-semibold text-gray-900">{roomData.airQuality ?? '—'}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Shortcuts: O = Open, C = Close, Esc = Dismiss, Enter = Toggle</div>
              </div>

              {/* Preview animation */}
              <div className="rounded-xl border border-gray-200 bg-white/60 p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Window Preview</div>
                <div className="relative h-28 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 overflow-hidden">
                  {/* Frame */}
                  <div className="absolute inset-3 border-2 border-slate-400 rounded-md" />
                  {/* Pane that slides to indicate opening */}
                  <div className={`absolute left-3 top-3 bottom-3 w-1/2 bg-blue-200/60 border border-blue-300 rounded-sm transition-transform duration-300 ${roomData.windowOpen ? 'translate-x-24' : 'translate-x-0'}`} />
                  {/* Light glow when open */}
                  <div className={`absolute -right-10 top-0 bottom-0 w-24 bg-blue-300/30 blur-xl transition-opacity duration-300 ${roomData.windowOpen ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                <div className="mt-3 text-xs text-gray-600">Opening shows a sliding pane and soft light glow.</div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
              {roomData.windowOpen ? (
                <button
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-medium shadow hover:opacity-90 active:opacity-100 transition"
                  onClick={() => { updateRoomData({ windowOpen: false }); setWindowLastChanged(Date.now()); }}
                  autoFocus
                >
                  Close Window
                </button>
              ) : (
                <button
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-medium shadow hover:opacity-90 active:opacity-100 transition"
                  onClick={() => { updateRoomData({ windowOpen: true }); setWindowLastChanged(Date.now()); }}
                  autoFocus
                >
                  Open Window
                </button>
              )}
              <button
                className="px-4 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 text-sm font-medium shadow-sm hover:bg-gray-50 active:bg-gray-100 transition"
                onClick={() => setWindowModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room3D;