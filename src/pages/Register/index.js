import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bairro, setBairro] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            bairro,
            city,
            uf
        };

        try {
            const response = await api.post('users', data);
            alert(`Seu ID é: ${response.data.id}`);
            history.push('/');
        } catch(err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro e aproveite a simplicidade de anunciar seu imóvel.</p>

                    <Link className="back-link" to="/logon">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <input
                        placeholder="Bairro"
                        value={bairro}
                        onChange={e => setBairro(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}