import Touchable from "./Touchable";
import styled from "styled-components/native";

const Button = styled(Touchable)`
  margin: 8px;
  background-color: ${props => props.theme.colors.main};
`;

export default Button;
