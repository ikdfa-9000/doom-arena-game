import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'

export const Particle = ({texture, speed}) => {

  const planeRef = useRef();
  const particleTexture = useTexture(texture)

  useFrame((state, delta, xrFrame) => 
  {

  })

  return (
    <mesh ref={planeRef}>
      <planeGeometry></planeGeometry>
      <meshStandardMaterial></meshStandardMaterial>
    </mesh>
  )
}
