import styled from "styled-components";

export default function Input() {
    return (
        <Input2 type="text" placeholder="email"/>
    )
}

const Input2 = styled.input`
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 4px;
    font-size: 20px;
`;