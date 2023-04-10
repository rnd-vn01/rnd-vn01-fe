import './ManualPage.scss'
import React, { useEffect, useState } from 'react';
import {
  FullPageTitleBar,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';

import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import { useMediaQuery } from 'react-responsive';

import Logo from "src/assets/images/Logo.svg";

export const ManualPage: React.FC = () => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('manual_page.title')}`

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div
      role="div"
      aria-label="manual-page"
      className="manual-page">
      <div className="about-us-page__content">
        {isDesktop ? <FullPageTitleBar
          pageCode="manual"
          translateCode="manual"
        />
          :
          <MobileTitleBar
            translateCode={"manual"}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu} />}

        {!isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>}

        <div className='w-full'>
          <div className='manual-page__head flex items-center justify-center'>
            <img className='manual-page__head--logo mr-4' src={Logo} />
            <h1 className='manual-page__head--project-name'>
              {t('hometitle.project_name')}
            </h1>
          </div>

          {isDesktop &&
            <div className='manual-page__desktop'>
            </div>}

          {!isDesktop &&
            <div className='manual-page__mobile'>
            </div>}
        </div>
      </div>
    </div >
  );
};
