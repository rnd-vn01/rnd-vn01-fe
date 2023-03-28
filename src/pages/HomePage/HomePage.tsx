import './HomePage.scss'
import React, { useEffect, useRef, useState } from 'react';
import {
  AuthBar, HomePageControl, HomeTitle, InformationBlock, QuickSearchBar
} from 'src/components/common';
import DemoImage from "src/assets/images/Demo.png";
import { Canvas } from '@react-three/fiber'
import { Scene } from 'src/components/index';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { APP_NAME } from 'src/configs/constants';
import { LanguagePicker } from 'src/components/common';
import { QuickInformationMiddleware } from 'src/components/middleware';
import { CursorControlMiddleware } from 'src/components/middleware';
import { useLocation } from 'react-router-dom';
import { SideMenu } from 'src/components/common/responsive/SideMenu/SideMenu';
import { useMediaQuery } from 'react-responsive';
import { MenuBar } from 'src/components/common/responsive/MenuBar/MenuBar';

export const HomePage: React.FC = () => {
  const [isShowingLanding, setIsShowingLanding] = useState<boolean>(true);

  // MOBILE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const [isShowingSearchBar, setIsShowingSearchBar] = useState<boolean>(false);

  const location = useLocation() as any;
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const {
    isShowingQuickInformation
  } = useSelector(
    (state: RootState) => state.selectionSlice,
  );
  const {
    modelLoaded
  } = useSelector(
    (state: RootState) => state.globalSlice,
  );

  const sceneRef = useRef();
  const triggerEmergency = useRef<boolean>(false);

  document.title = `${APP_NAME}`

  useEffect(() => {
    if (location?.state?.isRedirect) {
      setIsShowingLanding(false);
    } else {
      setTimeout(() => {
        if (!modelLoaded) {
          triggerEmergency.current = true;
          setIsShowingLanding(false);
        }
      }, 5000);
    }
  }, [])

  useEffect(() => {
    if (modelLoaded) {
      setTimeout(() => {
        if (!triggerEmergency.current) {
          setIsShowingLanding(false)
        }
      }, 3000);
    }
  }, [modelLoaded])

  return (
    <div
      role="div"
      aria-label="home-page"
      className="home-page grid">
      <div
        className="home-page__section home-page__section--model">
        <Canvas shadows>
          <Scene
            ref={sceneRef}
          />
        </Canvas>
        {/* <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          src={DemoImage}></img> */}
      </div>

      {!isMobile &&
        <>
          <div className="home-page__section--side-bar">
            <QuickSearchBar />
          </div>

          <div className="home-page__section--menu">
            <AuthBar />
          </div>

          <div className="home-page__section--language">
            <LanguagePicker />
          </div>

          <div className="home-page__section--controls">
            <HomePageControl
              isQuizPage={false}
              callbackPanCenter={() => (sceneRef.current as any)?.panCenter()}
              callbackPanDown={() => (sceneRef.current as any)?.panDown()}
              callbackPanLeft={() => (sceneRef.current as any)?.panLeft()}
              callbackPanRight={() => (sceneRef.current as any)?.panRight()}
              callbackPanUp={() => (sceneRef.current as any)?.panUp()}
              callbackZoomIn={() => (sceneRef.current as any)?.zoomIn()}
              callbackZoomOut={() => (sceneRef.current as any)?.zoomOut()}
            />
          </div>
        </>}

      {(isShowingQuickInformation != null) &&
        <div
          role="div"
          aria-label="home-page-information"
          className="home-page__section--information">
          <InformationBlock
            isPoint={isShowingQuickInformation?.type === "point"}
            itemInformation={isShowingQuickInformation?.content}
            usingLanguage={currentLanguage}
          />
        </div>}

      {/* Middleware */}
      <QuickInformationMiddleware />
      <CursorControlMiddleware />

      {/* Landing page */}
      <div
        role="div"
        aria-label="home-page-landing"
        className={`home-page__landing ${!isShowingLanding ? "home-page__landing--hidden" : ""}`}
        onClick={() => {
          if (modelLoaded)
            setIsShowingLanding(false)
        }}
      >
        <div className='home-page__landing--container'>
          {modelLoaded && <HomeTitle />}
        </div>
      </div>

      {isMobile && <>
        <MenuBar
          isShowingSideMenu={isShowingSideMenu}
          callbackSetIsShowingSideMenu={setIsShowingSideMenu}
          isShowingSearchBar={isShowingSearchBar}
          callbackSetIsShowingSearchBar={setIsShowingSearchBar}
        />
        <SideMenu
          isShowing={isShowingSideMenu}
          callbackSetIsShowing={setIsShowingSideMenu}
        />
        {isShowingSearchBar && <div className="home-page__section--side-bar">
          <QuickSearchBar />
        </div>}
      </>}
    </div>
  );
};
