import { useLoader } from '@react-three/fiber';
import { TextureLoader, DynamicDrawUsage } from 'three';
import circleImg from 'src/assets/images/PointCircle.png';
import circleSelectedImg from 'src/assets/images/PointCircleSelected.png';
import { useEffect, useMemo, useState } from 'react';
import { Text } from "src/components/ThreeJS/index";
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { setPointSelected, setIsHoveringPoint } from 'src/redux/slice/index';

export const Point = ({ positionArray, label, labelPosition, reverse = false, viewFromBottom = false }) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState(0xF9FFB3);
  const [isOnHover, setIsOnHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isInCheckingRange, setIsInCheckingRange] = useState(true);

  const {
    selectedLabel,
    selectedType
  } = useSelector(
    (state) => state.selectionSlice,
  );

  let textPosition = useMemo(() => {
    if (labelPosition === 0) {
      return [positionArray[0] + 0.1, positionArray[1] + 0.01, positionArray[2] + 0.01]
    } else if (labelPosition === 1) {
      return [positionArray[0] - 0.15, positionArray[1] + 0.1, positionArray[2] + 0.01]
    } else if (labelPosition === 2) {
      return [positionArray[0] - 0.5, positionArray[1] - 0.05, positionArray[2] + 0.02]
    } else if (labelPosition === 3) {
      return [positionArray[0] - 0.15, positionArray[1] - 0.25, positionArray[2] + 0.01]
    } else if (labelPosition === 4) {
      return [positionArray[0], positionArray[1], positionArray[2] - 0.05]
    } else if (labelPosition === 5) {
      return [positionArray[0] + 0.4, positionArray[1], positionArray[2] - 0.05]
    } else if (labelPosition === 6) {
      return [positionArray[0] + 0.15, positionArray[1] + 0.15, positionArray[2] - 0.15]
    } else if (labelPosition === 7) {
      return [positionArray[0] + 0.15, positionArray[1] - 0.2, positionArray[2] - 0.15]
    }
  }, [positionArray])

  let position = useMemo(() => {
    return new Float32Array(positionArray);
  }, [positionArray])

  useEffect(() => {
    setIsSelected(label === selectedLabel && selectedType === 'point')
  }, [selectedLabel])

  const imgTex = isSelected ? useLoader(TextureLoader, circleSelectedImg) : useLoader(TextureLoader, circleImg);

  useEffect(() => {
    if (isOnHover) {
      setColor(0xFFFF00)
    } else {
      setColor(0xF9FFB3)
    }

    dispatch(setIsHoveringPoint({
      isHoveringPoint: isOnHover
    }))
  }, [isOnHover, isSelected])

  return (
    <>
      <points
        onPointerMove={(e) => {
          // if (isInCheckingRange) {
          //   if (e.distanceToRay < 0.1) {
          //     setIsOnHover(true);
          //   } else {
          //     setIsOnHover(false);
          //   }
          // }
          if (e.distanceToRay < 0.1) {
            setIsOnHover(true);
          } else {
            setIsOnHover(false);
          }
        }}
        // onPointerEnter={(e) => {
        //   setIsInCheckingRange(true);
        // }}
        // onPointerLeave={(e) => {
        //   setIsInCheckingRange(false);
        // }}
        onClick={(e) => {
          if (e.distanceToRay < 0.1) {
            dispatch(setPointSelected({
              selectedLabel: label
            }))
          }
        }}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={position.length / 3}
            array={position}
            itemSize={3}
            usage={DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          map={imgTex}
          color={color}
          size={isOnHover || isSelected ? 0.5 : 0.375}
          sizeAttenuation
          transparent={false}
          alphaTest={0.5}
          opacity={isOnHover || isSelected ? 1.0 : 0.5}
        />
      </points>

      <Text
        positionArray={textPosition}
        text={label}
        reverse={reverse}
        viewFromBottom={viewFromBottom}
        isOnHover={isOnHover || isSelected}
      ></Text>
    </>
  );
};
