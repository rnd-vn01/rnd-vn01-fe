import './SI.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";

export const SI = ({ }) => {
  const points = []
  // points.push(new Vector3(4.7, 3.9, 0.25))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[16.625, -4.275, 2.5]}
        label="SI-1"
        labelPosition={1} />

      <Point
        positionArray={[15.7, -3.5, 2.05]}
        label="SI-2"
        labelPosition={4} />

      <Point
        positionArray={[15.35, -3.3, 1.9]}
        label="SI-3"
        labelPosition={4} />

      <Point
        positionArray={[13.9, -2.5, 1.3]}
        label="SI-4"
        labelPosition={4} />

      <Point
        positionArray={[13.5, -2.2, 1.3]}
        label="SI-5"
        labelPosition={4} />

      <Point
        positionArray={[13.3, -1.8, 1.1]}
        label="SI-6"
        labelPosition={4} />

      <Point
        positionArray={[11.98, -1.08, 0.1]}
        label="SI-7"
        labelPosition={4} />

      <Point
        positionArray={[10, 0, -1.15]}
        label="SI-8"
        labelPosition={4} />

      <Point
        positionArray={[4.75, 4.25, -2.8]}
        label="SI-9"
        labelPosition={4} />

      <Point
        positionArray={[4.7, 5.65, -2.8]}
        label="SI-10"
        labelPosition={4} />

      <Point
        positionArray={[3.55, 5.1, -3.45]}
        label="SI-11"
        labelPosition={4} />

      <Point
        positionArray={[3.5, 6.5, -3.1]}
        label="SI-12"
        labelPosition={4} />

      <Point
        positionArray={[2.44, 6, -3.4]}
        label="SI-13"
        labelPosition={4} />

      <Point
        positionArray={[1.7, 6.6, -3.2]}
        label="SI-14"
        labelPosition={4} />

      <Point
        positionArray={[1.25, 7.2, -3]}
        label="SI-15"
        labelPosition={4} />

      <Point
        positionArray={[1.55, 9.35, 0.4]}
        label="SI-16"
        labelPosition={0} />

      <Point
        positionArray={[1.5, 10.15, 0.65]}
        label="SI-17"
        labelPosition={0} />

      <Point
        positionArray={[1.825, 11.39, 0.575]}
        label="SI-18"
        labelPosition={0} />

      <Point
        positionArray={[1.2, 11.3, 2.2]}
        label="SI-19"
        labelPosition={0} />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#ff00ff'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
