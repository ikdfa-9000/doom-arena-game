import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useTexture } from '@react-three/drei';
import { NearestFilter } from 'three';
import ShotgunMuzzle from '../../assets/muzzleflashes/shotgun.png';
import PlasmaMuzzle from '../../assets/muzzleflashes/plasma.png';
import HARMuzzle from '../../assets/muzzleflashes/har.png';

export const MuzzleflashHandler = forwardRef((props, ref) => {

  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const planeRef = useRef();

  const muzzles = {
    shotgun: {
      texture: useTexture(ShotgunMuzzle),
      initialScale: [1.45, 1.45],
      duration: 100
    },
    plasmaGun: {
      texture: useTexture(PlasmaMuzzle),
      initialScale: [1.25, 1.25],
      duration: 50
    },
    har: {
      texture: useTexture(HARMuzzle),
      initialScale: [1.25, 1.25],
      duration: 75
    },
    superShotgun: {
      texture: useTexture(ShotgunMuzzle),
      initialScale: [2, 1.45],
      duration: 100
    },
  };

  useEffect(() => {
    for (const muzzleTexture in muzzles) {
      // Make all muzzle flash textures pixelated
      muzzles[muzzleTexture].texture.magFilter = NearestFilter;
      muzzles[muzzleTexture].texture.minFilter = NearestFilter;
      muzzles[muzzleTexture].texture.needsUpdate = true;
    }
  }, []);

  useEffect(() => {
    // chatgpt...
    let animationFrameId;
    let startTime;
    const animateScaleDown = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const newScale = Math.max(0, 1 - (progress / muzzles[props.weaponName].duration));

      setScale(newScale);

      if (newScale > 0) {
        animationFrameId = requestAnimationFrame(animateScaleDown);
      } else {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      setScale(1);
      animationFrameId = requestAnimationFrame(animateScaleDown);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible]);

  useImperativeHandle(ref, () => ({
    triggerMuzzleFlash() {
      planeRef.current.rotation.z = Math.random() * 3
      setIsVisible(true);
    }
  })) 

  return (
    <>
      <mesh
        ref={planeRef}
        scale={scale}
        visible={isVisible}
        rotation={[0, 0, 0]}
        position={[0.6, -0.25, -0.9]}
      >
        <planeGeometry args={muzzles[props.weaponName].initialScale}></planeGeometry>
        <meshStandardMaterial
          map={muzzles[props.weaponName].texture}
          transparent={true}
          emissiveMap={muzzles[props.weaponName].texture}
          emissive="white"
          emissiveIntensity={1}
        />
      </mesh>
    </>
  );
});