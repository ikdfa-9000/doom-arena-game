import React from 'react'
import { RigidBody } from '@react-three/rapier'

export const TestCube = ({ position = [0, 0, 0], size = [1, 1, 1], rotation = [0, 0, 0]}) => {
  return (
    <RigidBody>
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color="white" />
        </mesh>
    </RigidBody>
  )
}
