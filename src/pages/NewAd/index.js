import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.png';

export default function NewAd() {
    const [title, setTile] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [tipoNegocio, setTipoNegocio] = useState('Aluguel');

    const history = useHistory();

    const userId = localStorage.getItem('userId');

    async function handleNewAd(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
            tipoNegocio
        };

        try {
            await api.post('ads', data, {
                headers: {
                    Authorization: userId,
                }
            });
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar novo anúncio, tente novamente.');
        }
    }


    return (
        <div className="new-ad-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Amp Up" />

                    <h1>Cadastrar novo anúncio</h1>

                    <p>Descreva o imóvel detalhadamente para encontrar um comprador ou inquilino o mais rápido possível!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleNewAd}>
                    <input
                        placeholder="Título do anúncio"
                        value={title}
                        onChange={e => setTile(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição do imóvel"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <select
                        value={tipoNegocio}
                        onChange={e => setTipoNegocio(e.target.value)}
                    >
                        <option value="Aluguel">Aluguel</option>
                        <option value="Venda">Venda</option>
                    </select>
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Anunciar</button>
                </form>
            </div>
        </div>
    )
}