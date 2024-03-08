import React from 'react'
import {motion} from 'framer-motion'
import './Sidebar.css'
import { Link } from "react-router-dom"
function Item({icon, name ,id , link, handleLogout}) {

    const subheading ={
        true:{
            opacity: 1
        },
        false:{
            opacity: 0,
            display: 'none'
        }
    }
    
    return (
    <Link to = {link} className='item'
    id = {id}
    onClick={handleLogout} 
    transition={{
        type:'none', duration: 0.1
    }}
    >
        <motion.div className='icon'>
            <i className={icon}></i>
        </motion.div>
        <motion.span
        variants={subheading}
        >
            {name}
        </motion.span>
    </Link>
)
}

export default Item