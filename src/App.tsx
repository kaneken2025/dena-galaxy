import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Sidebar from './components/custom-ui/Sidebar';
import Header from './components/custom-ui/Header';
import DetailCard from './components/custom-ui/DetailCard';
import Galaxy from './components/3D/Galaxy';
import { Employee, SPHERE_RADIUS } from './data';
import './App.css';

export type FilterMode = 'ALL' | 'SYNC' | 'DEPT';

function App() {
  const [filterMode, setFilterMode] = useState<FilterMode>('ALL');
  const [selectedNode, setSelectedNode] = useState<Employee | null>(null);
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const handleHomeClick = () => {
    if (controlsRef.current && cameraRef.current) {
      const targetPosition = new THREE.Vector3(0, 0, SPHERE_RADIUS + 8);
      const targetLookAt = new THREE.Vector3(0, 0, 0);
      
      const startPosition = cameraRef.current.position.clone();
      const startTime = Date.now();
      const duration = 500;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        cameraRef.current!.position.lerpVectors(startPosition, targetPosition, easeProgress);
        controlsRef.current.target.lerp(targetLookAt, easeProgress);
        controlsRef.current.update();

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
    setSelectedNode(null);
  };

  const handleNodeClick = (employee: Employee) => {
    setSelectedNode(employee);
  };

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas
          camera={{ 
            position: [0, 0, SPHERE_RADIUS + 8], 
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          onCreated={({ camera }) => {
            cameraRef.current = camera as THREE.PerspectiveCamera;
          }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} />

          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />

          <Galaxy 
            filterMode={filterMode} 
            onNodeClick={handleNodeClick}
            selectedNode={selectedNode}
          />

          <OrbitControls 
            ref={controlsRef}
            enablePan={false}
            minDistance={SPHERE_RADIUS + 2}
            maxDistance={SPHERE_RADIUS + 15}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      <div className="ui-layer">
        <Sidebar currentMode={filterMode} onModeChange={setFilterMode} />

        <div className="header-container">
          <Header onHomeClick={handleHomeClick} />
        </div>

        <DetailCard node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
    </div>
  );
}

export default App
