// env.d.ts
declare module '@env' {
    export const ENV: 'development' | 'production' | 'staging';
    export const API_URL_LOCAL: string;
    export const API_URL_REMOTE: string;
    export const LOC: string;
}
  