import './QuizPage.scss'
import React, { useEffect, useRef, useState } from 'react';
import {
  AuthBar,
  HomePageControl,
  QuizManager
} from 'src/components/common';
import DemoImage from "src/assets/images/Demo.png";
import { Canvas } from '@react-three/fiber'
import { Scene } from 'src/components/index';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useTranslation } from "react-i18next";
import { APP_NAME } from 'src/configs/constants';

export const QuizPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sceneRef = useRef();

  document.title = `${APP_NAME} | ${t('quiz_page.title')}`

  return (
    <div
      role="div"
      aria-label="quiz-page"
      className="quiz-page grid grid-cols-7">
      <div
        className="quiz-page__section quiz-page__section--model col-span-5">
        {/* <Canvas shadows>
          <Scene
            ref={sceneRef}
          />
        </Canvas> */}
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          src={DemoImage}></img>
      </div>

      <div className="quiz-page__section quiz-page__section--side-bar col-span-2">
        <QuizManager></QuizManager>
      </div>

      <div className="quiz-page__section--menu">
        <AuthBar />
      </div>

      <div className="quiz-page__section--controls">
        <HomePageControl
          isQuizPage={true}
          callbackPanCenter={() => (sceneRef.current as any).panCenter()}
          callbackPanDown={() => (sceneRef.current as any).panDown()}
          callbackPanLeft={() => (sceneRef.current as any).panLeft()}
          callbackPanRight={() => (sceneRef.current as any).panRight()}
          callbackPanUp={() => (sceneRef.current as any).panUp()}
          callbackZoomIn={() => (sceneRef.current as any).zoomIn()}
          callbackZoomOut={() => (sceneRef.current as any).zoomOut()}
        />
      </div>
    </div>
  );
};
