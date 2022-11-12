import { ScrollView, View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

let styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    paddingBottom: 5,
  },
  text: {
    color: "white",
  },
  scrollView: {},
  navButton: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    backgroundColor: theme.colors.appBarSecondary,
    borderRadius: 8,
  },
});

const NavButton = ({ to, nav, children }) => {
  return (
    <Pressable onPressIn={() => nav(to)} style={styles.navButton}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};
const AppBar = () => {
  const { data, loading } = useQuery(GET_ME);
  const nav = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signInLogoutButtonProps = {
    data,
    loading,
    apolloClient,
    authStorage,
    nav,
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <NavButton nav={nav} to={"/"}>
          Repositories
        </NavButton>
        <NavButton nav={nav} to={"/new-review"}>
          New Review
        </NavButton>
        <SignInLogoutButton {...signInLogoutButtonProps} />
      </ScrollView>
    </View>
  );
};

const SignInLogoutButton = ({
  loading,
  data,
  authStorage,
  apolloClient,
  nav,
}) => {
  return (
    <>
      {!loading && data?.me ? (
        <Pressable
          style={styles.navButton}
          onPressIn={async () => {
            await authStorage.removeAccessToken();
            apolloClient.resetStore();
          }}
        >
          <Text style={styles.text}>LogOut</Text>
        </Pressable>
      ) : (
        <NavButton nav={nav} to={"/sign-in"}>
          SignIn
        </NavButton>
      )}
    </>
  );
};

export default AppBar;
