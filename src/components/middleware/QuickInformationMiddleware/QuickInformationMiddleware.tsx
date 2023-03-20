import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';

import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';
import { setShowingQuickInformation } from 'src/redux/slice';
import { getAcupuncturePointByCode, getMeridianByCode } from 'src/helpers/api/items';

export const QuickInformationMiddleware: React.FC = ({ }) => {
  const {
    selectedLabel,
    selectedType,
  } = useSelector(
    (state: RootState) => state.selectionSlice,
  );

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getItemInformation = async () => {
      if (selectedLabel != undefined) {
        if (selectedType === "point") {
          const item = await getAcupuncturePointByCode(currentLanguage, selectedLabel)
          dispatch(setShowingQuickInformation({
            quickInformation: {
              type: "point",
              content: item
            }
          }))
        } else {
          const item = await getMeridianByCode(currentLanguage, selectedLabel)
          dispatch(setShowingQuickInformation({
            quickInformation: {
              type: "line",
              content: item
            }
          }))
        }
      } else {
        dispatch(setShowingQuickInformation({
          quickInformation: null
        }))
      }
    }

    getItemInformation();
  }, [selectedLabel, selectedType])

  return (
    <div
      role="div"
      aria-label="quick-information-middleware"
      className="quick-information-middleware">

    </div>
  );
};
