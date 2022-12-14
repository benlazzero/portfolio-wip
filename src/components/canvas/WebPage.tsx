import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react'
import { shaderMaterial, MeshWobbleMaterial, useTexture, Sparkles } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

export default function WebPage(props) {
  const texture = useTexture('/mapper.png')
  const { z } = props
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
  const ref = useRef()
  let [isStopped, setStopped] = useState(false)
  
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    h: Math.floor(Math.random() * 2 + 1),
    w: Math.floor(Math.random() * 2 + 1)
  })
  
  useFrame((state) => {
    if (isStopped === false) {
      ref.current.position.set(data.x * width, (data.y), z*-1)
      if (data.y > height / 1.5) {
        data.y = -height / 1.5
      }
      setStopped(true)
    }
  }) 
  
  return (
      <Suspense fallback={null}>
        <mesh ref={ref}>
          <planeGeometry args={[data.w, data.h, 16, 16]} />
          <MeshWobbleMaterial factor={0.1} speed={3} color={"hotpink"} map={texture} transparent opacity={0.9}/>
        </mesh>
      </Suspense>
  )
}