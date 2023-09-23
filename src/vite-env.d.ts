/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

import { Address } from 'viem'

interface ImportMetaEnv {
  readonly VITE_WORLDID_APP_ID: string
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string
  readonly VITE_CHAIN_ID: string
  readonly VITE_JSON_RPC_URL: string
  readonly VITE_WORLDID_ACTION_ID: string
  readonly VITE_GAME_LAUNCHER_CONTRACT_ADDRESS: Address
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
