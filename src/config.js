export const API = "http://10.58.7.192:8000";

export const LOCALHOST = "http://localhost:3000";
export const BEAPIROOT = "http://10.58.7.192:8000";
export const API_BOOK = "http://10.58.7.192:8000/book";
export const API_SAVE_BOOK = "http://10.58.7.192:8000/library/mybook";
export const TOKEN = localStorage.getItem("Authorization");

export const LIBRARY = [
  { id: 0, content: "도서" },
  { id: 1, content: "책장" },
  { id: 2, content: "포스트" },
  { id: 3, content: "통계" },
];

export const DEFALT_MYBOOKS_BACKGROUND =
  "https://images.unsplash.com/photo-1493219686142-5a8641badc78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

export const COMPLETED_BTN_IMG = "https://i.ibb.co/wSDskYv/shhhh.png";

export const SAVE_BTN_IMG =
  "https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Download-256.png";

export const DEFAULT_IMG =
  "https://secure.gravatar.com/avatar/64c49b6f852ad598fd9f6ad571a663a8?s=1024&d=mm&r=g";
