import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Transacoes from "./Transacoes";
import "./telaHome.css";

export default function TelaHome() {

    const userJSON = window.localStorage.getItem("user");
    const {name, token} = JSON.parse(userJSON);
    
    const navigate = useNavigate();

    const [transacoes, setTransacoes]= useState([]);
    const [reload, setReload] = useState(true);

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    if (reload) {
        const promise = axios.get("http://localhost:5000/transations", config);
        promise.then(response => {
            setReload(false);
            setTransacoes(response.data);
        })
        promise.catch(err => {
            console.log("Erro ao buscar transacoes");
        })
    }

    function logout() {
        window.localStorage.clear();
        navigate("/");
        const promise = axios.delete("http://localhost:5000/logout", config)
        promise.then(response => console.log(response))
        promise.catch(err => console.log(err));
    }

    return (
        <Main className="telaHome">
            <section className="topo">
                <h1>Ola, {name}</h1>
                <button onClick={logout}><ion-icon name="log-out-outline"></ion-icon></button>
            </section>
            <section className="corpo">
                <Transacoes transacoes={transacoes}/>
            </section>
            <section className="botoes">
                <button onClick={() => navigate("/entrada")}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h2>Nova Entrada</h2>
                </button>
                <button onClick={() => navigate("/saida")}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h2>Nova Saída</h2>
                </button>
            </section>
        </Main>
    )
}

const Main = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
`;