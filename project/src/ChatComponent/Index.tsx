import React from 'react';
import { styled } from '@mui/system';
import ChatBubble from './ChatBubble';
import { messages } from '../data/dummyData';

const ChatContainer = () => {
    return (
        <ChatContainerStyled>
            {messages.map(message => (<ChatBubble message={message} key={message.id} />))}
        </ChatContainerStyled>
    );
};

const ChatContainerStyled = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    backgroundColor: 'rgb(245, 245, 245)',
    minWidth: 400,
    minHeight: 600,
    padding: 16,
    boxShadow: '3px 3px 3px rgba(0,0,0,0.2)',
    overflow: 'visible'
});

export default ChatContainer;
