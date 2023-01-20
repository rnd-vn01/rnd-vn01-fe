import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useTranslation } from 'react-i18next';

export const BasicRoute: React.FC<IBasicRoute> = ({
  component: Component,
  layout: Layout,
  isPrivate,
  exact,
  path,
  isLogoOnlyHeader
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  // Hooks
  useEffect(() => {
    // Update current language to i18n
    i18n.changeLanguage(currentLanguage?.toLowerCase() || "en")
  }, []);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: any) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};
