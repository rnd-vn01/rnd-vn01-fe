import './PersonalRecordsPageDesktop.scss'
import React, { useState } from 'react';
import {
  FullPageTitleBar,
  RecordsChart,
  RecordsProgressLog,
  RecordsSummaryDesktop,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export const PersonalRecordsPageDesktop: React.FC<IPersonalRecordsPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('data_management_page.title')}`

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  return (
    <div
      role="div"
      aria-label="personal-records-page-desktop"
      className="personal-records-page-desktop grid grid-cols-7">
      <div className="personal-records-page-desktop__content">
        <FullPageTitleBar
          pageCode="personal-records"
          translateCode="personal_records"
        />

        <RecordsSummaryDesktop
          data={{
            "points": 150,
            "meridians": 10,
            "quizzes": 20,
            "accuracy": 67
          }}
        />

        <div className={`grid pt-3 gap-3 grid-cols-3`}>
          <div className="col-span-1">
            <RecordsProgressLog />
          </div>

          <div className={`col-span-2`}>
            <RecordsChart />
          </div>
        </div>
      </div>
    </div>
  );
};
