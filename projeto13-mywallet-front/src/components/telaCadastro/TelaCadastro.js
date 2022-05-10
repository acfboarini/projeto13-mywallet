import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

import Logo from "../Logo";

export default function TelaCadastro() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [checkSenha, setCheckSenha] = useState("");

    const navigate = useNavigate();

    function enviarCadastro(e) {
        e.preventDefault();
        if (senha !== checkSenha) {
            alert("Os campos senha e confirmar senha devem ser iguais");
        } else {
            const new_cadastro = {
                name,
                email,
                senha,
                checkSenha
            }
            axios.post("http://localhost:5000/cadastro", new_cadastro)
            .then(() => {
                alert("Cadastrado com sucesso!");
                navigate("/");
            })
            .catch(err => {
                alert("Erro ao cadastrar usuario!");
                console.log(err);
            })
        }
    }

    return (
        <Main>
            <Logo/>
            <form>
                <input type="text" placeholder="Nome" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    required
                />
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
                <input type="password" placeholder="Confirme a Senha" 
                    value={checkSenha} 
                    onChange={e => setCheckSenha(e.target.value)}
                    required
                />
                <button type="submit" onClick={enviarCadastro}>Cadastrar</button>
            </form>
            <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
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