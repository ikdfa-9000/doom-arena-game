import React from 'react'
import { PickupBase } from "../pickups/PickupBase";
import { CellModel } from '../../models/ammo/CellModel'

export const CellAmmo = ({position = [0, 0, 0]}) => {
  return (
    <PickupBase type="ammo" statName="cell" count={25} respawnTime={10000} position={position} message="Cells +50">
      <CellModel scale={0.5}></CellModel>
    </PickupBase>
  )
}
