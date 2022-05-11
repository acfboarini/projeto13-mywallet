import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

export default function Transacoes({transacoes}) {

    const userJSON = window.localStorage.getItem("user");
    const {token} = JSON.parse(userJSON);
    const [saldo, setSaldo] = useState(null);
    const [reload, setReload] = useState(true);

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    if (reload) {
        const promise = axios.get("http://localhost:5000/saldo", config);
        promise.then(response => {
            setReload(false);
            setSaldo(response.data.saldo);
        })
        promise.catch(err => console.log("Erro ao pegar o saldo"));
    }

    return (transacoes.length === 0?
        <div><p>Não há registros de entrada ou saída</p></div>:
        <> 
            <ul>
                {transacoes.map((transacao,index) => {
                    const {valor, date, type, descricao} = transacao;
                    return (
                        <Li key={index}>
                            <div>
                                <p>{date}</p>
                                <h3>{descricao}</h3>
                            </div>
                            <H2 type={type}>{valor}</H2>
                        </Li>
                    )
                })}
            </ul>
            <Article>
                <h1>SALDO</h1>
                <Span isNegative={saldo < 0}>{saldo}</Span>
            </Article>
        </>   
    )
}

const Li = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0px;

    div {
        display:flex;
        align-items: center;
        p {
            font-size: 16px;
            margin-right: 10px;
        }
    }
`;

const Article = styled.article`
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
        font-weight: 700;
        font-size: 17px;
        color: #000000;
    }
`;

const Span = styled.span`
    color: ${props => props.isNegative? "#C70000" : "#03AC00"}
`;

const H2 = styled.h2`
    color: ${props => props.type === "entrada"? "#03AC00" : "#C70000"}
`;