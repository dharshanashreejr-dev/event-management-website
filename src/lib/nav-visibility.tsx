import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type NavVisibilityContextValue = {
  visible: boolean;
  reveal: () => void;
};

const NavVisibilityContext = createContext<NavVisibilityContextValue | null>(null);
const STORAGE_KEY = "bala-decors-nav-revealed";

export function NavVisibilityProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const reveal = useCallback(() => {
    setVisible(true);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ visible, reveal }), [visible, reveal]);

  return (
    <NavVisibilityContext.Provider value={value}>{children}</NavVisibilityContext.Provider>
  );
}

export function useNavVisibility() {
  const ctx = useContext(NavVisibilityContext);
  if (!ctx) throw new Error("useNavVisibility must be used within NavVisibilityProvider");
  return ctx;
}
