import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


import './Chat.css';

let socket;	// socket을 담을 빈 변수 선언
// const ENDPOINT = 'localhost:5000';
const ENDPOINT = 'https://chat-webfront-app.herokuapp.com/';

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		// url에서 name과 room을 가져옴
		const { name, room } =	queryString.parse(location.search);
		socket = io(ENDPOINT); // server에서 io.on connection 이벤트 발생

		setName(name);
		setRoom(room);

		// join event : name과 room 전달
		socket.emit('join', { name, room }, () => {
		});

		// 더 이상 컴포넌트를 갱신할 필요 없을 때 return 실행 -> 사용자가 떠났으므로 disconnect / off
		return () => {
			socket.emit('disconnect');
			socket.off();
		}
	}, [ENDPOINT, location.search]) 

	useEffect(() => {
		socket.on('message', (message) => { // server에서 emit한 message 객체를 setMessage
			setMessages([...messages, message]);
		})
	}, [messages]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message) {
			socket.emit('sendMessage', message, () => setMessage('')); // server에 message 전송 후 callback 함수로 현재 메시지 비우는 것 보냄
		}
	}

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} room={room} />
			</div>
		</div>
	)
}

export default Chat;