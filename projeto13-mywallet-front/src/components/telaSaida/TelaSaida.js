import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function TelaSaida() {

    const navigate = useNavigate();

    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");

    const userJSON = window.localStorage.getItem("user");
    const {token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    function enviarSaida(e) {
        e.preventDefault();
        const new_saida = {
            valor: parseFloat(valor).toFixed(2),
            type: "saida",
            descricao
        }
        const promise = axios.post("http://localhost:5000/transation", new_saida, config);
        promise.then(response => {
            alert("Saida registrada com Sucesso");
            navigate("/home");
        })
        promise.catch(err => alert("Erro ao registrar Saida"));
    }

    return (
        <Main>
            <H1>Nova Saida</H1>
            <form>
                <input type="number" placeholder="Valor" 
                    value={valor} 
                    onChange={e => setValor(e.target.value)}
                    required
                />
                <input type="text" placeholder="Descrição" 
                    value={descricao} 
                    onChange={e => setDescricao(e.target.value)}
                    required
                />
                <button type="submit" onClick={enviarSaida}>Salvar Saida</button>
            </form>
            <StyledLink to="/home">Cancelar</StyledLink>
        </Main>
    )
}

const Main = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const H1 = styled.h1`
    width: 326px;
    margin-top: 25px;
    margin-bottom: 35px;
    font-weight: 700;
    font-size: 26px;
    color: #FFFFFF;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    color: #FFFFFF;
    margin-top: 35px;
`;