import { getRequestConfig } from 'next-intl/server';

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async () => {
    return {
        locale: defaultLocale,
        messages: (await import(`../../messages/en.json`)).default,
        timeZone: 'Asia/Kolkata'
    };
});
