import './SI.scss'
import { Point } from "src/components/ThreeJS/index";
import { BufferGeometry, Vector3 } from "three";
import { useState, useEffect, useCallback } from "react"
import { setIsHoveringLine, setLineSelected, setLineHover, resetToInitialStatePointSelectionSlice } from 'src/redux/slice/index';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { MERIDIANS_COLOR } from 'src/configs/constants';
import { debounce } from "lodash"
export const SI = ({ showLine }) => {
  const LABEL = 'SI'
  const LINE_BASE_COLOR = MERIDIANS_COLOR[6]

  const [color, setColor] = useState(LINE_BASE_COLOR)
  const dispatch = useAppDispatch();
  const [isOnHover, setIsOnHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isInCheckingRange, setIsInCheckingRange] = useState(false);

  const {
    selectedLabel,
    selectedType,
    isHoveringPoint,
    hoveringLineLabel
  } = useSelector(
    (state) => state.selectionSlice,
  );

  useEffect(() => {
    setIsSelected(LABEL === selectedLabel && selectedType === 'line')
  }, [selectedLabel])

  useEffect(() => {
    if (isSelected) {
      setColor('#FF0000')
    } else if (isOnHover) {
      setColor('#000000')
    } else {
      setColor(LINE_BASE_COLOR)
    }

    dispatch(setIsHoveringLine({
      isHoveringLine: isOnHover
    }))
  }, [isOnHover, isSelected])

  useEffect(() => {
    if (hoveringLineLabel) {
      setIsOnHover(LABEL === hoveringLineLabel)
    } else {
      setIsOnHover(false);
    }
  }, [hoveringLineLabel])

  const debounceClick = useCallback(
    debounce((data) => dispatch(setLineSelected(data)), 100), []);

  const debounceHover = useCallback(
    debounce((data) => dispatch(setLineHover(data)), 5), []);

  const points = []
  points.push(new Vector3(16.625, -4.275, 2.5))
  points.push(new Vector3(16.3, -4, 2.25))
  points.push(new Vector3(16, -3.75, 2.115))
  points.push(new Vector3(15.7, -3.5, 2.025))
  points.push(new Vector3(15.35, -3.3, 1.875))
  points.push(new Vector3(14.3, -2.8, 1.35))
  points.push(new Vector3(13.9, -2.5, 1.3))
  points.push(new Vector3(13.5, -2.2, 1.325))
  points.push(new Vector3(13.3, -1.8, 1.075))
  points.push(new Vector3(11.98, -1.08, 0.1))
  points.push(new Vector3(10.5, -0.3, -1))
  points.push(new Vector3(10, 0, -1.15))
  points.push(new Vector3(9.5, 0.5, -1.5))
  points.push(new Vector3(7, 2.75, -2.45))
  points.push(new Vector3(6, 3.5, -2.79))
  points.push(new Vector3(4.75, 4.25, -2.8))
  points.push(new Vector3(4.7, 5.65, -2.8))
  points.push(new Vector3(4.05, 5.3, -3.3))
  points.push(new Vector3(3.55, 5.1, -3.45))
  points.push(new Vector3(3.5, 6.5, -3.1))
  points.push(new Vector3(3.03, 6.25, -3.29))
  points.push(new Vector3(2.44, 6, -3.4))
  points.push(new Vector3(1.35, 7.2, -3.05))
  points.push(new Vector3(0.85, 7.9, -2.6))
  points.push(new Vector3(1.7, 8.6, -2.18))
  points.push(new Vector3(1.75, 9.125, -1.5))
  points.push(new Vector3(1.7, 9.2, -0.5))
  points.push(new Vector3(1.55, 9.35, 0.4))
  points.push(new Vector3(1.5, 10.15, 0.65))
  points.push(new Vector3(1.7, 10.5, 1))
  points.push(new Vector3(1.35, 11, 2))
  points.push(new Vector3(1.2, 11.3, 2.2))
  points.push(new Vector3(1.35, 11.32, 2.1))
  points.push(new Vector3(1.575, 11.345, 1.75))
  points.push(new Vector3(1.825, 11.39, 0.575))

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  return (
    <>
      <Point
        positionArray={[16.625, -4.275, 2.5]}
        label="SI-1"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[15.7, -3.5, 2.025]}
        label="SI-2"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[15.35, -3.3, 1.875]}
        label="SI-3"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[13.9, -2.5, 1.3]}
        label="SI-4"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[13.5, -2.2, 1.3]}
        label="SI-5"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[13.3, -1.8, 1.1]}
        label="SI-6"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[11.98, -1.08, 0.1]}
        label="SI-7"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[10, 0, -1.15]}
        label="SI-8"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[4.75, 4.25, -2.8]}
        label="SI-9"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[4.7, 5.65, -2.8]}
        label="SI-10"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[3.55, 5.1, -3.45]}
        label="SI-11"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[3.5, 6.5, -3.1]}
        label="SI-12"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[2.44, 6, -3.4]}
        label="SI-13"
        labelPosition={4}
        reverse />

      <Point
        positionArray={[1.35, 7.2, -3]}
        label="SI-14"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[0.85, 7.9, -2.6]}
        label="SI-15"
        labelPosition={5}
        reverse />

      <Point
        positionArray={[1.55, 9.35, 0.4]}
        label="SI-16"
        labelPosition={0} />

      <Point
        positionArray={[1.5, 10.15, 0.65]}
        label="SI-17"
        labelPosition={0} />

      <Point
        positionArray={[1.2, 11.3, 2.2]}
        label="SI-18"
        labelPosition={0} />

      <Point
        positionArray={[1.825, 11.39, 0.575]}
        label="SI-19"
        labelPosition={0} />

      {showLine &&
        <line
          onClick={(e) => {
            if (!isHoveringPoint)
              debounceClick({})
          }}
          geometry={lineGeometry}>
          <lineBasicMaterial attach="material" color={color} linewidth={1} linecap={'round'} linejoin={'round'} />
        </line>}
    </>
  );
};
