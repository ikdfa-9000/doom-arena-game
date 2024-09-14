import React from 'react'
import { PickupBase } from "./PickupBase";
import { HealthBigModel } from '../../models/pickups/HealthBigModel';

export const HealthBigPickup = ({position = [0, 0, 0]}) => {
  return (
    <PickupBase type="healthAndArmor" statName="health" maxStatName="maxHealth" message="Health +20" respawnTime={15000} count={20} position={position}>
      <HealthBigModel scale={0.5} ></HealthBigModel>
    </PickupBase>
  )
}