import { useLoader } from '@react-three/fiber';
import { TextureLoader, DynamicDrawUsage } from 'three';
import circleImg from 'src/assets/images/PointCircle.png';
import circleSelectedImg from 'src/assets/images/PointCircleSelected.png';
import { useEffect, useMemo, useState } from 'react';
import { Text } from "src/components/ThreeJS/index";
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { setPointSelected, setIsHoveringPoint, setNavigateQuestSelectedPoint } from 'src/redux/slice/index';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { IMPORTANT_POINTS, ZOOM_CONTROL_LEVEL } from 'src/configs/constants';

export const Point = ({ positionArray, label, labelPosition, reverse = false, viewFromBottom = false }) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState(0xF9FFB3);
  const [isOnHover, setIsOnHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isMeridianSelected, setIsMeridianSelected] = useState(false);
  const [isSelectedOnQuizFocus, setIsSelectedOnQuizFocus] = useState(false);
  const [isShowingLabel, setIsShowingLabel] = useState(false);
  const [isAnswerPoint, setIsAnswerPoint] = useState(false);
  const [isInShowingPoints, setIsInShowingPoints] = useState(false);
  const [isImportantPoint, setIsImportantPoint] = useState(false);
  const { t } = useTranslation();

  //Responsive
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  const {
    selectedLabel,
    selectedType
  } = useSelector(
    (state) => state.selectionSlice,
  );

  const {
    isShowingLabelOnHovering,
    isHoverable,
    showingPoints,
    selectedPoint,
    markedPoint,
    isShowingLabelOnClick,
    isQuizMode,
    isNavigateQuest,
    navigateQuestSelectable,
    showingCorrectPoint,
    isShowing4Labels
  } = useSelector(
    (state) => state.quizSlice,
  );

  const {
    isInCloseZoomMode
  } = useSelector(
    (state) => state.zoomControlSlice,
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

  const imgTex = isSelected ? useLoader(TextureLoader, circleSelectedImg) : useLoader(TextureLoader, circleImg);

  const getPointSize = () => {
    let desktopSize = isOnHover ? 12.5 : (isSelected ? 14 : (isAnswerPoint ? 17.5 : 9.375));

    if (!isTablet) {
      desktopSize *= 2
    }

    return desktopSize
  }

  useEffect(() => {
    setIsSelected(selectedLabel !== "" && label === selectedLabel && selectedType === 'point')
    setIsMeridianSelected(selectedLabel !== "" && selectedType === 'line' && label.includes(selectedLabel))
    setIsSelectedOnQuizFocus(false);
  }, [selectedLabel])

  useEffect(() => {
    if (markedPoint) {
      setIsSelected(markedPoint === label)
      setIsSelectedOnQuizFocus(true);
    } else {
      setIsSelected(false);
      setIsSelectedOnQuizFocus(false);
    }
  }, [markedPoint])

  useEffect(() => {
    if (isQuizMode) {
      if (showingCorrectPoint !== null && showingCorrectPoint !== undefined) {
        if (showingCorrectPoint === label) {
          setColor(0x93895E)
          setIsAnswerPoint(true);
        }

        if (showingCorrectPoint !== selectedPoint && selectedPoint !== null && selectedPoint !== undefined
          && selectedPoint === label) {
          setColor(0x834E46)
          setIsAnswerPoint(true);
        }
      } else {
        setColor(0xF9FFB3)
        setIsShowingLabel(false);
        setIsAnswerPoint(false);
        if (!markedPoint) {
          setIsSelected(false)
        }
      }
    }
  }, [showingCorrectPoint])

  useEffect(() => {
    if (showingPoints.length) {
      setIsSelected(showingPoints.includes(label))
      setIsSelectedOnQuizFocus(true);
      setIsInShowingPoints(showingPoints.includes(label))

      if (showingPoints.includes(label)) {
        setIsShowingLabel(true);
        setColor(0xFFFF00)
      } else {
        setIsShowingLabel(false);
        setColor(0xF9FFB3)
      }
    } else {
      setIsInShowingPoints(false);
      setIsShowingLabel(false);
    }
  }, [showingPoints])

  useEffect(() => {
    if (isOnHover || isSelected) {
      setColor(0xFFFF00)
    } else {
      setColor(0xF9FFB3)
    }

    dispatch(setIsHoveringPoint({
      isHoveringPoint: isOnHover
    }))
  }, [isOnHover, isSelected])

  useEffect(() => {
    if (isAnswerPoint || isInShowingPoints) {
      setIsShowingLabel(true)
    } else if (isOnHover && isShowingLabelOnHovering) {
      setIsShowingLabel(true);
    } else if (!isSelectedOnQuizFocus && selectedLabel !== "" && isSelected) {
      if (!isShowingLabelOnClick)
        setIsShowingLabel(false);
      else
        setIsShowingLabel(true);
    } else if (!isSelectedOnQuizFocus && selectedLabel !== "" && isMeridianSelected) {
      if (!isShowingLabelOnClick)
        setIsShowingLabel(false);
      else
        setIsShowingLabel(true);
    } else {
      setIsShowingLabel(false);
    }
  }, [isOnHover, isShowingLabelOnHovering, isSelectedOnQuizFocus, selectedLabel, isSelected, isMeridianSelected, isAnswerPoint])

  useEffect(() => {
    setIsImportantPoint(IMPORTANT_POINTS.includes(label))
  }, [])

  return (
    (isImportantPoint || (isInCloseZoomMode >= ZOOM_CONTROL_LEVEL.SHOW_ALL) || isMeridianSelected) ? (<>
      <points
        onPointerMove={(e) => {
          if (isHoverable && !isAnswerPoint) {
            if (isDesktop) {
              if (e.distanceToRay < 0.1) {
                setIsOnHover(true);
              } else {
                setIsOnHover(false);
              }
            }
          }
        }}
        onClick={(e) => {
          if (!isQuizMode || (isNavigateQuest && navigateQuestSelectable)) {
            if (e.distanceToRay < 0.1) {
              dispatch(setPointSelected({
                selectedLabel: label,
                pointPosition: {
                  x: position[0],
                  y: position[1],
                  z: position[2]
                }
              }))

              if (isNavigateQuest && navigateQuestSelectable) {
                dispatch(setNavigateQuestSelectedPoint({
                  selectedPoint: label,
                }))
              }
            }
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
          size={getPointSize()}
          sizeAttenuation={false}
          transparent={false}
          alphaTest={0.5}
          opacity={isOnHover || isSelected || isAnswerPoint ? 1.0 : 0.5}
        />
      </points>

      {isShowingLabel && <Text
        positionArray={textPosition}
        text={isInShowingPoints ? (isShowing4Labels ? `${(showingPoints.indexOf(label) + 1).toString()}. ${label}` :
          `P` + (showingPoints.indexOf(label) + 1).toString()) :
          label}
        reverse={reverse}
        viewFromBottom={viewFromBottom}
        isOnHover={isOnHover || isSelected || isAnswerPoint}
      ></Text>}
    </>) : (<></>)
  );
};
