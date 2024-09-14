import React from 'react'
import { PickupBase } from "../pickups/PickupBase";
import { ShellsModel } from '../../models/ammo/ShellsModel'

export const ShellsAmmo = ({position = [0, 0, 0]}) => {
  return (
    <PickupBase type="ammo" statName="shell" count={8} respawnTime={10000} position={position} message="Shells +8">
      <ShellsModel scale={0.5}></ShellsModel>
    </PickupBase>
  )
}