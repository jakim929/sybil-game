/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORLDID_APP_ID: string
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string
  readonly VITE_CHAIN_ID: string
  readonly VITE_JSON_RPC_URL: string
  readonly VITE_WORLDID_ACTION_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
