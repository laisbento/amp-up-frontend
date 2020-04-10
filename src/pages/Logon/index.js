import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.png'
import everyoneImg from '../../assets/everyone.png'

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.name);
            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="logo">
                <img src={logoImg} alt="Amp Up" onClick={() => history.push('/')} />
            </section>
            <div className="form-container">
                <section className="form">
                    <form onSubmit={handleLogin}>
                        <h1>Faça seu logon</h1>

                        <input
                            placeholder="Seu ID"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        <button className="button" type="submit">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={20} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                    </form>
                </section>
                <img src={everyoneImg} alt="Everyone" />
            </div>
        </div>

    );
}