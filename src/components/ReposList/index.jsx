import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        setEstaCarregando(true);
        setDeuErro(false);

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error('Nome de usuário não encontrado');
                    } else {
                        throw new Error('Erro ao carregar dados do GitHub');
                    }
                }
                return res.json();
            })
            .then(resJson => {
                setTimeout(() => {
                    setEstaCarregando(false);
                    setRepos(resJson);
                }, 3000);
            })
            .catch(e => {
                console.error(e);
                setEstaCarregando(false); 
                setDeuErro(true);
            });
    }, [nomeUsuario]);

    let content;
    if (estaCarregando) {
        content = <h1>Carregando...</h1>;
    } else if (deuErro) {
        content = <h1>Nome de usuário não encontrado.</h1>;
    } else {
        content = (
            <ul className={styles.list}>
                {repos.map(({ id, name, language, html_url }) => (
                    <li className={styles.listItem} key={id}>
                        <div className={styles.itemName}>
                            <b>Nome:</b>
                            {name}
                        </div>
                        <div className={styles.itemLanguage}>
                            <b>Linguagem:</b>
                            {language}
                        </div>
                        <a className={styles.itemLink} target="_blank" href={html_url}>Visitar no GitHub</a>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="container">
            {content}
        </div>
    );
};

ReposList.propTypes = {
    nomeUsuario: PropTypes.string.isRequired
};

export default ReposList;