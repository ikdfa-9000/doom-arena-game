import React, { useEffect } from 'react'
import classes from './HUD.module.css'
import HealthIcon from '../../assets/HUD/HealthIcon.png'
import ArmorIcon from '../../assets/HUD/ArmorIcon.png'
import PointsIcon from '../../assets/HUD/PointsIcon.png'
import ShotgunIcon from '../../assets/HUD/ShotgunIcon.png'
import SuperShotgunIcon from '../../assets/HUD/SuperShotgunIcon.png'
import HARIcon from '../../assets/HUD/HARIcon.png'
import PlasmaIcon from '../../assets/HUD/PlasmaIcon.png'
import ShotgunReticle from '../../assets/HUD/Reticles/ShotgunReticle.png'
import HARReticle from '../../assets/HUD/Reticles/HARReticle.png'
import SuperShotgunReticle from '../../assets/HUD/Reticles/SuperShotgunReticle.png'
import PlasmaGunReticle from '../../assets/HUD/Reticles/PlasmaGunReticle.png'

export const HUD = (props) => {
  const weaponIcons = {
    shotgun: ShotgunIcon,
    har: HARIcon,
    superShotgun: SuperShotgunIcon,
    plasmaGun: PlasmaIcon,
  }

  const weaponReticles = {
    shotgun: ShotgunReticle,
    har: HARReticle,
    superShotgun: SuperShotgunReticle,
    plasmaGun: PlasmaGunReticle,
  }

  useEffect(() => {
    console.log("Changed pickup message to " + props.message)
  }, [props.message])

  return (
    <div className={classes.hudContainer}>
      <div className={classes.scoreDiv}>
        <img className={classes.scoreImg} src={PointsIcon}></img>
        <h1 className={classes.scoreCounter}>{props.pointCount}</h1>
      </div>
      <div key={props.message} className={classes.messageDiv}>
        <h1>{props.message}</h1>
      </div>
      <div className={classes.leftContainer}>
        <div className={classes.armorContainer}>
          <h1 className={classes.mediumCounter}>{props.armor}</h1>
          <img className={classes.armorImg} src={ArmorIcon} ></img>
          <div className={classes.armorBar}>
            <div className={classes.armorBarFill}
            style={{width: props.armor / props.maxArmor * 100 + "%"}} ></div>  
          </div>
        </div>
        <div className={classes.healthContainer}>
          <h1 className={classes.bigCounter}>{props.health}</h1>
          <img className={classes.healthImg} src={HealthIcon} ></img>
          <div className={classes.healthBar}>
            <div className={classes.healthBarFill}
              style={{width: props.health / props.maxHealth * 100 + "%"}} 
              ></div>  
          </div>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.ammoDiv}>
          <div className={classes.ammoNumDiv}>
          <h1 align="right" className={classes.ammoCounter}>{props.ammo}</h1>
          </div>
          <div className={classes.ammoBar}>
            <div
            style={{width: props.ammo / props.maxAmmo * 100 + "%"}} 
            className={classes.ammoBarFill}></div>  
          </div>
        </div>
        <img className={classes.gunImg} src={weaponIcons[props.weaponName]}></img> 
      </div>
      <img className={classes.reticle} src={weaponReticles[props.weaponName]}></img>
    </div>
  )
}
