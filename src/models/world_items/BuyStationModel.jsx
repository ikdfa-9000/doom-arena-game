/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/level_assets/buystation.glb 
*/
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function BuyStationModel ({scale = 1, ...props}) {
  const { nodes, materials } = useGLTF('models/level_assets/buystation.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube001.geometry} material={materials.buystation} scale={scale} position={[0, 1.067, 0]} />
    </group>
  )
}

useGLTF.preload('/buystation.glb')
