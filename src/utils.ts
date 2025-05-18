/**
 * Importing npm packages
 */

/**
 * Importing user defined packages
 */

/**
 * Defining types
 */

/**
 * Declaring the constants
 */
const supportedCountries = ['IN', 'AE'];

export function getCountryByDate(): string {
  const timezoneOffset = new Date().getTimezoneOffset();
  if (timezoneOffset === -330) return 'IN';
  else if (timezoneOffset === -240) return 'AE';
  else return 'GLOBAL';
}

export async function getCountryByIP(): Promise<string> {
  const response = await fetch('https://ipapi.co/json');
  if (response.status !== 200) return 'GLOBAL';
  const data = await response.json();
  const countryCode = data.country_code;
  if (supportedCountries.includes(countryCode)) return countryCode;
  else return 'GLOBAL';
}
