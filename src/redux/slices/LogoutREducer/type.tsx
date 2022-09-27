export enum AlertType {
  NO_INTERNET,
  LOGOUT,
}

export enum AlertImageType {
  ROBOT = 'ROBOT',
  EXCLAMATION = 'EXCLAMATION',
}

export interface Alert {
  type: AlertType;
  message?: string;
  code?: string;
  imageType?: AlertImageType.ROBOT | AlertImageType.EXCLAMATION;
  hideReportAnIssueButton?: boolean;
  title?: string;
  data?: any;
  direction?: 'upper' | 'lower';
}

export interface AlertState {
  alert: Alert | null;
}
