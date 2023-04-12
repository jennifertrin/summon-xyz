import "@/styles/globals.css";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId:
          process.env.NODE_ENV == "development"
            ? (process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID_DEV as string)
            : (process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID_PROD as string),
      }}
    >
      <Component {...pageProps} />
    </DynamicContextProvider>
  );
}
