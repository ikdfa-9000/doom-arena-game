import React from 'react'
import { PickupBase } from "../pickups/PickupBase";
import { BulletsModel } from '../../models/ammo/BulletsModel'

export const BulletsAmmo = ({position = [0, 0, 0]}) => {
  return (
    <PickupBase type="ammo" statName="bullets" count={25} respawnTime={10000} position={position} message="Bullets +25">
      <BulletsModel scale={0.4}></BulletsModel>
    </PickupBase>
  )
}
