import './KI.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";

export const KI = ({ }) => {
  const points = []
  // points.push(new Vector3(0.35, 12.275, 2.5))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-4, -29.8, 1.25]}
        label="KI-1"
        labelPosition={3}
        viewFromBottom={true} />

      <Point
        positionArray={[-2.35, -28.8, -0.2]}
        label="KI-2"
        labelPosition={0} />

      <Point
        positionArray={[-2.35, -28.35, -0.7]}
        label="KI-3"
        labelPosition={0} />

      <Point
        positionArray={[-2.35, -28.35, -1.2]}
        label="KI-4"
        labelPosition={0} />

      <Point
        positionArray={[-2.375, -28, -1.5]}
        label="KI-5"
        labelPosition={0} />

      <Point
        positionArray={[-2.3, -27.65, -1.2]}
        label="KI-6"
        labelPosition={0} />

      <Point
        positionArray={[-2.4, -25.75, -1.75]}
        label="KI-7"
        labelPosition={0} />

      <Point
        positionArray={[-2.4, -25.75, -1.15]}
        label="KI-8"
        labelPosition={0} />

      <Point
        positionArray={[-1.825, -23.65, -1.875]}
        label="KI-9"
        labelPosition={0} />

      <Point
        positionArray={[-2.3, -17.5, -2.3]}
        label="KI-10"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[-0.75, -4.325, 3.55]}
        label="KI-11"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -3.7527, 3.575]}
        label="KI-12"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -3.1755, 3.575]}
        label="KI-13"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -2.6182, 3.525]}
        label="KI-14"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -2.041, 3.45]}
        label="KI-15"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -1.4636, 3.45]}
        label="KI-16"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, -0.3091, 3.315]}
        label="KI-17"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 0.2682, 3.325]}
        label="KI-18"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 0.8455, 3.25]}
        label="KI-19"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 1.4227, 3.05]}
        label="KI-20"
        labelPosition={2} />

      <Point
        positionArray={[-0.75, 2, 3.1]}
        label="KI-21"
        labelPosition={2} />

      <Point
        positionArray={[-1.4, 2.5, 3]}
        label="KI-22"
        labelPosition={2} />

      <Point
        positionArray={[-1.4, 3.125, 3.3]}
        label="KI-23"
        labelPosition={3} />

      <Point
        positionArray={[-1.4, 4.098, 3.2]}
        label="KI-24"
        labelPosition={2} />

      <Point
        positionArray={[-1.4, 5.07, 2.75]}
        label="KI-25"
        labelPosition={1} />

      <Point
        positionArray={[-1.4, 6.042, 2.075]}
        label="KI-26"
        labelPosition={1} />

      <Point
        positionArray={[-1.4, 6.864, 1.5]}
        label="KI-27"
        labelPosition={1} />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#4377CC'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
