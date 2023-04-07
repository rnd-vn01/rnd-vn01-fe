import './PersonalRecordsPage.scss'
import React, { useEffect, useState } from 'react';
import {
  FullPageTitleBar,
  RecordsChart,
  RecordsProgressLog,
  RecordsSummary,
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { getQuizzesOfUsers } from 'src/helpers/api/quizRecords';
import { useHistory } from 'react-router-dom';

export const PersonalRecordsPage: React.FC<IPersonalRecordsPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('data_management_page.title')}`
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
        console.log("Going here")
        alert(t('login_page.messages.save_quiz_error'))
        history.push("/", { isRedirect: true })
      }
    }

    getQuizzes();
  }, [])

  useEffect(() => {
    if (quizzesList.length) {
      setRender(render + 1);
    }
  }, [quizzesList])

  return (
    <div
      role="div"
      aria-label="personal-records-page"
      className="personal-records-page grid grid-cols-7">
      <div
        key={render}
        className="personal-records-page__content">
        <FullPageTitleBar
          pageCode="personal-records"
          translateCode="personal_records"
        />

        <RecordsSummary
          data={quizzesList}
        />

        <div className="grid grid-cols-3 pt-3 gap-3">
          <div className="col-span-1">
            <RecordsProgressLog
              quizzesList={quizzesList}
            />
          </div>

          <div className="col-span-2">
            <RecordsChart
              quizzesList={quizzesList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
