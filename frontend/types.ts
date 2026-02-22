/**
 * Shared type definitions for the Gun Library app.
 */

export interface Weapon {
    id: string;
    name: string;
    description: string;
    country: string;
    year: string;
    imageUrl: string | null;
}
