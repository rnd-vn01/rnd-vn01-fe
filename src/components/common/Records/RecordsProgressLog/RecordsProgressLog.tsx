import './RecordsProgressLog.scss';
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { MERIDIANS, SUMMARY_SHOWING_TIME_TYPES } from 'src/configs/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

export const RecordsProgressLog: React.FC<IRecordsProgressLog> = ({ }) => {
  const { t } = useTranslation();
  const [isProgress, setIsProgress] = useState<boolean>(true);
  const [showingTypeOption, setShowingTypeOption] = useState<number>(0);
  const [showingData, setShowingData] = useState<any>([]);
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  useEffect(() => {
    let testData = []

    if (isProgress) {
      MERIDIANS.forEach(meridian => {
        testData.push({
          caption: currentLanguage === "EN" ? `${meridian} ${t('general.meridian')}` : `${t('general.meridian')} ${meridian}`,
          percentage: Math.round(Math.random() * 100)
        })
      })
    }

    setShowingData(testData)
  }, [showingTypeOption, isProgress])

  return (
    <div
      role="div"
      aria-label="records-progress"
      className="records-progress p-2">

      <div className='w-full flex justify-between records-progress__title--container'>
        <span>
          <h1
            onClick={() => setIsProgress(true)}
            className={`inline records-progress__title ${isProgress ? "records-progress__title--selected" : ""}`}>
            {t('records.progress_log.options.progress')}</h1>
          <h1
            onClick={() => setIsProgress(false)}
            className={`inline ml-2 records-progress__title ${!isProgress ? "records-progress__title--selected" : ""}`}>
            {t('records.progress_log.options.log')}</h1>
        </span>

        {!isProgress && <span>
          {t('records.summary.showing')} {' '}
          <select
            className="records-progress__select"
            value={showingTypeOption}
            onChange={(e) => setShowingTypeOption(parseInt(e.target.value))}
          >
            {SUMMARY_SHOWING_TIME_TYPES.map(option => (
              <option
                className="records-progress__select--option"
                value={option.id}
                key={`records-progress-option-${option.id}`}
              >{t(`records.summary.options.${option.code}`)}</option>
            ))}
          </select>
        </span>}

      </div>

      {isProgress &&
        <div className='records-progress__progress'>
          {showingData.map(item => (
            <div className='records-progress__progress--item'>
              <div className='flex justify-between'>
                <p>{item.caption}</p>
                <p>{item.percentage}%</p>
              </div>

              <div className='records-progress__progress--percentage-bg'>
                <div className='records-progress__progress--percentage-cover' style={{
                  width: `${item.percentage}%`
                }} />
              </div>
            </div>
          ))}
        </div>}
    </div>
  );
};
