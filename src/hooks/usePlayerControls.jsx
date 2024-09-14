import React, { useEffect, useState } from 'react'

export const usePlayerControls = () => {
    // Объект формата "клавиша: действие"
    const keys_controls = {
        // Movement
        KeyW: 'forward',
        KeyA: 'left',
        KeyS: 'backward',
        KeyD: 'right',
        Space: 'jump',
        // Weapons Select
        Digit1: 'selectShotgun',
        Digit2: 'selectHAR',
        Digit3: 'selectPlasma',
        Digit4: 'selectSuperShotgun'
    }
    const mouse_controls = {
        1: 'fire',
        2: 'melee',
        3: 'altfire'
    }
    // Объект, показывающий, куда перемещается игрок
    const [movementStatus, setMovementStatus] = useState({
        forward: false,
        left: false,
        backward: false,
        right: false,
        jump: false,
        fire: false,
        melee: false,
        altfire: false,
        selectShotgun: false,
        selectHAR: false,
        selectPlasma: false,
        selectSuperShotgun: false
    })

    const changeMovementStatus = (code, status) => {
        setMovementStatus((movementStatus) => ({...movementStatus, [code]: status}))
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            changeMovementStatus(keys_controls[e.code], true)
        }
        const handleKeyUp = (e) => {
            changeMovementStatus(keys_controls[e.code], false)
        }
        const handleMouseDown = (e) => {
            changeMovementStatus(mouse_controls[e.which], true)
        }
        const handleMouseUp = (e) => {
            changeMovementStatus(mouse_controls[e.which], false)
        }
        // Ивенты для клавиатуры
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        // Ивенты для мыши
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [] )
    return movementStatus
}
