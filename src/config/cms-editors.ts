export interface CmsEditorEntry {
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}

/**
 * Initial curated list of explicit CMS editors and superadmins.
 * Superadmins have full rights to publish content and manage editor access.
 * Editors have permissions to update content fields, but cannot modify critical system config.
 */
export const INITIAL_CMS_EDITORS: CmsEditorEntry[] = [
  { email: 'admin@lidingofreeskiers.se', name: 'Kansli Freeskiers', role: 'superadmin' },
  { email: 'kontakt@lidingofreeskiers.se', name: 'Klubbinfo', role: 'editor' },
];
