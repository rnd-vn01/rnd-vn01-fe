import './PersonalRecordsPage.scss'
import React, { useEffect, useState } from 'react';
import {
  RecordsChart,
  RecordsProgressLog,
  RecordsSummary,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import { useMediaQuery } from 'react-responsive';
import { PersonalRecordsPageDesktop } from './desktop/PersonalRecordsPageDesktop';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { getQuizzesOfUsers } from 'src/helpers/api/quizRecords';
import { useHistory } from 'react-router-dom';

export const PersonalRecordsPage: React.FC<IPersonalRecordsPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('personal_records_page.title')}`
  const {
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );
  const [quizzesList, setQuizzesList] = useState<any>([]);
  const [render, setRender] = useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const result = await getQuizzesOfUsers(user.firebaseId)
        setQuizzesList(result)
      } catch {
        alert(t('login_page.messages.save_quiz_error')) // NOT_TESTED
        history.push("/", { isRedirect: true })
      }
    }

    getQuizzes();
  }, [])

  useEffect(() => {
    if (quizzesList.length) { // NOT_TESTED
      setRender(render + 1);
    }
  }, [quizzesList])

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  return (
    <>
      {!isDesktop ? <div
        role="div"
        aria-label="personal-records-page"
        className="personal-records-page grid grid-cols-7">
        <div
          key={render}
          className="personal-records-page__content">
          <MobileTitleBar
            translateCode={"personal_records"}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu} />

          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />

          <RecordsSummary
            data={quizzesList}
          />

          <div className={`grid pt-3 gap-3 grid-cols-1`}>
            <div className="col-span-1">
              <RecordsProgressLog
                quizzesList={quizzesList}
              />
            </div>

            <div className={`col-span-1`}>
              <RecordsChart
                quizzesList={quizzesList}
              />
            </div>
          </div>
        </div>
      </div> : <PersonalRecordsPageDesktop />}
    </>
  );
};
