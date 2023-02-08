import './GB.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";

export const GB = ({ }) => {
  const points = []
  // points.push(new Vector3(-16.95, -4.65, 2.55))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-16.95, -4.65, 2.55]}
        label="SJ-1"
        labelPosition={3}
        reverse />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#4DC2BA'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
