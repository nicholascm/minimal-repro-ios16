/* An example app that uses expo-auth-session to connect to Azure AD (or hopefully most providers)

Features: 
- secure cache with refresh on load
- securely stored refresh token using expo-secure-store
- uses zustand for global access to the token / logout 

Based on [this gist](https://gist.github.com/thedewpoint/181281f8cbec10378ecd4bb65c0ae131)
*/

import * as AuthSession from "expo-auth-session";
import { useCallback, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

// --------------------------------------------------
// CONFIGURATION CONSTANTS
// --------------------------------------------------
const endpoint = "https://login.microsoftonline.com/common/v2.0";

const clientId = "your-client-id-here";
const scheme = "local-pd-clinic-native";
const scopes = ["openid", "offline_access", "profile", "email"];

const discoveryUrl = "https://login.microsoftonline.com/common/v2.0";

// --------------------------------------------------

export default function App() {
  const [token, setToken] = useState<string | null>("");
  const startLogin = useCallback(async () => {
    const discovery = await AuthSession.fetchDiscoveryAsync(discoveryUrl);
    const redirectUri = AuthSession.makeRedirectUri({
      scheme,
      path: "redirect",
    });
    const authRequest = await AuthSession.loadAsync(
      {
        responseType: "code",
        clientId: clientId,
        scopes: ["openid", "email", "profile", "offline_access"],
        redirectUri,
        extraParams: {
          prompt: "login",
        },
      },
      discovery
    );

    console.log("AuthSession.loadAsync successful");
    const data = await authRequest.promptAsync(discovery, {
      showInRecents: false,
    });
    console.log("AuthSession.promptAsync successful");

    const tokenResponse = await AuthSession.exchangeCodeAsync(
      {
        clientId: clientId,
        code: data?.params?.code || "",
        redirectUri,
        scopes: ["openid", "email", "profile", "offline_access"], // add back apiScope in here as an argument when api permissions needed
        extraParams: {
          code_verifier: authRequest.codeVerifier || "",
        },
      },
      discovery
    );
    console.log("AuthSession.exchangeCodeAsync successful");
    setToken(tokenResponse.accessToken);

    console.log("tokenResponse", Object.keys(tokenResponse));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello</Text>
      <Button title="Login" onPress={() => startLogin()} />
      {/* <View>{JSON.stringify(token, null, 2)}</View> */}
    </View>
  );
}
