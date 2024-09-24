import React from 'react'
import Modal from '../Modal/Modal'
// import styles from './ModalNewActivity.module.scss'
import { Item } from '@/app/page';

interface ModalNewActivityProps {
    onClose: () => void
    onAddItem: (item: string) => void
}

const ModalNewActivity = ({ onClose, onAddItem }: ModalNewActivityProps) => {
    const [activity, setActivity] = React.useState("")

    const addItem = () => {
        onAddItem(activity)
        setActivity("")
        onClose()
    }

    return (
        <Modal onClose={onClose}>
            <h1 className='title'>Nova Tarefa</h1>
            <p>Título</p>
            <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
            <div className={'btn-container'}>
                <button onClick={onClose}>Cancelar</button>
                <button
                    className={'btn-primary'}
                    onClick={() => addItem()}
                    disabled={!activity}
                >
                    Adicionar
                </button>
            </div>
        </Modal>
    )
}

export default ModalNewActivity