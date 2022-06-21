import { StyledTextInput } from "./text-input.styles";

const TextInput = ({ children, ...otherProps }) => {
  return (
    <StyledTextInput type="text" {...otherProps}>
      {children}
    </StyledTextInput>
  );
};

export default TextInput;
