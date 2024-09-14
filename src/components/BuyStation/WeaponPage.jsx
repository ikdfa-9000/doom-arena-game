import React, { useState } from 'react'
import HARPicture from '../../assets/buystation/har_buy.png'
import PlasmaPicture from '../../assets/buystation/plasma_buy.png'
import SuperShotgunPicture from '../../assets/buystation/supershotgun_buy.png'
import classes from './WeaponPage.module.css'

export const WeaponPage = (props) => {

  const weaponsList = [ 
    {
      name: "Heavy Assault Rifle",
      image: HARPicture,
      descriptions: ["Crafted with cutting-edge technology and precision engineering, the Heavy Assault Rifle \
                delivers unparalleled performance on the battlefield. Its sleek design and ergonomic grip \
                ensure maximum comfort and control, allowing you to mow down hordes of demons without breaking a sweat.",
                "With a rapid rate of fire and pinpoint accuracy, this beast of a weapon will have your foes \
                running for cover as you dominate the fight. Whether you're taking on waves \
                of hellish creatures or engaging in intense multiplayer battles, \
                the Heavy Assault Rifle will be your go-to tool for total carnage."
              ],
      cost: 2000
    }, 
    {
      name: "Plasma Rifle",
      image: PlasmaPicture,
      descriptions: ["The Plasma Rifle roars to life with a crackling energy that pulses with raw power, \
                ready to sear through any demon foolish enough to stand in your way. Its sleek design and \
                ergonomic grip provide unparalleled comfort and control, ensuring that every shot you unleash \
                is a precise strike that incinerates your foes with unparalleled efficiency.",
                "Whether you're facing a horde of relentless demons or engaging in intense battles, the Plasma Rifle \
                will be your trusted companion, delivering unmatched firepower and unrivaled efficiency."
              ],
      cost: 10000
    },
    {
      name: "Super Shotgun",
      image: SuperShotgunPicture,
      descriptions: ["The DOOM 2016 Super Shotgun is not just a weapon – it's a force of nature. This beast of a gun packs a serious punch, \
                delivering devastating close-range blasts that obliterate anything in your path. Its double-barrel design and \
                rapid-fire capability make it the ultimate weapon for unleashing chaos and destruction upon your enemies. ",
                "With its sleek, futuristic design and satisfyingly loud boom, the Super Shotgun is sure to make you feel like a total \
                badass as you tear through hordes of demons with ease. Don't miss out on the chance to add this powerhouse \
                weapon to your arsenal!"
              ],
      cost: 20000
    }, ]
  const [currWeapon, setCurrWeapon] = useState(weaponsList[0]);
  const [isVisibleDescr, setIsVisibleDescr] = useState(false);

  return (
    <div className={classes.weaponPageContainer}>
        <div className={classes.leftSide}>
            <h1 className={classes.header}>WEAPON SHOP</h1>
            { weaponsList.map((thing) => {
                return (
                    <button 
                    className={classes.weaponButton}
                    onClick={() => {
                      setCurrWeapon(thing)
                      setIsVisibleDescr(true)
                      }}>
                        <p className={classes.weaponName}>{thing.name}</p>
                    </button>
                )
            }) }
            <h1 className={classes.pointCount}>Points available: {props.pointCount}</h1>
        </div>
        { isVisibleDescr ? 
          ( <div key={currWeapon.name} className={classes.rightSide}>
            <h1 className={classes.headerWeapon}>{currWeapon.name}</h1>
            <div className={classes.imageCenterer}>
              <img src={currWeapon.image} className={classes.imageGun}></img>
            </div>
            <div className={classes.bottomSide}>
              <div className={classes.weaponDescription}>
                {
                  currWeapon.descriptions.map((description) => 
                  {
                    return (
                      <p>{description}</p>
                  )
                  }) }
              </div>
              <div className={classes.costAndBuy}>
                <h1 className={classes.cost}>COST: {currWeapon.cost}</h1>
                <div className={classes.buttonCenterer}>
                  <button className={classes.weaponBuyButton}>
                    <p className={classes.weaponBuyButtonText}>BUY</p>
                  </button>
                </div>
              </div>
            </div>
          </div> )
        : (<div style={{width: "60%"}}></div>) }
    </div>
  )
}
