import './DetailPage.scss'
import React, { useEffect, useState } from 'react';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { FullPageTitleBar, ItemDetail, ItemDetailEdit, SearchBarRedirect } from 'src/components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useQuery } from 'src/helpers/hooks/useQuery';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { capitalizeAndMapInformationField } from 'src/helpers/capitalize';
import { useMediaQuery } from 'react-responsive';
import { MobileTitleBar, SideMenu } from 'src/components/common/responsive';
import { getAcupuncturePointByCode, getMeridianByCode } from 'src/helpers/api/items';

export const DetailPage: React.FC<IDetailPage> = ({

}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const hookQuery = useQuery();

  const [isPoint, setIsPoint] = useState<boolean>(false);
  const [itemCode, setItemCode] = useState<string>("");
  const [detail, setDetail] = useState<any>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // RESPONSIVE
  const [isShowingSideMenu, setIsShowingSideMenu] = useState<boolean>(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const [mobileCalledEditDetail, setMobileCalledEditDetail] = useState<number>(0);

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const MySwal = withReactContent(Swal);
  const handleUpdate = (newItemDetail: any) => {
    if (!isDesktop) {
      setMobileCalledEditDetail(0);
    }

    let formattedDetail = { ...newItemDetail }
    Object.keys(formattedDetail).forEach((field) => {
      Object.defineProperty(formattedDetail, capitalizeAndMapInformationField(isPoint, field, currentLanguage),
        Object.getOwnPropertyDescriptor(formattedDetail, field));
      delete formattedDetail[field];
    })

    MySwal.fire({
      icon: 'warning',
      title: `${t('edit_page.warning')}...`,
      html: `<p>${t('edit_page.demo_caution')}</p>
      <pre style="text-align: left; white-space: pre-wrap;">${JSON.stringify(formattedDetail, null, "\t")}</pre>
      `,
    })
      .then(() => {
        history.push(location.pathname.replace("?edit", ""))
      })
  }

  useEffect(() => {
    let pathParts = location.pathname.split("/")
    if (pathParts.length === 4) {
      setIsPoint(pathParts[2] === "point")
      setItemCode(pathParts[3])
    } else {
      history.push("/", { isRedirect: true })
    }
    setIsEdit(hookQuery.get("edit") === "")
  }, [location])

  useEffect(() => {
    const getItemInformation = async () => {
      if (isPoint) {
        const item = await getAcupuncturePointByCode(currentLanguage, itemCode) as IAcupuncturePoint

        if (Object.keys(item).length === 0) {
          //Redirect to home page
          history.push("/advanced-search")
        }

        setDetail(item)
        document.title = `${APP_NAME} | ${item.code} | ${item.name}`
      } else {
        const item = await getMeridianByCode(currentLanguage, itemCode) as IMeridian

        if (Object.keys(item).length === 0) {
          //Redirect to home page
          history.push("/advanced-search")
        }

        setDetail(item)
        document.title = `${APP_NAME} | ${item.code} | ${item.name}`
      }
    }

    if (itemCode) {
      getItemInformation();
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
        {isDesktop ? <FullPageTitleBar
          pageCode={isEdit ? "data-management" : ""}
          translateCode={isEdit ? "data_management" : ""}
        /> :
          <MobileTitleBar
            translateCode={isEdit ? "data_management" : itemCode}
            isShowingSideMenu={isShowingSideMenu}
            callbackSetIsShowingSideMenu={setIsShowingSideMenu}
            isEdit={isEdit}
            isViewingDetail={!isEdit}
            callbackTriggerEditDetail={() => {
              setMobileCalledEditDetail(mobileCalledEditDetail + 1)
            }}
          />}

        {!isDesktop && <>
          <SideMenu
            isShowing={isShowingSideMenu}
            callbackSetIsShowing={setIsShowingSideMenu}
          />
        </>}


        <SearchBarRedirect />

        {Object.keys(detail).length > 0 && (
          !isEdit ? <ItemDetail
            item={detail}
            usingLanguage={currentLanguage}
            isPoint={isPoint}
            query={hookQuery.get('query')}
          /> : <ItemDetailEdit
            item={detail}
            usingLanguage={currentLanguage}
            isPoint={isPoint}
            query={hookQuery.get('query')}
            callbackUpdateDetail={handleUpdate}
            mobileCalledEditDetail={mobileCalledEditDetail}
          />
        )}
      </div>
    </div>
  );
};
