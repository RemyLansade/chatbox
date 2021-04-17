import { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

const Connection = () => {
  const [pseudo, setPseudo] = useState('');
  const [goToChat, setGoToChat] = useState(false);
  const input = useRef('');

  const handleChange = () => {
    setPseudo(input.current.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setGoToChat(true);
  }

  if(goToChat) {
    return <Redirect push to={`/pseudo/${pseudo}`} />
  }

  return(
    <div className="connexionBox">
      <form className="connexion" onSubmit={handleSubmit}>
        <input
          ref={input}
          onChange={handleChange}
          value={pseudo}
          type="text"
          placeholder="Pseudo"
          required
        />
        <button type="submit">GO</button>
      </form>
    </div>
  );
}

export default Connection
