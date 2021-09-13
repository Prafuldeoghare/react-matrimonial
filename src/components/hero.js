import React from 'react'
import Login from './login'
import './hero.css'
function Hero() {
    return (
        <section>
            <div className='hero'>
                <div className='hero-container'>
                    <div className='hero-container-left'>
                        <div className='container-left'>
                            <span>Find Soulmate</span>
                            <span>Connecting a soul not just arranging a marriage</span>
                            <p>Marriages are exceptional. It would drain you, overwhelm you and would take you on verge of giving up. But then again marriage is one of the finest feelings on Earth. There is nothing like having someone you cannot imagine your life without</p>
                        </div>
                    </div>
                    <div className='hero-container-right'>
                        <Login />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
