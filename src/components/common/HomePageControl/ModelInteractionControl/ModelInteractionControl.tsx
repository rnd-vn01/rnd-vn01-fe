import './ModelInteractionControl.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from "react-i18next";

import controlUp from "src/assets/images/homeControls/controlIcons/controlUp.svg";
import controlDown from "src/assets/images/homeControls/controlIcons/controlDown.svg";
import controlLeft from "src/assets/images/homeControls/controlIcons/controlLeft.svg";
import controlRight from "src/assets/images/homeControls/controlIcons/controlRight.svg";
import controlCenter from "src/assets/images/homeControls/controlIcons/controlCenter.svg";
import controlZoomIn from "src/assets/images/homeControls/controlIcons/controlZoomIn.svg";
import controlZoomOut from "src/assets/images/homeControls/controlIcons/controlZoomOut.svg";

export const ModelInteractionControl: React.FC<IModelInteractionControl> = ({
  callbackPanUp, callbackPanDown, callbackPanLeft, callbackPanRight,
  callbackPanCenter, callbackZoomIn, callbackZoomOut
}) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  return (
    <div
      role="div"
      aria-label="model-interaction-control"
      className="model-interaction-control">
      <div className='model-interaction-control__main'>
        <img className='model-interaction-control__control 
        model-interaction-control__control--center' src={controlCenter}
          onClick={callbackPanCenter}></img>
        <img className='model-interaction-control__control 
        model-interaction-control__control--left' src={controlLeft}
          onClick={callbackPanLeft}></img>
        <img className='model-interaction-control__control 
        model-interaction-control__control--right' src={controlRight}
          onClick={callbackPanRight}></img>
        <img className='model-interaction-control__control 
        model-interaction-control__control--up' src={controlUp}
          onClick={callbackPanUp}></img>
        <img className='model-interaction-control__control 
        model-interaction-control__control--down' src={controlDown}
          onClick={callbackPanDown}></img>
      </div>

      <div className='model-interaction-control__zoom'>
        <img className='model-interaction-control__control 
        model-interaction-control__control--zoom-in' src={controlZoomIn}
          onClick={callbackZoomIn}></img>
        <img className='model-interaction-control__control 
        model-interaction-control__control--zoom-out' src={controlZoomOut}
          onClick={callbackZoomOut}></img>
      </div>
    </div>
  );
};
