import { CylinderCollider, RigidBody } from '@react-three/rapier'
import { Vector3 } from 'three';
import React, { useRef, useState, useEffect, Suspense, forwardRef } from 'react'
import { usePlayerControls } from '../../hooks/usePlayerControls';
import { useFrame } from '@react-three/fiber';
import { GunsModelsHolder } from './GunsModelsHolder';
import { PointerLockControls } from '@react-three/drei'
import { MuzzleflashHandler } from './MuzzleflashHandler';
import { useThree } from '@react-three/fiber';

export const Player = forwardRef((props, ref) => {
  const SPEED = 10
  const jumpHeightMultiplier = 1;
  const rotation = new Vector3()
  let forwardVect = new Vector3
  let sideVect = new Vector3
  let cameraDirection = new Vector3
  const { camera } = useThree()
  const playerStats = {
    health: 100,
    armor: 100,
    ammo: 100,
    maxHealth: 100,
    maxArmor: 100,
    maxAmmo: 100,
    pointCount: 1000
  }

  const [ weaponPosition, setWeaponPosition ] = useState([0.45, -0.3, 0.5])
  const [ weaponRotation, setWeaponRotation ] = useState([0, -Math.PI * 1.05 , 0])
  const [ isWalking, setIsWalking ] = useState(false)
  const playerRef = useRef()
  const weaponsGroupRef = useRef()
  const muzzleGroupRef = useRef()
  const weaponsRef = {
    handLeftRef: useRef(),
    harRef: useRef(),
    shotgunRef: useRef(),
    plasmaRef: useRef(),
    superShotgunRef: useRef()
  }
  const [ canFire, setCanFire ] = useState(true)
  const availableWeapons = {
    shotgun: true,
    har: true,
    plasmaGun: true,
    superShotgun: true,
    chaingun: false,
    rocketLauncher: false,
    bfg: false
  }

  const weaponList = {
    shotgun: {
      name: 'shotgun',
      ammoType: 'shell',
      ammoUse: 1,
      fireTime: 1000,
      fireSelectTime: 1000, // Quickswitching time
      fireFunc: () => {
        muzzleGroupRef.current?.triggerMuzzleFlash()
        weaponsRef.shotgunRef.current?.play_animation('sg_shoot')
        weaponsRef.handLeftRef.current?.play_animation('sg_shoot')
      },
      selectTime: 200,
      deselectTime: 200,
      selectAction: 'sg_select',
      deselectAction: 'sg_deselect',
      fireAction: 'sg_shoot',
      idleAction: 'sg_hold',
      refName: 'shotgunRef',
    },
    har: {
      name: 'har',
      ammoType: 'bullets',
      ammoUse: 1,
      fireTime: 140,
      fireSelectTime: 300, // Quickswitching time
      fireFunc: () => {
        muzzleGroupRef.current?.triggerMuzzleFlash()
        weaponsRef.harRef.current?.play_animation('har_fire')
        weaponsRef.handLeftRef.current?.play_animation('har_fire')
      },
      selectTime: 200,
      deselectTime: 200,
      selectAction: 'har_select',
      deselectAction: 'har_deselect',
      fireAction: 'har_fire',
      idleAction: 'har_idle',
      refName: 'harRef',
    },
    plasmaGun: {
      name: 'plasmaGun',
      ammoType: 'cell',
      ammoUse: 1,
      fireTime: 100,
      fireSelectTime: 300, // Quickswitching time
      fireFunc: () => {
        muzzleGroupRef.current?.triggerMuzzleFlash()
        weaponsRef.plasmaRef.current?.play_animation('plasma_fire')
        weaponsRef.handLeftRef.current?.play_animation('plasma_fire')
      },
      selectTime: 450,
      deselectTime: 400,
      selectAction: 'plasma_select',
      deselectAction: 'plasma_deselect',
      idleAction: 'sg_hold',
      refName: 'plasmaRef',
    },
    superShotgun: {
      name: 'superShotgun',
      ammoType: 'shell',
      ammoUse: 2,
      fireTime: 1800,
      fireSelectTime: 300, // Quickswitching time
      fireFunc: () => {
        muzzleGroupRef.current?.triggerMuzzleFlash()
        weaponsRef.superShotgunRef.current?.play_animation('ssg_fire_reload')
        weaponsRef.handLeftRef.current?.play_animation('ssg_fire_reload')
      },
      selectTime: 450,
      deselectTime: 200,
      selectAction: 'ssg_select',
      deselectAction: 'ssg_deselect',
      fireAction: 'ssg_fire_reload',
      idleAction: 'ssg_hold',
      refName: 'superShotgunRef',
    }}
  
  const [ currentWeapon, setCurrentWeapon ] = useState(weaponList.shotgun) // shotgun

  const [ currentAmmo, setCurrentAmmo ] = useState({
    shell: 10,
    bullets: 50,
    rockets: 5,
    cell: 50,
    bfgcells: 1
  })
  const [ maxAmmo, setMaxAmmo ] = useState({ // can be upgraded
    shell: 30,
    bullets: 120,
    rockets: 12,
    cell: 120,
    bfgcells: 3
  })

  const controlsStatus = usePlayerControls()

  const switchWeapon = (nextWeaponRef, nextWeaponName) => {
    if (!availableWeapons[nextWeaponName]) return
    setCanFire(false)
    setTimeout(() => setCanFire(true), currentWeapon.deselectTime + weaponList[nextWeaponName].selectTime)
    weaponsRef[currentWeapon.refName].current?.play_animation(currentWeapon.deselectAction);
    weaponsRef.handLeftRef.current?.play_animation(currentWeapon.deselectAction)
    setTimeout(() => {
      weaponsRef[currentWeapon.refName].current?.setVisibilityStatus(false)
      nextWeaponRef.current?.setVisibilityStatus(true)
      let nextWeapon = 0
      console.log("Weapon selected: ", weaponList[nextWeaponName])
      nextWeapon = weaponList[nextWeaponName]
      setCurrentWeapon(weaponList[nextWeaponName])
      nextWeaponRef.current?.play_animation(nextWeapon.selectAction);
      props.hudChanger("gunName", nextWeapon.name)
      props.hudChanger("ammo", currentAmmo[nextWeapon.ammoType])
      props.hudChanger("maxAmmo", maxAmmo[nextWeapon.ammoType])
      weaponsRef.handLeftRef.current?.play_animation(nextWeapon.selectAction)
    }, currentWeapon.deselectTime)
  }

  useEffect(() => {
    props.hudChanger("gunName", currentWeapon.name)
    props.hudChanger("ammo", currentAmmo[currentWeapon.ammoType])
    props.hudChanger("maxAmmo", maxAmmo[currentWeapon.ammoType])
    props.hudChanger("health", playerStats.health)
    props.hudChanger("maxHealth", playerStats.maxHealth)
    props.hudChanger("armor", playerStats.armor)
    props.hudChanger("maxArmor", playerStats.maxArmor)
    props.hudChanger("pointCount", playerStats.pointCount)
  }, [])

  // TODO: Walking animation
  useEffect(() => {
    console.log(isWalking ? "I'm walking!" : "I stopped walking")
  }, [isWalking])

  const giveAmmo = (ammoName, count, message = "A pickup") => {
    if (currentAmmo[ammoName] == maxAmmo[ammoName]) {
      return false
    }
    currentAmmo[ammoName] += count
    // weird way to clamp things
    currentAmmo[ammoName] = currentAmmo[ammoName] <= 0 
    ? 0 
    : currentAmmo[ammoName] >= maxAmmo[ammoName] 
      ? maxAmmo[ammoName] 
      : currentAmmo[ammoName]
    if (currentWeapon.ammoType == ammoName) {
      props.hudChanger("ammo", currentAmmo[ammoName])
    }
    console.log("Picked up ammo! " + ammoName)
    props.hudChanger("message", " ")
    requestAnimationFrame(() => props.hudChanger("message", message)) // doing this so useEffect on hud triggers
    return true
  }

  const giveHealthArmor = (statName, maxStatName, count, message = "A pickup") => {
    if (playerStats[statName] == playerStats[statName]) {
      return false
    }
    playerStats[statName] += count
    // weird way to clamp things
    playerStats[statName] = playerStats[statName] <= 0 
    ? 0 
    : playerStats[statName] >= playerStats[maxStatName] 
      ? playerStats[maxStatName]
      : playerStats[statName]
    props.hudChanger(statName, playerStats[statName])
    console.log("Picked up " + statName + ": " + playerStats[statName])
    props.hudChanger("message", " ")
    requestAnimationFrame(() => props.hudChanger("message", message)) // doing this so useEffect on hud triggers
    return true
  }

  
  useFrame((state, delta, xrFrame) => {
    if (!playerRef.current) return 

    // MOVEMENT
    camera.getWorldDirection(cameraDirection)
    forwardVect.setFromMatrixColumn(camera.matrix, 0)
    forwardVect.crossVectors(camera.up, forwardVect)
    sideVect.setFromMatrixColumn(camera.matrix, 0)
    const currentVelocity = playerRef.current.linvel()
    const velocity = new Vector3(0, currentVelocity.y, 0)
    velocity
      .add(forwardVect.clone().multiplyScalar(SPEED * (controlsStatus.forward - controlsStatus.backward)))
      .add(sideVect.clone().multiplyScalar(SPEED * (controlsStatus.right - controlsStatus.left)))
    velocity.clampLength(-SPEED, SPEED)
    velocity.y = currentVelocity.y
    playerRef.current.setLinvel({
      x: velocity.x,
      y: velocity.y,
      z: velocity.z
    }, true)

    // TODO: Walking animation
    if (playerRef.current.linvel() > 0) 
    {
      setIsWalking(true);
    }
    else
    {
      setIsWalking(false);
    }

    const { x, y, z } = playerRef.current.translation();
    // Camera position
    camera.position.set(x, y + 0.5, z)
    // Weapon position
    weaponsGroupRef.current?.rotation.copy(state.camera.rotation)
    weaponsGroupRef.current?.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation))
  
    // FIRING
    // Standard firing
    if (canFire && controlsStatus.fire && currentAmmo[currentWeapon.ammoType] >= currentWeapon.ammoUse) {
      setCurrentAmmo(
        {
          ...currentAmmo,
          [currentWeapon.ammoType]: currentAmmo[currentWeapon.ammoType] - currentWeapon.ammoUse
        }
      )
      props.hudChanger("ammo", currentAmmo[currentWeapon.ammoType]  - currentWeapon.ammoUse)
      console.log("Firing with weapon: ", currentWeapon)
      setCanFire(false) 
      currentWeapon.fireFunc()
      setTimeout(() => {
        setCanFire(true)
      }, currentWeapon.fireTime)
    }
    })
    // WEAPON SWITCHING
    // чуть переписать
    if (canFire && controlsStatus.selectSuperShotgun && currentWeapon.name != "superShotgun") {
      console.log("Switching!")
      switchWeapon(weaponsRef.superShotgunRef, "superShotgun")
    }
    if (canFire && controlsStatus.selectShotgun && currentWeapon.name != "shotgun") {
      console.log("Switching!")
      switchWeapon(weaponsRef.shotgunRef, "shotgun")
    }
    if (canFire && controlsStatus.selectPlasma && currentWeapon.name != "plasmaGun") {
      console.log("Switching!")
      switchWeapon(weaponsRef.plasmaRef, "plasmaGun")
    }
    if (canFire && controlsStatus.selectHAR && currentWeapon.name != "har") {
      console.log("Switching!")
      switchWeapon(weaponsRef.harRef, "har")
    }
  return (
    <>
    <PointerLockControls></PointerLockControls>
    <RigidBody
        lockRotations={true}
        mass={100}
        canSleep={false}
        ref={playerRef} name='doomguy'
        userData={{ giveAmmo, giveHealthArmor }}>
        <mesh>
          <capsuleGeometry  args={[1, 1, 1.6]}></capsuleGeometry>
        </mesh>
    </RigidBody>
    <Suspense>
      <GunsModelsHolder
        muzzleGroupRef={muzzleGroupRef}
        currWeaponName={currentWeapon.name}
        ref={weaponsGroupRef} 
        position={weaponPosition} 
        rotation={weaponRotation} 
        scale={[0.5, 0.5, 0.5]}
        handLeftRef={weaponsRef.handLeftRef}
        shotgunRef={weaponsRef.shotgunRef}
        harRef={weaponsRef.harRef}
        plasmaRef={weaponsRef.plasmaRef}
        superShotgunRef={weaponsRef.superShotgunRef}
      >
      </GunsModelsHolder>
    </Suspense>
    </>
  )
})
