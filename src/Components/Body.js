import React from 'react';
import { useNavigate } from 'react-router-dom';

import './body.css';

const Body = () => {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate('/chat');
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title">
              By Using Chat-x, you accept the terms at the bottom. You must be 18+, or 13+ With parental Permission
            </h5>
            <button className="cta" onClick={goToChat}>
              <span>Start Chat</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
            <p className="card-text">Meet Strangers With Your Interests!</p>
            <p className="card-text">
              Chat-X is a fun platform that connects you with random people for one-on-one conversations. The best part is that the chats are anonymous, so you don’t need to reveal any personal information unless you choose to (which isn’t recommended for your safety!). You can stop the chat at any time if you feel uncomfortable or just want to move on. ...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
