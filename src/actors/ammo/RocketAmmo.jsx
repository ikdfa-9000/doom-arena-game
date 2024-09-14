import React from 'react'
import { PickupBase } from "../pickups/PickupBase";
import { RocketModel } from '../../models/ammo/RocketModel'

export const RocketAmmo = ({position = [0, 0, 0]}) => {
  return (
    <PickupBase type="ammo" statName="rocket" count={1} respawnTime={10000} position={position} message="Rocket Ammo +1">
      <RocketModel scale={0.5}></RocketModel>
    </PickupBase>
  )
}
