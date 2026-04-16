const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
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
}