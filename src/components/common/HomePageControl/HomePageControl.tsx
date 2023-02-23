import './HomePageControl.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from "react-i18next";
import { ModelViewModeControl } from './ModelViewModeControl/ModelViewModeControl';
import { ModelInteractionControl } from './ModelInteractionControl/ModelInteractionControl';

export const HomePageControl: React.FC<IHomePageControl> = ({
  callbackPanUp, callbackPanDown, callbackPanLeft, callbackPanRight,
  callbackPanCenter, callbackZoomIn, callbackZoomOut
}) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  return (
    <div
      role="div"
      aria-label="home-page-control"
      className="home-page-control grid grid-cols-2">
      <div className="home-page-control__control col-start-2">

      </div>
      <div className="home-page-control__control">
        <ModelViewModeControl />
      </div>
      <div className="home-page-control__control">
        <ModelInteractionControl
          callbackPanCenter={callbackPanCenter}
          callbackPanDown={callbackPanDown}
          callbackPanLeft={callbackPanLeft}
          callbackPanRight={callbackPanRight}
          callbackPanUp={callbackPanUp}
          callbackZoomIn={callbackZoomIn}
          callbackZoomOut={callbackZoomOut}
        />
      </div>
    </div>
  );
};
