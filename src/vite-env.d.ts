/// <reference types="vite/client" />

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

interface Window {
  fbq?: (...args: any[]) => void;
}
