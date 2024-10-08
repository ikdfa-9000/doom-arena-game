/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/weapons/shotgun.glb 
*/

import { LoopOnce } from 'three'
import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export const ShotgunModel = forwardRef((props, ref) => {
  const modelRef = useRef()
  const { nodes, materials, animations } = useGLTF('/models/weapons/shotgun.glb')
  const { actions } = useAnimations(animations, modelRef)
  const [ visibility, setVisibility ] = useState(true)
  
  useEffect(() => {
    for (const actionName in actions) {
      actions[actionName].setLoop(LoopOnce)
      actions[actionName].clampWhenFinished = 1
    }
    actions['sg_hold'].reset().fadeIn(0).play()
  }, [])

  useImperativeHandle(ref, () => ({
    print_actions() { // for debugging purposes
      console.log(actions)
    }, 
    play_animation(name) {
      for (const key in actions) {
        if (key === name) {
          actions[key].reset().fadeIn(0).play();
        } else {
          actions[key].stop();
        }
      }
    },
    setVisibilityStatus(status) { // cursed
      setVisibility(status)
    }
  }))
  return (
    <group ref={modelRef} {...props} visible={visibility} dispose={null}>
      <group name="Scene">
        <group name="root_sg">
          <primitive object={nodes.sg_main} />
          <skinnedMesh name="shotgun_mesh" geometry={nodes.shotgun_mesh.geometry} material={materials['Material.001']} skeleton={nodes.shotgun_mesh.skeleton} />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/shotgun.glb')
