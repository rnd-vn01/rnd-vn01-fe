import { useLoader, extend } from '@react-three/fiber';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import helvetiker from "src/assets/fonts/helvetiker_regular.typeface.json"

export const Text = ({ positionArray, text }) => {
  extend({ TextGeometry })

  const helvetikerRegular = new FontLoader().parse(helvetiker)

  const textOptions = {
    font: helvetikerRegular,
    size: 5,
    height: 1,
  }

  return (
    <mesh position={positionArray} rotation={[0, 0, 0]} scale={[0.0175, 0.0175, 0.001]}>
      <textGeometry attach='geometry' args={[text || "", textOptions]} />
      <meshLambertMaterial attach='material' color={'black'} />
    </mesh>
  );
};
