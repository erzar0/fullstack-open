import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const [authenticate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    try {
      const query = await authenticate({
        variables: { credentials },
      });
      const accessToken = query?.data?.authenticate?.accessToken;
      if (accessToken) {
        await authStorage.setAccessToken(accessToken);
        console.log(accessToken);
        apolloClient.resetStore();
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return [signIn, result];
};

export { useSignIn };
