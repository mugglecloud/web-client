import { useMemo } from "react";
import short from "short-uuid";

export const useMemoizedShortId = () => useMemo(() => short.generate(), []);
