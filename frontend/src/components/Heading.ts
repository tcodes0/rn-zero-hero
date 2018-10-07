import styled from "styled-components/native";
import { Strong } from ".";

const Heading = styled(Strong)`
  font-size: 28;
  color: ${props => props.theme.complement[1]};
  text-transform: capitalize;
`;

export default Heading;
