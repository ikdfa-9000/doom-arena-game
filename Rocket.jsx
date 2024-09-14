/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/ammo/rocket.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/rocket.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.rocket.geometry} material={materials['Material.001']} position={[0, 1.152, 0]} scale={[0.4, 1, 0.4]} />
    </group>
  )
}

useGLTF.preload('/rocket.glb')
