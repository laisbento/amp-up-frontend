import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelopeOpenText } from 'react-icons/fa';

import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.png';
import guyImg from '../../assets/guy.png'

export default function Ads() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        api.get('ads').then(response => {
            setAds(response.data)
        });
    });

    return (
        <div className="ads-container">
            <header>
                <img src={logoImg} alt="AmpUp" />

                <Link className="button" to="/logon">
                    Logon
                </Link>
            </header>

            <div className="last-ads-container">
                <img src={guyImg} alt="Everyone" />
                <h1>Últimos anúncios</h1>
            </div>
            <ul>
                {ads.map(ad => (
                    <li key={ad.id}>
                        <strong>TÍTULO:</strong>
                        <p>{ad.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{ad.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ad.value)}</p>

                        <strong>LOCALIZAÇÃO:</strong>
                        <p>{ad.bairro + ' - ' + ad.city + ', ' + ad.uf}</p>

                        <button type="button" onClick={() => window.open('https://api.whatsapp.com/send?phone=+55' + ad.whatsapp +
                            '+&text=Oi, ' + ad.name + '! Tudo bem? Te vi no AmpUp! Estou interessado/a em '
                            + ad.title + '. Podemos conversar?')}>
                            <FaWhatsapp size={30} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}