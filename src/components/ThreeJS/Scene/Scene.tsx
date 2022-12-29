import './Scene.scss'
import React, { Suspense, useEffect, useRef } from 'react';
import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import SCENE_BACKGROUND from 'src/assets/images/SCENE_BACKGROUND.hdr';
import { Body } from "../Body/Body";
import { Vector3 } from 'three';
import { LU, LI, ST, SP } from '../Meridians';
import { useAppDispatch } from 'src/redux/store';
import { setStateCameraQuaternion } from 'src/redux/slice/camera';

export const Scene: React.FC = () => {
  const controls = useRef(null);
  const camera = useRef(null);
  const dispatch = useAppDispatch();

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return <Html prepend center
      style={{
        display: "flex", width: "100vw", justifyContent: "center",
        alignItems: "center", flexDirection: "column"
      }}>
      <h3 style={{ display: "inline", fontSize: 24 }}>{`${Math.round(progress)}% loaded`}</h3>
      <progress id="file" value={progress} max="100"></progress>
    </Html>
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (camera.current) {
    //     dispatch(setStateCameraQuaternion({
    //       x: camera.current.quaternion._x,
    //       y: camera.current.quaternion._y,
    //       z: camera.current.quaternion._z,
    //       w: camera.current.quaternion._w,
    //     }))
    //   }
    // }, 2500)

    // return () => clearInterval(interval);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Environment
        files={SCENE_BACKGROUND}
        background={true}
      />

      <ambientLight intensity={-0.3} />

      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[-1.75, 10.85, 40]}
        zoom={1.5}
      >
      </PerspectiveCamera>

      <OrbitControls
        ref={controls}
        target={[1, 5, 0]}
        mouseButtons={{
          LEFT: 2,
          MIDDLE: 1,
          RIGHT: 0
        }}
        onChange={(e) => {
          var minPan = new Vector3(-10, -30, 0);
          var maxPan = new Vector3(10, 15, 0);

          let _v = new Vector3();
          _v.copy(controls.current.target);
          controls.current.target.clamp(minPan, maxPan);
          _v.sub(controls.current.target)
          camera.current.position.sub(_v);
        }}
        minDistance={0}
        maxDistance={75}
      ></OrbitControls>

      <Body />
      <LU />
      <LI />
      <ST />
      <SP />

    </Suspense >
  );
};
