import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Employee, EMPLOYEES, ME, SPHERE_RADIUS } from '../../data';
import { FilterMode } from '../../App';

interface GalaxyProps {
  filterMode: FilterMode;
  onNodeClick: (employee: Employee) => void;
  selectedNode: Employee | null;
}

export default function Galaxy({ filterMode, onNodeClick, selectedNode }: GalaxyProps) {
  const [hoveredNode, setHoveredNode] = useState<Employee | null>(null);

  // Calculate which nodes are "target" (highlighted) based on filter mode
  const isTarget = (emp: Employee): boolean => {
    switch (filterMode) {
      case 'ALL':
        return true;
      case 'SYNC':
        return emp.year === ME.year;
      case 'DEPT':
        return emp.dept === ME.dept;
      default:
        return true;
    }
  };

  // Calculate connection lines based on filter mode
  const connectionLines = useMemo(() => {
    if (filterMode === 'ALL') return [];

    const targetEmployees = EMPLOYEES.filter(isTarget);
    const lines: [THREE.Vector3, THREE.Vector3][] = [];

    // Create pairs for connections
    for (let i = 0; i < targetEmployees.length; i++) {
      for (let j = i + 1; j < targetEmployees.length; j++) {
        lines.push([
          new THREE.Vector3(...targetEmployees[i].position),
          new THREE.Vector3(...targetEmployees[j].position),
        ]);
      }
    }

    return lines;
  }, [filterMode]);

  return (
    <group>
      {/* Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS, 32, 32]} />
        <meshBasicMaterial 
          color="#1e3a5f" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* Connection Lines */}
      {connectionLines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#4a9eff"
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}

      {/* Employee Nodes */}
      {EMPLOYEES.map((emp) => (
        <EmployeeNode
          key={emp.id}
          employee={emp}
          isTarget={isTarget(emp)}
          isMe={emp.id === 'me'}
          isHovered={hoveredNode?.id === emp.id}
          isSelected={selectedNode?.id === emp.id}
          onHover={(hovered) => setHoveredNode(hovered ? emp : null)}
          onClick={() => onNodeClick(emp)}
        />
      ))}

      {/* Hover Tooltip */}
      {hoveredNode && (
        <Html
          position={hoveredNode.position}
          center
          style={{
            transform: 'translate3d(0, -40px, 0)',
            pointerEvents: 'none',
          }}
        >
          <div className="bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap border border-slate-700">
            {hoveredNode.name}
          </div>
        </Html>
      )}
    </group>
  );
}

interface EmployeeNodeProps {
  employee: Employee;
  isTarget: boolean;
  isMe: boolean;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}

function EmployeeNode({ 
  employee, 
  isTarget, 
  isMe, 
  isHovered, 
  isSelected,
  onHover, 
  onClick 
}: EmployeeNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animate scale on hover
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered || isSelected ? 1.3 : 1;
      const baseScale = isMe ? 1.5 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(baseScale * targetScale, baseScale * targetScale, baseScale * targetScale),
        0.1
      );
    }
  });

  // Calculate opacity based on target status
  const opacity = isTarget ? 1.0 : 0.15;
  
  // Calculate color - use gray for non-target nodes
  const displayColor = isTarget ? employee.color : '#666666';

  return (
    <mesh
      ref={meshRef}
      position={employee.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial 
        color={displayColor} 
        transparent 
        opacity={opacity}
        emissive={displayColor}
        emissiveIntensity={isHovered || isSelected ? 0.5 : 0.2}
      />
    </mesh>
  );
}
