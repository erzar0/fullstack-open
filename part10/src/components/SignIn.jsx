import Text from "./Text";
import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { useSignIn } from "../hooks/useSignIn";
// import AuthStorage from "../utils/authStorage";`

const initialValues = { username: "", password: "" };

const style = StyleSheet.create({
  formContainer: {
    display: "flex",
    alignItems: "stretch",
  },
  textInput: {
    fontSize: 20,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    marginBottom: 5,
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    fontSize: 20,
    padding: 10,
    margin: 10,
    backgroundColor: theme.colors.primary,
    color: "white",
  },
  submitButtonText: { color: "white", fontSize: 20 },
});
function SignInForm({ onSubmit }) {
  return (
    <View style={style.formContainer}>
      <FormikTextInput
        style={style.textInput}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={style.textInput}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable style={style.submitButton} onPress={onSubmit}>
        <Text style={style.submitButtonText}>SignIn</Text>
      </Pressable>
    </View>
  );
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
  password: yup
    .string()
    .min(8, "Too short!")
    .max(32, "Too long!")
    .required("Required"),
});
export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
