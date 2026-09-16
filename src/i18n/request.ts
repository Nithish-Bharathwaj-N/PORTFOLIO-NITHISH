import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './settings';

export default getRequestConfig(async () => {
    return {
        locale: defaultLocale,
        messages: (await import(`../../messages/en.json`)).default,
        timeZone: 'Asia/Kolkata'
    };
});
