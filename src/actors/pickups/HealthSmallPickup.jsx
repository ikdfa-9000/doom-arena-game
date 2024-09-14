import React from 'react'
import { PickupBase } from "./PickupBase";
import { HealthSmallModel } from '../../models/pickups/HealthSmallModel';

export const HealthSmallPickup = ({position = [0, 0, 0]}) => {
  return (
    <PickupBase type="healthAndArmor" statName="health" maxStatName="maxHealth" respawnTime={15000} count={4} position={position} message="Health +4">
      <HealthSmallModel scale={0.6} ></HealthSmallModel>
    </PickupBase>
  )
}
