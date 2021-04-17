import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import database from './database/config';

import Message from './components/Message'
import Formulaire from './components/Formulaire';
import './App.css';
import './animations.css'

const App = ({ match }) => {
  const [messages, setMessages] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const messagesRef = useRef('');
  const pseudo = match.params.id;

  const isUser = id => id === pseudo;

  const addMessage = message => {
    let updateMessage = {...messages, [`message-${Date.now()}`]: message };
    Object.keys(updateMessage).slice(0, -5).forEach(key => {
      delete updateMessage[key]
      database.ref('/message').child(key).remove()
    });
    setMessages(updateMessage);
  }

  const renderMessages = Object.keys(messages).map(key => {
    return(
      <CSSTransition 
        in={messages}
        timeout={300}
        classNames='fade'
        mountOnEnter
        unmountOnExit
        key={key}
      >
        <Message
          pseudo={messages[key].pseudo}
          message={messages[key].message}
          isUser={isUser}
        />
      </CSSTransition>
    )
  })

  const autoScrollMessages = () => {
    const ref = messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }

  useEffect(() => {
    if(isLoad) {
      database.ref('/message').update(messages)
        .catch(error => {
          console.error(error)
        });
      autoScrollMessages();
    } else {
      database.ref('/message').get()
        .then(snapshot => {
          if(snapshot.exists()){
            setMessages(snapshot.val());
            
            setIsLoad(true);
          } else {
            console.log('Pas de messages');
            setIsLoad(true);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [messages, isLoad]);

  return (
    <div className="box">
      <div className="messages" ref={messagesRef}>
        <TransitionGroup className="message">
            {renderMessages}
        </TransitionGroup>
      </div>
      <Formulaire 
        addMessage={addMessage} 
        pseudo={pseudo}
        length={140}
      />
    </div>
  );
}

export default App;
