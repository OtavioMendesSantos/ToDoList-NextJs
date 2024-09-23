import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
    const [userName, setUserName] = React.useState("")

    React.useEffect(() => {
        const configJson = localStorage.getItem("config")
        const config = JSON.parse(configJson ?? "{}")
        setUserName(config?.nome ?? "")
    }, [])

    const getDay = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }
        const date = new Date();
        const extenseDate = Intl.DateTimeFormat('pt-BR', options).format(date)
        return extenseDate
    }

    return (
        <header className={styles.header}>
            <div>
                <img src='/logo.png' alt="Logo" />
            </div>
            <h1>Bem-vindo de volta, {userName} </h1>
            <p>{getDay()}</p>
        </header>
    )
}

export default Header