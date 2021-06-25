import React, {useState, Fragment} from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, date } }) => {
  const [isHover, setHover] = useState(false);

  let isAdmin = false;

  if (user === 'admin') {
    isAdmin = true;
  }

  const handleHover = function () {
    setHover(!isHover);
  }

  return (
    <div className="messageContainer"
    onMouseEnter={handleHover}
    onMouseLeave={handleHover}
    >
      {isAdmin ? <Fragment></Fragment> : <p className="userName">{user}</p>}
      <div className="messageBox">
        {
          isAdmin
          ? <p className="messageText admin">{ReactEmoji.emojify(text)}</p>
          : <p className="messageText">{ReactEmoji.emojify(text)}</p>
        }
        {isHover ? <p className="timeText">{date}</p> : <Fragment></Fragment>}
      </div>
    </div>
  );
}

export default Message;