import './PersonalRecordsPage.scss'
import React, { useState } from 'react';
import {
  FullPageTitleBar,
  RecordsChart,
  RecordsProgressLog,
  RecordsSummary,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import { useMediaQuery } from 'react-responsive';

export const PersonalRecordsPage: React.FC<IPersonalRecordsPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('data_management_page.title')}`

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  return (
    <div
      role="div"
      aria-label="personal-records-page"
      className="personal-records-page grid grid-cols-7">
      <div className="personal-records-page__content">
        {isDesktop ? <FullPageTitleBar
          pageCode="personal-records"
          translateCode="personal_records"
        />
          :
          <MobileTitleBar
            translateCode={"personal_records"}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu} />}

        {!isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>}

        <RecordsSummary
          data={{
            "points": 150,
            "meridians": 10,
            "quizzes": 20,
            "accuracy": 67
          }}
        />

        <div className={`grid pt-3 gap-3 ${isDesktop ? "grid-cols-3" : "grid-cols-1"}`}>
          <div className="col-span-1">
            <RecordsProgressLog />
          </div>

          <div className={`${isDesktop ? "col-span-2" : "col-span-1"}`}>
            <RecordsChart />
          </div>
        </div>
      </div>
    </div>
  );
};
