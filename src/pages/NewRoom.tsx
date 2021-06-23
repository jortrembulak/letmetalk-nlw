import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImf from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    //Reference - Referencia para um registro no Banco de Dados (uma linha no bd)
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img
          src={illustrationImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImf} alt='Letmeask' />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Digite o nome da sala'
              value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to='/'>Clique aqui!</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
