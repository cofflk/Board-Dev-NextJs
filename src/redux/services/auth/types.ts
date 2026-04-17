export interface LogonUser {
    EMP_NO: string;
    USER_ID: string;
    USER_NM: string;
    USER_E_NM: string;
    COM_CD: string;
    COM_NM: string;
    COM_E_NM: string;
    DEPT_CD: string;
    DEPT_NM: string;
    DEPT_E_NM: string;
    TITLE_CD: string;
    TITLE_NM: string;
    TITLE_E_NM: string;
    DUTY_CD: string;
    DUTY_NM: string;
    DUTY_E_NM: string;
    JOB_CD: string;
    JOB_NM: string;
    JOB_E_NM: string;
    DEGREE_CD: string;
    DEGREE_NM: string;
    DEGREE_E_NM: string;
    COMP_TEL: string;
    MOBILE: string;
    MAIL: string;
    O365_YN: string;
    LOCALE_LANG: string;
    SEAT_TXT: string;
    PHOTO_URL: string;
    LEVEL_DETAIL: string;
    ENT_DATE: string;
    REGISTER_DATE: string;
    ATTEND_DT: string;
    ATTEND_TIME: string;
}

export interface LogonUserResponse {
    success: boolean;
    message: string;
    description: string;
    data: LogonUser;
    status: number;
}