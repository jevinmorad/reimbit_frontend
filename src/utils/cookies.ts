export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

type CookieOptions = {
  days?: number;
  path?: string;
  sameSite?: 'Lax' | 'Strict' | 'None';
  secure?: boolean;
};

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  const {
    days = 7,
    path = '/',
    sameSite = 'Lax',
    secure = window.location.protocol === 'https:',
  } = options;

  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  const encoded = encodeURIComponent(value);

  document.cookie = `${name}=${encoded}; Expires=${expires}; Path=${path}; SameSite=${sameSite};${secure ? ' Secure;' : ''}`;
};

export const removeCookie = (name: string, path: string = '/'): void => {
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}; SameSite=Lax;`;
};
