import React, { useState } from 'react'
import { CuboidCollider } from '@react-three/rapier'

export const PickupBase = (props) => {
  
  const [isPickable, setIsPickable] = useState(true)

  return (
    <group position={props.position} visible={isPickable}>
      { isPickable ? <CuboidCollider args={[1.4, 1.4, 1.4]} sensor
      onIntersectionEnter={({other}) => {
        if (other.rigidBodyObject.name === 'doomguy') {
          if (props.type == 'healthAndArmor') {
            if (other.rigidBodyObject.userData.giveHealthArmor(props.statName, props.maxStatName, props.count, props.message) == true) {
                setIsPickable(false)
                setTimeout(() => setIsPickable(true), props.respawnTime) 
            }
          } else if (props.type == "ammo") {
            if (other.rigidBodyObject.userData.giveAmmo(props.statName, props.count, props.message) == true) {
                setIsPickable(false)
                setTimeout(() => setIsPickable(true), props.respawnTime) 
            }
          }
        }
      }}
      ></CuboidCollider> : <></>}
        {props.children}
    </group>
  )
}
