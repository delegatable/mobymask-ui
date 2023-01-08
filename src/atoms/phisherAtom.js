import { atomWithStorage } from "jotai/utils";

export const pendingPhishersAtom = atomWithStorage(
  "pendingPhishers",
  localStorage.getItem("pendingPhishers") || []
);

export const pendingNotPhishersAtom = atomWithStorage(
  "pendingNotPhishers",
  localStorage.getItem("pendingNotPhishers") || []
);
