import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './style';
import api from '../../services/api';

interface Repository {
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    description: string | null;
}

const Dashboard: React.FC = () => {
    const [repoInputValue, setRepoInputValue] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(
            '@GitHub-Explorer:repositories',
        );

        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            '@GitHub-Explorer:repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setInputError('');

        if (!repoInputValue) {
            setInputError(
                'Digite uma combinação do usuário do autor do repositório separados por "/".',
            );
            return;
        }

        const reposNames = repositories.map((repository) =>
            repository.full_name.toUpperCase(),
        );

        const repoAlreadyIncluded = reposNames.includes(
            repoInputValue.toUpperCase(),
        );

        if (repoAlreadyIncluded) {
            setRepoInputValue('');
            return;
        }

        try {
            const repository = await api.get<Repository>(
                `/repos/${repoInputValue}`,
            );
            setRepositories([...repositories, repository.data]);
        } catch (err) {
            setInputError(
                'Combinação inexistente de autor e repositório. Digite um valor válido no formato "autor/repo"',
            );
        } finally {
            setRepoInputValue('');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer logo" />
            <Title>Explore e salve repositórios do GitHub.</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    type="text"
                    placeholder="facebook/react"
                    value={repoInputValue}
                    onChange={(e) => {
                        setRepoInputValue(e.target.value);
                    }}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map((repository) => (
                    <Link
                        to={`/repositories/${repository.full_name}`}
                        key={repository.full_name}
                    >
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={25} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;
