import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaLogin from "./telaLogin/TelaLogin";
import TelaCadastro from "./telaCadastro/TelaCadastro";
import TelaHome from "./telaHome/TelaHome";
import TelaEntrada from "./telaEntrada/TelaEntrada";
import TelaSaida from "./telaSaida/TelaSaida";

import "./../styles/reset.css";
import "./../styles/style.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaLogin/>}></Route>
                <Route path="/cadastro" element={<TelaCadastro/>}></Route>
                <Route path="/home" element={<TelaHome/>}></Route>
                <Route path="/entrada" element={<TelaEntrada/>}></Route>
                <Route path="/saida" element={<TelaSaida/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}