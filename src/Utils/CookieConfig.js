import * as Cookies from "js-cookie";

export const CookieConfig = {
  headers: {
    "content-type": "x-www-form-urlencoded; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Set-Cookie": Cookies.get("JSESSIONID"),
  },
  withCredentials: true,
};
