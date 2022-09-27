import {ScreenRoute} from './ScreenRoute';

export type ScreenRouteAndParam = {
  //Login Routs
  [ScreenRoute.LOGIN_SCREEN]: undefined;
  [ScreenRoute.METER_VIEW]: undefined;
  [ScreenRoute.FIREBASE_LOGIN]: undefined;
  [ScreenRoute.AWS_LOGIN_SCREEN]: undefined;
  [ScreenRoute.FIREBASE_SIGN_UP]: undefined;
  // Tab Screen Routes
  [ScreenRoute.HOME_SCREEN]: undefined;
  [ScreenRoute.SEARCH_SCREEN]: undefined;
  [ScreenRoute.NEW_SCREEN]: undefined;
  [ScreenRoute.LIKE_SCREEN]: undefined;
  [ScreenRoute.PROFILE_SCREEN]: undefined;
  [ScreenRoute.DETAIL_SCREEN]: {
    itm: any;
  };
};
