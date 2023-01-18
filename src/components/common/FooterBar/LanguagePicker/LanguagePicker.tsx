import './LanguagePicker.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { LANGUAGES_LIST, setStateLanguage } from 'src/redux/slice';

export const LanguagePicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isShowingDropdown, setIsShowingDropdown] = useState<boolean>(false);

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const setLanguage = (option: string) => {
    dispatch(setStateLanguage({
      currentLanguage: option
    }))
    setIsShowingDropdown(false);
  }

  return (
    <div
      role="div"
      aria-label="language-picker"
      className="language-picker flex flex-col items-end justify-center">
      {isShowingDropdown &&
        <div className="language-picker__dropdown w-fit h-fit flex flex-col items-end justify-center">
          {LANGUAGES_LIST.map((language, index) => (
            <div
              className={`language-picker__dropdown--item w-full 
              ${language === currentLanguage ? "language-picker__dropdown--selected" : ""}`}
              onClick={() => { setLanguage(language) }}
              key={`language-${index}`}>
              {language}
            </div>
          ))}
        </div>}
      <div className="language-picker__current flex items-center justify-center cursor-pointer"
        onClick={() => setIsShowingDropdown(!isShowingDropdown)}>
        {currentLanguage}
      </div>
    </div>
  );
};
