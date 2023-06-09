/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
    // eslint-disable-next-line
    readonly VITE_DOMAIN: 'http://dev.hashprisetest.com' | 'https://www.hashprisetest.com' | 'https://www.hashprise.com';
    readonly VITE_API: '/api' | 'https://api.hashprisetest.com' | 'https://api.hashprise.com'
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare const __VUE_OPTIONS_API__: boolean
