import React from 'react'
import { FaUser } from "react-icons/fa";
import logo from '../images/logo_mao.png'

function Header() {
    return (
        <div className='bg-gradient-to-b from-cor2 to-cor4 h-16 flex items-center justify-between gap-5 pl-2 pr-2'>
            <img src={logo} className='size-16 ' alt="" />
            <nav className='text-cor9 font-semibold text-xl flex gap-10 '>
                <a href="/Register">Onde doar</a>
                <a href="#">Duvidas Frequentes</a>
                <a href="#">Requisitos</a>
            </nav>
            <FaUser color='white' className='size-12 h-10 w-10'/>
        </div>
    )
}

export default Header