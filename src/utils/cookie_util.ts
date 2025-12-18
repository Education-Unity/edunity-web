export function setCookie(name: string, value: string, days?: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/; secure; samesite=strict`;
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const parts = document.cookie.split(";");
  for (let part of parts) {
    part = part.trim();
    if (part.startsWith(nameEQ)) {
      return decodeURIComponent(part.substring(nameEQ.length));
    }
  }
  return null;
}

export function clearCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
}

// Token helpers
export function storeToken(token: string, remember: boolean) {
  if (remember) {
    setCookie("auth_token", token, 30);
  } else {
    setCookie("auth_token", token);
  }
}

export function getToken() {
  return getCookie("auth_token");
}

export function clearToken() {
  clearCookie("auth_token");
}

// Remember Me helpers
export function storeRemember(value: boolean) {
  setCookie("remember_me", value ? "1" : "0", 30);
}

export function getRemember(): boolean {
  return getCookie("remember_me") === "1";
}

export function clearRemember() {
  clearCookie("remember_me");
}