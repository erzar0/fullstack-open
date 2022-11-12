import { TextInput as NativeTextInput } from "react-native";
// StyleSheet
// const styles = StyleSheet.create({});
// error,
const TextInput = ({ style, ...props }) => {
  const textInputStyle = style;

  return <NativeTextInput style={textInputStyle} {...props}></NativeTextInput>;
};

export default TextInput;
