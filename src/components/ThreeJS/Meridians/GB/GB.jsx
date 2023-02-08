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
        positionArray={[-1.425, 12.25, 2]}
        label="GB-1"
        labelPosition={2}
      />

      <Point
        positionArray={[-1.825, 11.25, 0.45]}
        label="GB-2"
        labelPosition={2}
      />

      <Point
        positionArray={[-1.8, 11.75, 0.75]}
        label="GB-3"
        labelPosition={2}
      />

      <Point
        positionArray={[-1.875, 13.25, 0.675]}
        label="GB-4"
        labelPosition={2} />

      <Point
        positionArray={[-1.9, 12.9, 0.625]}
        label="GB-5"
        labelPosition={2} />

      <Point
        positionArray={[-1.9, 12.55, 0.575]}
        label="GB-6"
        labelPosition={2} />

      <Point
        positionArray={[-1.885, 12.2, 0.4]}
        label="GB-7"
        labelPosition={2} />

      <Point
        positionArray={[-1.95, 12.8, 0.125]}
        label="GB-8"
        labelPosition={2} />

      <Point
        positionArray={[-1.95, 12.775, -0.025]}
        label="GB-9"
        labelPosition={2} />

      <Point
        positionArray={[-1.95, 12.25, -0.35]}
        label="GB-10"
        labelPosition={2} />

      <Point
        positionArray={[-1.75, 11.6, -0.4]}
        label="GB-11"
        labelPosition={2} />

      <Point
        positionArray={[-1.65, 11.2, -0.385]}
        label="GB-12"
        labelPosition={2} />

      <Point
        positionArray={[-1.1, 14, 1.85]}
        label="GB-13"
        labelPosition={1} />

      <Point
        positionArray={[-0.9, 12.875, 2.575]}
        label="GB-14"
        labelPosition={2} />

      <Point
        positionArray={[-0.9, 14, 2]}
        label="GB-15"
        labelPosition={2} />

      <Point
        positionArray={[-0.9, 14.45, 1.45]}
        label="GB-16"
        labelPosition={2} />

      <Point
        positionArray={[-0.9, 14.65, 0.85]}
        label="GB-17"
        labelPosition={2} />

      <Point
        positionArray={[-0.9, 14.65, -0.2]}
        label="GB-18"
        labelPosition={2} />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#4DC2BA'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
