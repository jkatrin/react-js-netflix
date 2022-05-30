import React from "react";
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo"> 
                <a href="/">
                    <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Netflix"/>
                </a>
             </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://i.pinimg.com/originals/c0/8e/6c/c08e6c9595e03202a46a95f66578799f.png" alt="Usuário" />
                </a>
            </div>
        </header>
        
    );
}