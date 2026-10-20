export interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
}

type ViewTransitionUpdate = () => void | Promise<void>;

type StartViewTransition = (update: ViewTransitionUpdate) => ViewTransition;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  } catch {
    return false;
  }
}

export function startViewTransition(update: ViewTransitionUpdate): ViewTransition | undefined {
  const start = (document as Document & { startViewTransition?: StartViewTransition }).startViewTransition;
  if (!start || prefersReducedMotion()) return undefined;
  return start.call(document, update);
}
