import styled from "styled-components/native";
import { Strong } from ".";

const Heading = styled(Strong)`
  font-family: Spectral;
  font-size: 28;
  color: ${props => props.theme.colors.text};
  text-transform: capitalize;
`;

export default Heading;
