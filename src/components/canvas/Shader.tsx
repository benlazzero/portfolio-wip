import glsl from "babel-plugin-glsl/macro"
import * as THREE from 'three'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useRef, useState } from "react"

export default function Shader() {
  const ref = useRef()
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1]
  })

  const WaveShaderMaterial = shaderMaterial(
    // Uniform
    {},
    // Vertex Shader
    glsl`
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4
        (position, 1.0);
      }
    `,
    // Fragment Shader
    glsl`
      void main() {
        gl_FragColor = vec4(0.0, 0.4, 1.0, 1.0);
      }
    `
  )
  extend({ WaveShaderMaterial })
  
  useFrame(() => {
    ref.current.rotation.y += 0.01
  })
  
  return (
    <animated.mesh ref={ref} scale={props.scale} onClick={() => setActive(!active)} >
      <planeBufferGeometry args={[3, 5]} />
      <waveShaderMaterial />
    </animated.mesh>
  )

}

