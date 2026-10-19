export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

const isTheme = (value: unknown): value is Theme => value === 'dark' || value === 'light';

export function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  try {
    return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function getCurrentTheme(): Theme {
  const applied = document.documentElement.dataset.theme;
  return isTheme(applied) ? applied : getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    return;
  }
}

export function watchSystemTheme(onChange: (theme: Theme) => void): () => void {
  try {
    const query = window.matchMedia(DARK_QUERY);
    const listener = (event: MediaQueryListEvent) => onChange(event.matches ? 'dark' : 'light');
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  } catch {
    return () => undefined;
  }
}
