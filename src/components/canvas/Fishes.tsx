import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, Suspense, Fragment } from 'react'
import { shaderMaterial, useGLTF } from "@react-three/drei";
import { useSpring, animated } from '@react-spring/three'

function Fish({...props}) {
  const mesh = useRef()
  const { nodes, materials } = useGLTF('/texture/fish-transformed.glb')
  const [active, setActive] = useState(false)
  const springs = useSpring({ color: active ? 'red' : 'blue' })
  
  const spring = useSpring({
    color: active ? "hotpink" : "blue"
  });

  return (
    <animated.mesh 
      ref={mesh}
      geometry={nodes.fish.geometry} 
      {...props} 
      scale={0.04}
      material-color = {spring.color}
      onClick={() => setActive(!active)}
      >
    </animated.mesh>
  )
}

function FishGroup(props) {
  const ref = useRef()
  const { viewport } = useThree()
  
  useFrame(() => {
    ref.current.position.x += 0.05 
    if (ref.current.position.x > viewport.width / 1.3) {
      ref.current.position.x = -viewport.width / 1.3
    }
  })
  
  return (
    <group ref={ref} scale={0.04} {...props}>
      <Fish position={[0, 0, 0]} />
      <Fish position={[19, 10, 0]} />
      <Fish position={[-19, -10, 0]} />
      <Fish position={[-17, 8, 0]} />
    </group>
  )
}

  

export default function Fishes() {
  return (
    <Suspense fallback={null}>
      <FishGroup position={[-1, 0, 0]} />
    </Suspense>
  )
}