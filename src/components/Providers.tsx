import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig } from 'wagmi'
import { configureChains, createConfig, Chain } from 'wagmi'
import { foundry, optimism, optimismGoerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const chainById: Record<number, Chain> = {
  [optimism.id]: optimism,
  [optimismGoerli.id]: optimismGoerli,
  [foundry.id]: foundry,
}

const chain = chainById[parseInt(import.meta.env.VITE_CHAIN_ID)]

const { chains, publicClient } = configureChains(
  [chain],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: import.meta.env.VITE_JSON_RPC_URL,
      }),
    }),
    publicProvider(),
  ],
)

const queryClient = new QueryClient()

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      options: {
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
        showQrModal: false,
      },
    }),
    new InjectedConnector({ options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ options: { appName: 'Sybil Game' } }),
  ],
  publicClient,
  queryClient,
})

createWeb3Modal({
  wagmiConfig,
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#3b82f6',
  },
})

export const Providers = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </QueryClientProvider>
  )
}
