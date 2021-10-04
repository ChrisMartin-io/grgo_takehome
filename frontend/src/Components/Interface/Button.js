import styled from "styled-components";

const Button = styled.button`
background-color: ${(props) => props.color};
color: white;
padding: 5px 15px;
border-radius: 5px;
outline: 0;
text-transform: uppercase;
margin: 10px 0px;
cursor: pointer;
box-shadow: 0px 2px 2px lightgray;
align-self: start;
transition: ease background-color 250ms;
&:disabled {
  cursor: default;
  opacity: 0.7;
}
`;

export default Button