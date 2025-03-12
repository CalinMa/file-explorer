import React from 'react';
import './Breadcrumbs.css'
interface BreadcrumbsProps {
    currentPath: string[];
    onNavigate: (path: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPath, onNavigate }) => {
    const current = '';

    return (
        <div className={'breadcrumbs'}>
            {currentPath.map((part, index) => {
                const displayPart = part === '.' ? './' : part;
                const path = current + part;

                return (
                    <span key={index}>
                        <button onClick={() => onNavigate(index === 0 ? './' : path)}>
                            {displayPart}
                        </button>
                        {index < currentPath.length - 1 && <span>/</span>}
                    </span>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;