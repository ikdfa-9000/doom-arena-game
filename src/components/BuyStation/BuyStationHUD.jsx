import React, { useState } from 'react'
import { WeaponPage } from './WeaponPage'
import classes from "./BuyStationHUD.module.css"

export const BuyStationHUD = (props) => {
    const [pageName, setPageName] = useState("weapon")

    const renderPage = (pageName) => {
        switch (pageName) {
            case "weapon":
                return ( <WeaponPage pointCount={props.pointCount}></WeaponPage> )
            case "upgrades":

            case "ammo":

            default:
                return ( <div>
                    <h1>If you see this message, it means that I fucked up and</h1>
                    <h1>you are not where you're supposed to be</h1>
                </div> )
        }
    }

    return (
        <div className={classes.buyStationContainer}>
            {renderPage(pageName)}
        </div>
    )
}
