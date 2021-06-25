import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { useRoom } from '../hooks/useRoom';

import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswared(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Sala - {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                likeCount={question.likeCount}
                likeId={question.likeId}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type='button'
                      onClick={() => {
                        handleHighLightQuestion(question.id);
                      }}
                    >
                      <img src={checkImg} alt='Dar destaque a pergunta' />
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        handleCheckQuestionAsAnswared(question.id);
                      }}
                    >
                      <img src={answerImg} alt='Responder a Pergunta' />
                    </button>
                  </>
                )}
                <button
                  type='button'
                  onClick={() => {
                    handleDeleteQuestion(question.id);
                  }}
                >
                  <img src={deleteImg} alt='Remove Question' />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
