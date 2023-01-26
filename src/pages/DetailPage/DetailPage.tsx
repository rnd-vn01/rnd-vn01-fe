import './DetailPage.scss'
import React, { useEffect, useState } from 'react';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { FullPageTitleBar, ItemDetail, SearchBarRedirect } from 'src/components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import { useQuery } from 'src/helpers/hooks/useQuery';

export const DetailPage: React.FC<IDetailPage> = ({

}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const hookQuery = useQuery();

  const [isPoint, setIsPoint] = useState<boolean>(false);
  const [itemCode, setItemCode] = useState<string>("");
  const [detail, setDetail] = useState<any>({});

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  useEffect(() => {
    let pathParts = location.pathname.split("/")
    if (pathParts.length === 4) {
      setIsPoint(pathParts[2] === "point")
      setItemCode(pathParts[3])
    } else {
      history.push("/")
    }
  }, [location])

  useEffect(() => {
    if (itemCode) {
      const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI
      DEMO_DATA.forEach((item) => {
        if (item.code.toUpperCase() === itemCode.toUpperCase()) {
          setDetail(item)
          document.title = `${APP_NAME} | ${item.code} | ${item.name}`
        }
      })
    } else {
      document.title = `${APP_NAME}`
    }
  }, [itemCode, isPoint])

  return (
    <div
      role="div"
      aria-label="detail-page"
      className="detail-page ">
      <div className="detail-page__content">
        <FullPageTitleBar
          pageCode=""
          translateCode=""
        />

        <SearchBarRedirect />

        {Object.keys(detail).length > 0 && <ItemDetail
          item={detail}
          usingLanguage={currentLanguage}
          isPoint={isPoint}
          query={hookQuery.get('query')}
        />}
      </div>
    </div>
  );
};
