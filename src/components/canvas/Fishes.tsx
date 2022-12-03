import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, Suspense, Fragment, useEffect, forwardRef, Children } from 'react'
import { shaderMaterial, useGLTF, Float } from "@react-three/drei";
import { useSpring, animated } from '@react-spring/three'

function Fish({...props}) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/texture/fish-transformed.glb')
  const [active, setActive] = useState(false)
  const { viewport, camera } = useThree()
  
  return (
    <Float floatIntensity={5} floatingRange={[1, 3]} speed={4}>
      <animated.mesh 
        ref={ref}
        geometry={nodes.fish.geometry} 
        {...props} 
        scale={0.04}
        material-color = {"yellow"}
        >
      </animated.mesh>
    </Float>
  )
}

function FishGroup(props) {
  const ref = useRef()
  let { z } = props
  const { viewport, camera } = useThree()
  let { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
  
  useFrame(() => {
    ref.current.position.x += 0.02 
    if (ref.current.position.x > width / 1.5) {
      ref.current.position.x = -width / 1.5
    }
  })
  
  return (
    <group ref={ref} scale={0.04} {...props} innerRef={ref}>
      <Fish position={[0, 0, -15]} />
      <Fish position={[19, 10, 0]} />
      <Fish position={[-19, -10, -2]} />
      <Fish position={[-17, 8, 0]} />
      <Fish position={[-11, 8, -3]} />
    </group>
  )
}

export default function Fishes() {
  const z = 0
  
  return (
    <Suspense fallback={null}>
      <FishGroup position={[-1, 0, z]} z={z} />
    </Suspense>
  )
}
