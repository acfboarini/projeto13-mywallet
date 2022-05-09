import styled from "styled-components";

import Input from "./../Input";

export default function TelaLogin() {
    return (
        <Main>
            <Input/>
            <Input/>
            <Input/>
            <Input/>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: auto auto;
`;