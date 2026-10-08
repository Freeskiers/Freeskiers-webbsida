/**
 * Enkel händelsekanal för att öppna Ekis-chatten från valfri knapp på sajten.
 */
export const EKIS_OPEN_EVENT = "open-ekis-chat";

export function openEkisChat() {
  window.dispatchEvent(new Event(EKIS_OPEN_EVENT));
}
