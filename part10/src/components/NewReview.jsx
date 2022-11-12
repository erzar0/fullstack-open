import Text from "./Text";
import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: -1,
  text: "",
};

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
function NewReviewForm({ onSubmit }) {
  return (
    <View style={style.formContainer}>
      <FormikTextInput
        style={style.textInput}
        name="ownerName"
        placeholder="Owner name"
      />
      <FormikTextInput
        style={style.textInput}
        name="repositoryName"
        placeholder="Repository Name"
      />
      <FormikTextInput
        style={style.textInput}
        name="rating"
        placeholder="Rating in range 0-100"
      />
      <FormikTextInput
        style={style.textInput}
        name="text"
        placeholder="Textual review"
        multiline={true}
      />
      <Pressable style={style.submitButton} onPress={onSubmit}>
        <Text style={style.submitButtonText}>Create review</Text>
      </Pressable>
    </View>
  );
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(1, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
  repositoryName: yup
    .string()
    .min(1, "Too short!")
    .max(32, "Too long!")
    .required("Required"),
  rating: yup
    .number()
    .min(0, "Too small!")
    .max(100, "To high!")
    .required("Required"),
  text: yup.string().max(500, "Too long!"),
});
export const NewReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <NewReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const NewReview = () => {
  const [addReview, { data, loading, error }] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const result = await addReview({
        variables: {
          review: { ownerName, repositoryName, rating: parseInt(rating), text },
        },
      });
      navigate("/" + result?.data?.createReview?.repositoryId);
    } catch (e) {
      console.log(e);
    }
  };

  return <NewReviewContainer onSubmit={onSubmit} />;
};

export default NewReview;
