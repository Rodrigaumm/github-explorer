import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, OpenIssues } from './styles';
import api from '../../services/api';

interface RouteParams {
    repo: string;
}

interface Repository {
    full_name: string;
    owner: {
        avatar_url: string;
        login: string;
    };
    description: string | null;
    forks: number;
    open_issues: number;
    stargazers_count: number;
}

interface Issue {
    id: number;
    title: string;
    user: {
        login: string;
    };
    html_url: string;
}

const Repository: React.FC = () => {
    const { repo } = useParams<RouteParams>();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        api.get(`repos/${repo}`).then((response) =>
            setRepository(response.data),
        );
        api.get(`repos/${repo}/issues`).then((response) => {
            setIssues(response.data);
        });
    }, [repo]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="GitHub Explorer logo" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    <span>Voltar</span>
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <span>{repository.description}</span>
                        </div>
                    </header>

                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <OpenIssues>
                {issues.map((issue) => (
                    <a
                        key={issue.id}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={issue.html_url}
                    >
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>
                        <FiChevronRight size={25} />
                    </a>
                ))}
            </OpenIssues>
        </>
    );
};

export default Repository;
