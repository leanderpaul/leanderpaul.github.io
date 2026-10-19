import { DEFAULT_RESUME_VARIANT, type ResumeVariant } from '@app/content';

const TIME_ZONE_VARIANTS = new Map<string, ResumeVariant>([
  ['Asia/Dubai', 'ae'],
  ['Asia/Kolkata', 'in'],
  ['Asia/Calcutta', 'in'],
]);

export function getResumeVariant(): ResumeVariant {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIME_ZONE_VARIANTS.get(timeZone) ?? DEFAULT_RESUME_VARIANT;
  } catch {
    return DEFAULT_RESUME_VARIANT;
  }
}
