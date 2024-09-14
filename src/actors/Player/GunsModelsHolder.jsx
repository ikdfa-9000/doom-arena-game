import React, { useEffect, useRef } from 'react'
import { HandLeftModel } from '../../models/weapons/HandLeftModel.jsx'
import { ShotgunModel } from '../../models/weapons/ShotgunModel.jsx'
import { HARModel } from '../../models/weapons/HARModel.jsx'
import { SuperShotgunModel } from '../../models/weapons/SuperShotgunModel.jsx'
import { forwardRef } from 'react'
import { PlasmaGunModel } from '../../models/weapons/PlasmaGunModel.jsx'
import { MuzzleflashHandler } from './MuzzleflashHandler.jsx'

export const GunsModelsHolder = forwardRef((props, ref) => {

  return (
    <group ref={ref}>
      <MuzzleflashHandler 
        ref={props.muzzleGroupRef} 
        position={props.position} 
        weaponName={props.currWeaponName}> 
      </MuzzleflashHandler>
      <ShotgunModel ref={props.shotgunRef} position={props.position} rotation={props.rotation} scale={props.scale} />
      <HARModel ref={props.harRef} position={props.position} rotation={props.rotation} scale={props.scale} />
      <PlasmaGunModel ref={props.plasmaRef} position={props.position} rotation={props.rotation} scale={props.scale} />
      <SuperShotgunModel ref={props.superShotgunRef} position={props.position} rotation={props.rotation} scale={props.scale} />
      <HandLeftModel ref={props.handLeftRef} position={props.position} rotation={props.rotation} scale={props.scale} />
    </group>
  )
  })