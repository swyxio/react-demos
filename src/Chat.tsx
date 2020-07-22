// heavily adapted from https://github.com/pusher/build-a-slack-clone-with-react-and-pusher-chatkit

import React from 'react'
import UsernameForm from './Chat/UsernameForm'
import ChatScreen from './Chat/ChatScreen'

export type ChatProps = {
  currentUser: User | null
  usersOnline: User[]
  messages: Message[]
  /** set currentUser and add them to usersOnline */
  onUserLoggedIn: (name: string) => Promise<void>
  /** (optional) unset currentUser and remove from usersOnline */
  onUserLoggedOut: (id: string) => Promise<void>
  /** add to messages by also adding the currentUser */
  sendMessage: (text: string) => Promise<void>
}

let id = 0
export function useChatLocalState(): ChatProps {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [usersOnline, setUsersOnline] = React.useState<User[]>([])
  async function onUserLoggedIn(name: string) {
    const newuser = {
      id: '' + id++,
      name,
      isOnline: true,
    }
    setCurrentUser(newuser)
    setUsersOnline([...usersOnline, newuser])
  }
  async function onUserLoggedOut(id: string) {
    setCurrentUser(null)
    setUsersOnline(usersOnline.filter(user => user.id !== id))
  }
  const [messages, setMessages] = React.useState<Message[]>([])
  async function sendMessage(text: string) {
    if (currentUser) {
      setMessages([...messages, { user: currentUser, text }])
    } else {
      console.warn('no currentuser set')
    }
  }
  return {
    currentUser,
    onUserLoggedIn,
    onUserLoggedOut,
    sendMessage,
    usersOnline,
    messages,
  }
}

export function Chat(props: ChatProps) {
  const {
    sendMessage,
    usersOnline,
    currentUser,
    messages,
    onUserLoggedIn,
  } = props
  const [state, setState] = React.useState({
    currentUsername: '',
    currentScreen: 'WhatIsYourUsernameScreen',
  })
  function onUsernameSubmitted(username: string) {
    // server stuff
    setState({
      currentUsername: username,
      currentScreen: 'ChatScreen',
    })
    onUserLoggedIn(username)
  }

  if (state.currentScreen === 'WhatIsYourUsernameScreen') {
    return <UsernameForm onSubmit={onUsernameSubmitted} />
  }
  if (!currentUser) return <div> logging in...</div>

  return <ChatScreen {...{ sendMessage, usersOnline, currentUser, messages }} />
}
