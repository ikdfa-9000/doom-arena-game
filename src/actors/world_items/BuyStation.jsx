import React from 'react'
import { BuyStationModel } from '../../models/world_items/BuyStationModel'
import { RigidBody, CuboidCollider } from '@react-three/rapier'

export const BuyStation = ({position = [0, 0, 0], scale = 1}) => {
  return (
    <RigidBody type="fixed" position={position}>
      <BuyStationModel scale={scale}></BuyStationModel>
    </RigidBody>
  )
}
