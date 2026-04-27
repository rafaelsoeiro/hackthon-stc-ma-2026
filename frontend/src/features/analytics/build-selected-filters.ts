import type { FilterField } from '@/src/features/analytics/types';

export function buildSelectedFilters(
  fields: FilterField[],
  params: Record<string, string | string[] | undefined>,
): Record<string, string> {
  return fields.reduce<Record<string, string>>((acc, field) => {
    const raw = params[field.key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    const allowed = new Set(field.options.map((option) => option.value));
    acc[field.key] = value && allowed.has(value) ? value : field.options[0]?.value ?? '';
    return acc;
  }, {});
}
