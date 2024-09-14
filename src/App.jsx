import { Canvas } from '@react-three/fiber'
import './App.css'
import { TestGround } from './maps/test_map/TestGround'
import { Physics } from '@react-three/rapier'
import { Player } from './actors/Player/Player.jsx'
import { HUD } from './components/HUD/HUD.jsx'
import { useRef, useState } from 'react'
import { ShellsAmmo } from './actors/ammo/ShellsAmmo.jsx'
import { CellAmmo } from './actors/ammo/CellAmmo.jsx'
import { HealthSmallPickup } from './actors/pickups/HealthSmallPickup.jsx'
import { ArmorSmallPickup } from './actors/pickups/ArmorSmallPickup.jsx'
import { HealthBigPickup } from './actors/pickups/HealthBigPickup.jsx'
import { BulletsAmmo } from './actors/ammo/BulletsAmmo.jsx'
import { RocketAmmo } from './actors/ammo/RocketAmmo.jsx'
import { BuyStation } from './actors/world_items/BuyStation.jsx'
import { BuyStationHUD } from './components/BuyStation/BuyStationHUD.jsx'

const App = () => {

  const playerRef = useRef();

  const [playerStats, setPlayerStats] = useState(
    {
      gunName: "shotgun",
      health: 100,
      maxHealth: 100,
      maxArmor: 100,
      armor: 100,
      ammo: 0,
      maxAmmo: 1,
      message: "", // unused rn
      pointCount: 1000
    }
  )

  const changePlayerStat = (field, value) => 
    {
      setPlayerStats((prevState) => ({
        ...prevState,
        [field]: value
      }))} 

  return (
  <div className='gameDiv'>
    <HUD
      weaponName={playerStats.gunName}
      health={playerStats.health}
      maxHealth={playerStats.maxHealth}
      armor={playerStats.armor}
      maxArmor={playerStats.maxArmor}
      ammo={playerStats.ammo}
      maxAmmo={playerStats.maxAmmo}
      pointCount={playerStats.pointCount}
      message={playerStats.message}
    ></HUD>
    {/* <BuyStationHUD
      pointCount={playerStats.pointCount}
    ></BuyStationHUD> */}
    <Canvas className='canvas'>
      <ambientLight intensity={1} />
      <directionalLight></directionalLight>
      <Physics gravity={[0, -10, 0]}>
        <TestGround position={[0, -2, -3]}></TestGround>
        <BuyStation scale={0.2} position={[-8, -3.25, -3]}></BuyStation>
        <ShellsAmmo position={[0, -1.75, -3]}/>
        <CellAmmo position={[2, -1.75, -3]}/>
        <BulletsAmmo position={[6, -1.75, -3]}></BulletsAmmo>
        <RocketAmmo position={[-6, -1.75, -3]}></RocketAmmo>
        <HealthSmallPickup position={[-2, -2.05, -3]} />
        <HealthBigPickup position={[-4, -2.65, -3]}/>
        <ArmorSmallPickup position={[4, -2, -3]}/>
        <Player
          ref={playerRef}
          hudChanger={changePlayerStat}
        ></Player>
      </Physics>
    </Canvas>
  </div>
  )
}

export default App
