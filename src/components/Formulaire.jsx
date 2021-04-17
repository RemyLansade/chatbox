import { useState, useRef } from 'react'

const Formulaire = ({ addMessage, pseudo, length }) => {
  const [message, setMessage] = useState('');
  const textarea = useRef('');

  const handleChange = () => {
    setMessage(textarea.current.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    addMessage({
      pseudo,
      message: message
    });
    setMessage('');
  }

  const handleKeyUp = e => {
    if(e.key === 'Enter'){
      addMessage({
        pseudo,
        message: message
      });
      setMessage('');
    }
  }

  return(
    <form className='form' onSubmit={handleSubmit}>
      <textarea 
        ref={textarea} 
        value={message} 
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        maxLength={length}
        required 
      />
      <div className='info'>{length - message.length}</div>
      <button type='submit'>Envoyer</button>
    </form>
  );
}

export default Formulaire