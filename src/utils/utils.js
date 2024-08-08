import { useCallback, useEffect, useRef } from "react";

export const useOutside = (ref, func) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, func]);
};
export const isAuthenticated = () => {
  const authToken = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("authToken="));
  return !!authToken;
};
export const setCookie = ({ value, expires }) => {
  document.cookie = `authToken=${value}; path=/; expires=${expires};`;
};
export const getCookie = (name) => {
  let cookieStr = document.cookie;
  cookieStr.split("; ").forEach((item) => {
    if (item.search(name) !== -1) {
      cookieStr = item.split("=")[1];
    }
  });

  return cookieStr.trim();
};
export const clearCookie = () => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie =
      cookie.split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });
};
export const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date) || date === "Invalid Date")
    return false;
  return date.toISOString().split("T")[0];
};
export const useDebounced = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};
