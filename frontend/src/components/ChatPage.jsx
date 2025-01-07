import React from 'react'
import { useRef ,useEffect} from 'react'
import NewPropt from './NewPropt';
import './ChatPage.css'
function ChatPage() {
    
  return (
    <div className='chatPage'>
    <div className='wrapper'>
     <div className='chat'>
        <div className='message'>Hello Guys</div>
        <div className='message user'>Test Message from ai </div>
        <div className='message'>Hello Guys</div>
        <div className='message user'>Test Message from ai</div>
        <div className='message'>Hello Guys</div>
        <div className='message user'>Test Message from ai</div>
        <div className='message'>Hello Guys</div>
        <div className='message user'>Test Message from ai</div>
        <div className='message'>Hello Guys</div>
        <div className='message user'>In this case, the prompt ("Explain how AI works") doesn't include any output examples, system instructions, or formatting information. It's a zero-shot approach. For some use cases, a one-shot or few-shot prompt might produce output that's more aligned with user expectations. In some cases, you might also want to provide system instructions to help the model understand the task or follow specific guidelines.</div>
        <NewPropt/>
     </div>
    </div>
    </div>
  )
}

export default ChatPage