import './HT.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";

export const HT = ({ }) => {
  const points = []
  // points.push(new Vector3(-3.5, -29.3, 4.4))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[4.7, 3.9, 0.25]}
        label="HT-1"
        labelPosition={3} />

      <Point
        positionArray={[6.8, 1.65, 0]}
        label="HT-2"
        labelPosition={2} />

      <Point
        positionArray={[8.1, 0.85, -0.1]}
        label="HT-3"
        labelPosition={2} />

      <Point
        positionArray={[12.8, -1.9, 1.05]}
        label="HT-4"
        labelPosition={3} />

      <Point
        positionArray={[13.05, -2, 1.15]}
        label="HT-5"
        labelPosition={3} />

      <Point
        positionArray={[13.3, -2.1, 1.25]}
        label="HT-6"
        labelPosition={3} />

      <Point
        positionArray={[13.5, -2.45, 1.35]}
        label="HT-7"
        labelPosition={3} />

      <Point
        positionArray={[14.74, -3.45, 2.15]}
        label="HT-8"
        labelPosition={3} />

      <Point
        positionArray={[16.45, -4.275, 2.8]}
        label="HT-9"
        labelPosition={1} />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#ff00ff'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
