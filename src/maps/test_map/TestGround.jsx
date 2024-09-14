import { RigidBody } from '@react-three/rapier'
import React from 'react'

export const TestGround = ({position = [0, 0, 0], size = [100, 100, 100]}) => {
  return (
    <RigidBody>
        <mesh position={position} rotation-x={-Math.PI / 2}>
            <planeGeometry args={size} mass={0} type='Static'></planeGeometry>
            <meshStandardMaterial color="gray"/>
        </mesh>
    </RigidBody>
  )
}
