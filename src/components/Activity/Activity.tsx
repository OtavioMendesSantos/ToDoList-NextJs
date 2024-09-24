import { useState } from 'react';
import styles from './Activity.module.scss'
import { Item } from '@/app/page'
import Modal from '../Modal/Modal';

interface ActivityProps {
  item: Item
  onUpdateStatus: (id: string) => void;
  onRemove: (id: string) => void;
}

const Activity = ({ item, onUpdateStatus, onRemove }: ActivityProps) => {
  const [isChecked, setIsChecked] = useState(item.status === "done")
  const [modalOpen, setModalOpen] = useState(false)

  const handleAtt = () => {
    onUpdateStatus(item.id)
    setIsChecked(!isChecked)
  }

  const handleRemove = () => {
    onRemove(item.id)
  }

  return (
    <>
      <div className={`${styles.activity} ${isChecked && styles.done}`}>
        <input type="checkbox" id={item.id} checked={isChecked} onChange={handleAtt} />
        <label htmlFor={item.id}>{item.title}</label>
        <div className={styles.iconContainer} onClick={() => setModalOpen(true)}>
          <img src="/trash.svg" alt="Excluir Tarefa" />
        </div>
      </div>
      {modalOpen && (
        <Modal>
          <h1 className="title">Deletar tarefa</h1>
          <h1 className="text-secondary">Tem certeza que você deseja excluir esta tarefa?</h1>
          <div className='btn-container'>
            <button onClick={() => setModalOpen(false)}>Cancelar</button>
            <button className='btn-secondary' onClick={handleRemove}>Deletar</button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Activity
