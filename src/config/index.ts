const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
const hubUrl = process.env.NEXT_PUBLIC_HUB_URL!;
const appName = process.env.APP_NAME!;

export const config = {
    appName,
    baseUrl,
    loginUrl: `${baseUrl}/auth/login`,
    logoutUrl: `${baseUrl}/auth/logout`,
//    authSsoUrl: `${baseUrl}/auth/sso`,

    // backend
    beAuthUrl: `${baseUrl}/be/auth`,
    beCommonUrl: `${baseUrl}/be/common`,


    // hub
    hubStorageUrl: `/hub/Storage/GW/ImageStorage/Employee/`,
}