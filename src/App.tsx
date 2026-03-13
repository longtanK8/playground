import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import type { Mesh } from 'three'
import './App.css'

function RotatingCube() {
  const meshRef = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.8
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#a855f7" wireframe />
      </mesh>
    </Float>
  )
}

function App() {
  return (
    <div className="game-root">
      {/* 3D background canvas */}
      <div className="canvas-bg">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={80} depth={50} count={4000} factor={4} fade speed={1} />
          <RotatingCube />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Overlay UI */}
      <div className="overlay">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="hero-text"
        >
          <motion.h1
            className="title"
            animate={{ textShadow: ['0 0 8px #a855f7', '0 0 24px #7c3aed', '0 0 8px #a855f7'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Hello World
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            React · Three.js · Framer Motion · Tailwind CSS
          </motion.p>
        </motion.div>

        <motion.div
          className="badges"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {['React 19', 'React Three Fiber', 'Drei', 'Framer Motion', 'Tailwind CSS'].map((lib) => (
            <span key={lib} className="badge">
              {lib}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default App
