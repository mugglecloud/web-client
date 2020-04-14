import { useMemo } from "react";
import short from "short-uuid";
import { useMediaQuery } from "@material-ui/core";

export const useMemoizedShortId = () => useMemo(() => short.generate(), []);

export const useMobile = () => useMediaQuery("(max-width:600px)");
