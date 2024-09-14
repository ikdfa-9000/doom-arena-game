import React from 'react'
import { PickupBase } from "./PickupBase";
import { ArmorSmallModel } from '../../models/pickups/ArmorSmallModel';

export const ArmorSmallPickup = ({position = [0, 0, 0]}) => {
  return (
    <PickupBase type="healthAndArmor" statName="armor" maxStatName="maxArmor" count={5} message="Armor +5" respawnTime={15000} position={position}>
      <ArmorSmallModel scale={0.6} ></ArmorSmallModel>
    </PickupBase>
  )
}
