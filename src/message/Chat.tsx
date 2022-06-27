
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const ChatPage = ()=>{
    const [socket, setSocket] = useState<Socket|null>(null);
    const [messageList, setMessageList] = useState<Array<any>>([]);
    const [join,setJoin] = useState(false);
    const currentUser = useRef<HTMLInputElement|null>(null);
    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [typing, setTyping] = useState('');
    //  const options = {
    //     transportOptions: {
    //         polling: {
    //             extraHeaders: {
    //                 'set-cookie': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoYW5oeHVhbjIiLCJpZCI6ImVhZTJiYzk5LTkyNjMtNDZhNS1hNmM1LTA1NDM3ODYyYTZmYyIsImlhdCI6MTY1NTc3MDQ0NCwiZXhwIjoxNjU1ODU2ODQ0fQ.cTtoXIUgoFwQ4Pu-Q4TiFshhr0TKVSM3RNdgVl5LoqY'
    //             }
    //         }
    //     }
    // }
    useEffect(()=>{
        const newSocket = io(`http://localhost:5001/chat`, {withCredentials:true});
        setSocket(newSocket); 
        console.log('render');     
        newSocket.emit('findAllMessages',{},(response:any)=>{
            setMessageList([...response])
        })
        console.log('re')
        return ()=>{
            newSocket.disconnect()
        };
    },[])
    socket?.on('typing',(username, isTyping)=>{
        if(isTyping)
            setTyping(`${username} is typing...`);
        else
            setTyping('');
    })
    socket?.once('message',(mess)=>{
        console.log(mess);
        setMessageList([...messageList, {...mess}])
    })
    const handleJoin = ()=>{
        const name = currentUser.current?.value;
        
        socket?.emit('join',{name},()=>{
            setJoin(true);
        } )
    }
    const sendMessage = ()=>{
        socket?.emit("createMessage", {text},(res:any)=>{
            setText('');
            setMessageList([...messageList, res]);
        })
    }
    let timeout;
    const emitTyping = ()=>{
        socket?.emit('typing',{isTyping: true})
        timeout = setTimeout(()=>{
            socket?.emit('typing',{isTyping: false})
        }, 2000)
    }
    
    const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        emitTyping()
        setText(e.target.value);
    }

    return (<div>
        {join?
        <div>
        {messageList&&messageList.map((m:{text: string,  username: string},i)=>(<li key={i}><b>{m.username}: </b>{m.text}</li>))}
        <input onChange={handleOnChange} value={text}/>
        <button onClick={sendMessage}>Send</button>
        {isTyping&&<div>{typing}</div>}
        </div>:
        <div>
        <input ref={currentUser}/>
        <button onClick={handleJoin}>Join</button>
        </div>}
    </div>)
}

export default ChatPage;