import { DynamicContextProvider, DynamicWidget } from "@dynamic-labs/sdk-react";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId:
        process.env.NODE_ENV == "development"
          ? (process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID_DEV as string)
          : (process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID_PROD as string),
    }}
  >
      <DynamicWidget />
  </DynamicContextProvider>
);

export default App;
