import './SJ.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";

export const SJ = ({ }) => {
  const points = []
  points.push(new Vector3(-16.95, -4.65, 2.55))
  points.push(new Vector3(-16.25, -3.95, 2.05))
  points.push(new Vector3(-15.65, -3.25, 1.75))
  points.push(new Vector3(-15.5, -2.95, 1.7))
  points.push(new Vector3(-15.35, -2.8, 1.65))
  points.push(new Vector3(-14.725, -2.1, 1.5))
  points.push(new Vector3(-14.1, -1.6, 1.35))
  points.push(new Vector3(-13.479, -1.014, 1.014))
  points.push(new Vector3(-13.168, -0.675, 0.846))
  points.push(new Vector3(-13.168, -0.721, 0.646))
  points.push(new Vector3(-12.857, -0.35, 0.679))
  points.push(new Vector3(-12.2, 0.45, 0.075))
  points.push(new Vector3(-12, 0.65, -0.25))
  points.push(new Vector3(-11.614, 0.85, -0.5))
  points.push(new Vector3(-11.5, 0.75, -0.8))
  points.push(new Vector3(-10.7, 0.675, -1.6))
  points.push(new Vector3(-9.85, 0.5, -1.825))
  points.push(new Vector3(-9.5, 0.75, -2))
  points.push(new Vector3(-8.5, 1.725, -2.425))
  points.push(new Vector3(-7.5, 2.7, -2.575))
  points.push(new Vector3(-6.5, 3.675, -3))
  points.push(new Vector3(-5.5, 4.65, -2.9))
  points.push(new Vector3(-5, 5.375, -2.93))
  points.push(new Vector3(-4.5, 6.1, -3.05))
  points.push(new Vector3(-4, 6.8, -3))
  points.push(new Vector3(-2.325, 7.5, -2.95))
  points.push(new Vector3(-1.5, 8.9, -2))
  points.push(new Vector3(-1.5, 9.5, -1))
  points.push(new Vector3(-1.625, 10.35, -0.1))
  points.push(new Vector3(-1.625, 10.9, 0.05))
  points.push(new Vector3(-1.65, 11.2, -0.15))
  points.push(new Vector3(-1.75, 11.6, -0.21))
  points.push(new Vector3(-1.85, 12.1, -0.03))
  points.push(new Vector3(-1.95, 12.25, 0.15))
  points.push(new Vector3(-1.95, 12.2, 0.4))
  points.push(new Vector3(-1.9, 12, 0.5))
  points.push(new Vector3(-1.9, 11.75, 0.45))
  points.push(new Vector3(-1.825, 12, 0.6))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[-16.95, -4.65, 2.55]}
        label="SJ-1"
        labelPosition={3}
        reverse />

      <Point
        positionArray={[-15.65, -3.25, 1.75]}
        label="SJ-2"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-15.35, -2.8, 1.65]}
        label="SJ-3"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-14.1, -1.6, 1.35]}
        label="SJ-4"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-13.479, -1.014, 1.014]}
        label="SJ-5"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-13.168, -0.675, 0.846]}
        label="SJ-6"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-13.168, -0.721, 0.646]}
        label="SJ-7"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-12.857, -0.35, 0.679]}
        label="SJ-8"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-11.614, 0.85, -0.5]}
        label="SJ-9"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-9.85, 0.5, -1.825]}
        label="SJ-10"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-9.5, 0.75, -2]}
        label="SJ-11"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-7.5, 2.7, -2.575]}
        label="SJ-12"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-5.5, 4.65, -2.9]}
        label="SJ-13"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-4.5, 6.1, -3.05]}
        label="SJ-14"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-2.325, 7.5, -2.95]}
        label="SJ-15"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-1.625, 10.35, -0.1]}
        label="SJ-16"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-1.625, 10.9, 0.05]}
        label="SJ-17"
        labelPosition={3}
        reverse />

      <Point
        positionArray={[-1.65, 11.2, -0.15]}
        label="SJ-18"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-1.75, 11.6, -0.21]}
        label="SJ-19"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[-1.95, 12.25, 0.15]}
        label="SJ-20"
        labelPosition={1}
        reverse />

      <Point
        positionArray={[-1.9, 11.75, 0.45]}
        label="SJ-21"
        labelPosition={2}
      />

      <Point
        positionArray={[-1.825, 12, 0.6]}
        label="SJ-22"
        labelPosition={2}
      />

      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'#68CC43'} linewidth={2} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  );
};
