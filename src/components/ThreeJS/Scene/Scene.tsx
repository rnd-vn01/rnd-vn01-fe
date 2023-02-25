import './Scene.scss'
import React, {
  forwardRef, Suspense, useEffect, useImperativeHandle, useRef
} from 'react';
import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import SCENE_BACKGROUND from 'src/assets/images/SCENE_BACKGROUND.hdr';
import { Body } from "../Body/Body";
import { MOUSE, MathUtils, Vector3 } from 'three';
import {
  LU, LI, ST, SP, HT, SI, BL, KI, PC, TE, GB, Liv, Du, Ren, Others
} from '../Meridians';
import { RootState, useAppDispatch } from 'src/redux/store';
import { resetToInitialStateQuizSlice, setIsNavigateQuest, setIsQuizMode, setIsShowingLabelOnClick, setModalLoaded, setPointSelected, setStateCameraQuaternion, unsetStrictMode } from 'src/redux/slice/index';
import { angleToRadians } from 'src/helpers/angle';
import { useSelector } from 'react-redux';
import { FOCUS_OPTIONS } from 'src/configs/constants';

enum PAN_DIRECTION {
  LEFT = 0,
  RIGHT = 1,
  UP = 2,
  DOWN = 3
}

export const Scene = forwardRef((props, ref) => {
  const controls = useRef(null);
  const camera = useRef(null);
  const dispatch = useAppDispatch();
  const {
    selectedLabel,
    selectedType,
    pointPosition,
    isSelectingFromMenu
  } = useSelector(
    (state: RootState) => state.selectionSlice,
  );

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()

    if (progress === 100) {
      dispatch(setModalLoaded({
        modelLoaded: true
      }))
    }

    return <Html prepend center
      style={{
        display: "flex", width: "100vw", justifyContent: "center",
        alignItems: "center", flexDirection: "column"
      }}>
      <h3 style={{ display: "inline", fontSize: 24 }}>{`${Math.round(progress)}% loaded`}</h3>
      <progress id="file" value={progress} max="100"></progress>
    </Html>
  }

  const move = (direction) => {
    let _v = new Vector3(0, 0, 0);
    switch (direction) {
      case PAN_DIRECTION.LEFT:
        _v.x = 0.5
        break
      case PAN_DIRECTION.RIGHT:
        _v.x = -0.5
        break
      case PAN_DIRECTION.UP:
        _v.y = -0.5
        break
      case PAN_DIRECTION.DOWN:
        _v.y = 0.5
        break
    }
    controls.current.target.sub(_v)
  }

  useEffect(() => {
    dispatch(setModalLoaded({
      modelLoaded: false
    }))
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

    dispatch(setPointSelected({
      selectedPoint: null
    }))

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          if (controls.current.target.x > -15) {
            move(PAN_DIRECTION.LEFT)
          }
          break
        case "ArrowRight":
          if (controls.current.target.x < 15) {
            move(PAN_DIRECTION.RIGHT)
          }
          break
        case "ArrowUp":
          if (controls.current.target.y < 15) {
            move(PAN_DIRECTION.UP)
          }
          break
        case "ArrowDown":
          if (controls.current.target.y > -30) {
            move(PAN_DIRECTION.DOWN)
          }
          break
      }
    });

    dispatch(unsetStrictMode())
    dispatch(resetToInitialStateQuizSlice())
  }, []);

  useImperativeHandle(ref, () => ({
    panUp() {
      move(PAN_DIRECTION.UP)
    },

    panDown() {
      move(PAN_DIRECTION.DOWN)
    },

    panLeft() {
      move(PAN_DIRECTION.LEFT)
    },

    panRight() {
      move(PAN_DIRECTION.RIGHT)
    },

    panCenter() {
      controls.current.reset();
      let _v = new Vector3(controls.current.target.x - 1, controls.current.target.y - 5, controls.current.target.z);
      controls.current.target.sub(_v)
      camera.current.zoom = 1.25
      camera.current.updateProjectionMatrix();
    },

    zoomIn() {
      camera.current.zoom += 0.25
      camera.current.updateProjectionMatrix();
    },

    zoomOut() {
      if (camera.current.zoom >= 1) {
        camera.current.zoom -= 0.25
        camera.current.updateProjectionMatrix();
      }
    },
  }));

  useEffect(() => {
    if (isSelectingFromMenu && selectedType === "line" && controls.current) {
      //Get the first point of line
      const point = FOCUS_OPTIONS[selectedLabel]["point"];
      controls.current.reset();

      let _v = new Vector3(controls.current.target.x - point["x"],
        controls.current.target.y - point["y"],
        controls.current.target.z - point["z"]);
      controls.current.target.sub(_v)
      camera.current.zoom = 3.5;
      camera.current.updateProjectionMatrix();

      const rad = MathUtils.degToRad(FOCUS_OPTIONS[selectedLabel]["rotate"]);

      //Need rotation
      const cx1 = camera.current.position.x;
      const cy1 = camera.current.position.y;
      const cz1 = camera.current.position.z;

      // 4. Calculate new camera position:
      const cx2 = Math.cos(rad) * cx1 - Math.sin(rad) * cz1;
      const cy2 = cy1;
      const cz2 = Math.sin(rad) * cx1 + Math.cos(rad) * cz1;

      // 5. Set new camera position:
      camera.current.position.set(cx2, cy2, cz2);

      camera.current.updateProjectionMatrix();

    } else if (isSelectingFromMenu && selectedType === "point" && controls.current && camera.current) {
      //Get the first point of line
      controls.current.reset();

      let _v = new Vector3(controls.current.target.x - pointPosition["x"],
        controls.current.target.y - pointPosition["y"],
        controls.current.target.z - pointPosition["z"]);
      controls.current.target.sub(_v)
      camera.current.zoom = 3.5;
      camera.current.updateProjectionMatrix();

      const rad = MathUtils.degToRad(180);

      //Need rotation
      if (pointPosition["z"] < 0) {
        //Need rotation
        const cx1 = camera.current.position.x;
        const cy1 = camera.current.position.y;
        const cz1 = camera.current.position.z;

        // 4. Calculate new camera position:
        const cx2 = Math.cos(rad) * cx1 - Math.sin(rad) * cz1;
        const cy2 = cy1;
        const cz2 = Math.sin(rad) * cx1 + Math.cos(rad) * cz1;

        // 5. Set new camera position:
        camera.current.position.set(cx2, cy2, cz2);

        camera.current.updateProjectionMatrix();
      }
    }
  }, [selectedLabel, selectedType]);

  return (
    <Suspense fallback={<Loader />}>
      <Environment
        files={SCENE_BACKGROUND}
        background={true}
      />

      <ambientLight intensity={-0.25} />

      <spotLight
        args={["#f7f7f7", 0.4, 0, angleToRadians(45), 0.35]}
        position={[-10, 17.5, 7.5]}
        castShadow />

      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[-1.75, 10.85, 40]}
        zoom={1.25}
      >
      </PerspectiveCamera>

      <OrbitControls
        ref={controls}
        target={[1, 5, 0]}
        mouseButtons={{
          LEFT: MOUSE.ROTATE,
          MIDDLE: MOUSE.DOLLY,
          RIGHT: MOUSE.PAN
        }}
        onChange={(e) => {
          var minPan = new Vector3(-15, -30, 0);
          var maxPan = new Vector3(15, 15, 0);

          let _v = new Vector3();
          _v.copy(controls.current.target);
          controls.current.target.clamp(minPan, maxPan);
          _v.sub(controls.current.target)
          camera.current.position.sub(_v);
        }}
        minDistance={0}
        maxDistance={75}
      ></OrbitControls>

      <Body
        isQuizMode={false}
      />
      <LU
        showLine={true} />
      <LI
        showLine={true} />
      <ST
        showLine={true} />
      <SP
        showLine={true} />
      <HT
        showLine={true} />
      <SI
        showLine={true} />
      <BL
        showLine={true} />
      <KI
        showLine={true} />
      <PC
        showLine={true} />
      <TE
        showLine={true} />
      <GB
        showLine={true} />
      <Liv
        showLine={true} />
      <Du
        showLine={true} />
      <Ren
        showLine={true} />
      <Others
        showLine={true} />
      {/* <ST /> */}
      {/* Floor */}
      <mesh rotation={[-(angleToRadians(90)), 0.02, 0]} position={[0, -29.9, 0]} receiveShadow>
        <planeGeometry args={[3000, 300]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

    </Suspense >
  );
});
