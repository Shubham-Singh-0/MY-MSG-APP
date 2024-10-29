import React from 'react'
import './Chat.css';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const navigate = useNavigate();
  return (
   <>
   <div className="d-flex justify-content-center" >
                <div className="card"  >
                    <div className="card-body text-center">
                        <h5 className="card-title">You don't need an app to use Chat-X on your phone or Tablet! The web site works great on mobile</h5>
                        
                        <p className="card-text chat1" >Meet Strangers With Your Interests!</p>
                        <p className="card-text chat2" >
                            Chat-X is great way to meet new friends even while practicing social distancing. When you use Chat-X , we pick someone else at random and let you talk one-on-one .To help you stay safe , chats are anonymous unless you tell someone who you are (not suggestes!) and you can stopa chat at any time .predators have been known to use chat-X , so please be careful.
                        </p>

                        <p className="card-text chat3">
                            if you prefer , you can add you interest and Chat-X will look for  someone whos into some of the same thing as you instead of someone completely random.

                        </p>

                        <p className='card-text chat4'> BY using Chat-X , you accept the terms at the bottom. you must be 18+, or 13+ With parental Permission.</p>


                        <p className='card-text chat5'>
                            video is monitored .keep it clean !
                            18+ : 
                        </p>


                          <p className='card-text chat6'>
                            Start Chatting:
                          </p>


                            <button className="cta" onClick={() => navigate('/text')}>
                                <span>Text</span>
                                <svg width="15px" height="10px" viewBox="0 0 13 10">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                          
                            <button className="cta" onClick={() => navigate('/video')}>
                                <span>Video</span>
                                <svg width="15px" height="10px" viewBox="0 0 13 10">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>

                        
                    </div>
                </div>
            </div>


   </>
  )
}

export default Chat