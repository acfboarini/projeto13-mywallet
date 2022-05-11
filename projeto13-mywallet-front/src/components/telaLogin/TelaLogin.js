import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

import Logo from "../Logo";
import "./telaLogin.css";

export default function TelaLogin() {

    window.localStorage.clear();
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    function enviarLogin(e) {
        e.preventDefault();
        const new_login = {
            email,
            senha
        }
        axios.post("http://localhost:5000/login", new_login)
        .then(response => {
            console.log(response);
            window.localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/home");
        })
        .catch(err => {
            alert("Erro ao fazer Login");
            console.log(err);
        })
    }

    return (
        <Main>
            <Logo/>
            <form>
                <input type="email" placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input type="password" placeholder="Senha" 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)}
                    required
                />
                <button type="submit" onClick={enviarLogin}>Entrar</button>
            </form>
            <StyledLink to="/cadastro">Primeira vez? Cadastre-se!</StyledLink>
        </Main>
    )
}

const Main = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    color: #FFFFFF;
    margin-top: 35px;
`;