import type { CmsGroupInfo } from "@/types/cms";

/**
 * Built-in core groups that power dedicated site routes (/helgskidskola, /skidklubb, /hostsasong, /privatlektion).
 * These must be preserved to maintain site route integrity.
 */
export const CORE_GROUP_SLUGS = [
  "helgskidskola",
  "skidklubb",
  "hostsasong",
  "privatlektion",
] as const;

export type CoreGroupSlug = (typeof CORE_GROUP_SLUGS)[number];

export function isCoreGroup(keyOrSlug: string): boolean {
  return CORE_GROUP_SLUGS.includes(keyOrSlug as CoreGroupSlug);
}

/**
 * Pure helper to safely delete a group from a groups dictionary.
 * Prevents deletion of core groups and the last remaining group.
 */
export function deleteGroupFromGroups(
  groups: Record<string, CmsGroupInfo>,
  keyToDelete: string,
): { success: boolean; groups: Record<string, CmsGroupInfo>; error?: string } {
  if (isCoreGroup(keyToDelete)) {
    return {
      success: false,
      groups,
      error: `Gruppen "${groups[keyToDelete]?.name || keyToDelete}" är en kärngrupp och krävs för webbplatsens rutter. Den kan inte tas bort.`,
    };
  }

  const keys = Object.keys(groups);
  if (keys.length <= 1) {
    return {
      success: false,
      groups,
      error: "Du kan inte ta bort den sista träningsgruppen.",
    };
  }

  const next = { ...groups };
  delete next[keyToDelete];
  return { success: true, groups: next };
}
