/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PureValue = any;
type PureObject = Record<string, PureValue>;
type PureArray = PureObject[];

declare const __DIR_PAGES__: string;
declare const __DIR_SRC__: string;
declare const __APP_VERSION__: string;

interface Window {
  FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean;
}
