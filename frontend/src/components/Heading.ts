import styled from "styled-components/native";
import { Strong } from ".";

const Heading = styled(Strong)`
  font-size: 28;
  font-weight: 800;
  color: ${props => props.theme.colors.black};
  text-transform: capitalize;
`;

export default Heading;
