import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaHome } from 'react-icons/fa';

import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.png';

export default function Ads() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        api.get('ads').then(response => {
            setAds(response.data)
        });
    }, []);

    return (
        <div className="ads-container">
            <header>
                <img src={logoImg} alt="AmpUp" />

                <Link className="button" to="/logon">
                    Login
                </Link>
            </header>

            <div className="last-ads-container">
                <FaHome size={90} />
                <h1>Imóveis anunciados</h1>
            </div>
            <ul>
                {ads.map(ad => (
                    <li key={ad.id}>
                        <strong>TÍTULO:</strong>
                        <p>{ad.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{ad.description}</p>

                        <strong>TIPO:</strong>
                        <p>{ad.tipoNegocio}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ad.value)}</p>

                        <strong>LOCALIZAÇÃO:</strong>
                        <p>{ad.bairro + ' - ' + ad.city + ', ' + ad.uf}</p>

                        <button type="button" onClick={() => window.open('https://api.whatsapp.com/send?phone=+55' + ad.whatsapp +
                            '+&text=Oi, ' + ad.name + '! Tudo bem? Te vi no AmpUp! Estou interessado/a no seu imóvel '
                            + ad.title + '. Podemos conversar?')}>
                            <FaWhatsapp size={30} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}