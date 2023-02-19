import { extend } from '@react-three/fiber';
import { FontLoader } from "src/assets/libraries/FontLoader"
import { TextGeometry } from 'src/assets/libraries/TextGeometry'
import helvetiker from "src/assets/fonts/helvetiker_regular.typeface.json"
import { useSelector } from 'react-redux';
import { Quaternion } from 'three';

export const Text = ({ positionArray, text, reverse, viewFromBottom, isOnHover }) => {
  extend({ TextGeometry })

  const helvetikerRegular = new FontLoader().parse(helvetiker)
  const textOptions = {
    font: helvetikerRegular,
    size: 1,
    height: 1,
  }
  const {
    x, y, z, w
  } = useSelector(
    (state) => state.cameraQuaternionSlice,
  );

  return (
    <mesh position={positionArray} rotation={[0, 0, 0]} scale={isOnHover? [0.1, 0.1, 0.005] : [0.0625, 0.0625, 0.0005]}
      quaternion={
        !viewFromBottom ? new Quaternion(x, reverse ? 1 : y, z, w)
          : new Quaternion(0.7, -0.05, 0.05, 0.7)
      }>
      <textGeometry attach='geometry' args={[text || "", textOptions]} />
      <meshLambertMaterial 
        attach='material' color={isOnHover? 'rgb(0, 0, 0)' : 'rgb(0, 0, 0)'} />
    </mesh>
  );
};
