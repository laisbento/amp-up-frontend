import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.png';

export default function Profile() {
    const [ads, setAds] = useState([]);
    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setAds(response.data)
        });
    }, [userId]);

    async function handleDeleteAds(id) {
        try {
            await api.delete(`ads/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });

            setAds(ads.filter(ad => ad.id !== id));
        } catch (err) {
            alert('Erro ao deletar anúncio, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="AmpUp" />
                <span>Bem vindo(a), {userName}</span>

                <Link className="button" to="/ads/new">
                    Cadastrar novo anúncio
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#4e4e4e" />
                </button>
            </header>

            <h1>Imóveis Cadastrados</h1>
            <ul>
                {ads.map(ad => (
                    <li key={ad.id}>
                        <strong>TÍTULO:</strong>
                        <p>{ad.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{ad.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ad.value)}</p>
                        <button type="button" onClick={() => handleDeleteAds(ad.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}