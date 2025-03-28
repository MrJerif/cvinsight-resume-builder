// Show an message if user perform action before changes are saved.
// e,g closing or refreshing the page before changes are saved to database...

import { useEffect } from "react";

export default function useUnloadWarning(condition = true) {
  useEffect(() => {
    if (!condition) return;

    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    // closing or refreshing
    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  }, [condition]);
}
