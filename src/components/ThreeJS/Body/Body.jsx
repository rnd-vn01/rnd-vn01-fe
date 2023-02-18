import './Body.scss'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'src/assets/libraries/GLTFLoader';
import MALEBODY from 'src/assets/models/MaleBody.glb';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/redux/store';
import { resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';

export const Body = () => {
  let mesh = useLoader(
    GLTFLoader,
    MALEBODY,
  );

  const {
    isHoveringPoint,
    isHoveringLine
  } = useSelector(
    (state) => state.selectionSlice,
  );

  const dispatch = useAppDispatch();

  return (
    <mesh
      onDoubleClick={(e) => {
        if (!isHoveringLine && !isHoveringPoint) {
          dispatch(resetToInitialStatePointSelectionSlice())
        }
      }}
    >
      <primitive
        castShadow
        object={mesh.scene}
        rotation-y={-0.025}
        position={[0, -30, 0]} />
    </mesh>
  );
};
