import './Liv.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";

export const Liv = ({ }) => {
  const points = []
  // points.push(new Vector3(-5.625, -29.4, 3.2))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[4, -29.25, 4.4]}
        label="Liv-1"
        labelPosition={1} />

      <Point
        positionArray={[3.8, -29.05, 3.75]}
        label="Liv-2"
        labelPosition={1} />

      <Point
        positionArray={[3.3, -28.15, 1.75]}
        label="Liv-3"
        labelPosition={1} />

      <Point
        positionArray={[3, -27.75, 0.7]}
        label="Liv-4"
        labelPosition={1} />

      <Point
        positionArray={[2.625, -25.1, -0.7]}
        label="Liv-5"
        labelPosition={2} />

      <Point
        positionArray={[2.525, -24.1, -0.7]}
        label="Liv-6"
        labelPosition={2} />

      <Point
        positionArray={[1.85, -19.25, -1.5]}
        label="Liv-7"
        labelPosition={2} />

      <Point
        positionArray={[1.95, -18.35, -1.55]}
        label="Liv-8"
        labelPosition={2} />

      <Point
        positionArray={[0.8, -14.35, -1]}
        label="Liv-9"
        labelPosition={2} />

      <Point
        positionArray={[1.5, -7.45, 2.86]}
        label="Liv-10"
        labelPosition={2} />

      <Point
        positionArray={[1.5, -6.85, 2.9]}
        label="Liv-11"
        labelPosition={3} />

      <Point
        positionArray={[1.6, -4.75, 3.15]}
        label="Liv-12"
        labelPosition={3} />

      <Point
        positionArray={[3.4, -0.75, 1.5]}
        label="Liv-13"
        labelPosition={0} />

      <Point
        positionArray={[2.5, 1.45, 2.6]}
        label="Liv-14"
        labelPosition={0} />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#CC4370'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
