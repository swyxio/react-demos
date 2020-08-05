// heavily adapted from https://github.com/pusher/build-a-slack-clone-with-react-and-pusher-chatkit

import React from 'react'
import UsernameForm from './Chat/UsernameForm'
import ChatScreen from './Chat/ChatScreen'
import { User, Message } from 'types'

export type ChatProps = {
  currentUser: User | null
  messages: Message[]
  usersOnline: User[]
  /** set currentUser and add them to usersOnline */
  loginUser: (name: string) => Promise<void>
  /** (optional) unset currentUser and remove from usersOnline */
  logoutUser?: (id: string) => Promise<void>
  /** add to messages by also adding the currentUser */
  sendMessage: (text: string) => Promise<void>
}

export function useChatLocalState(): ChatProps {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [usersOnline, setUsersOnline] = React.useState<User[]>([])
  async function loginUser(name: string) {
    const newuser = {
      id: uuid(),
      name,
      isOnline: true,
    }
    setCurrentUser(newuser)
    setUsersOnline([...usersOnline, newuser])
  }
  async function logoutUser(id: string) {
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
    loginUser,
    logoutUser,
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
    loginUser,
    logoutUser,
  } = props

  // React.useEffect(() => {
  //   function updateOnlineStatus(event: Event) {
  //     if (navigator.onLine) loginUser()
  //   }

  //   window.addEventListener('online',  updateOnlineStatus);
  //   window.addEventListener('offline', updateOnlineStatus);
  // })
  // const [state, setState] = React.useState(localStorage.getItem('REACT_DEMOS') || '')
  if (!currentUser) {
    return <UsernameForm onSubmit={loginUser} />
  }

  return (
    <ChatScreen
      {...{
        logOut: logoutUser || noop,
        sendMessage,
        usersOnline,
        currentUser,
        messages,
      }}
    />
  )
}

async function noop(e: any) {
  // no op
  console.log(e)
}

// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
function uuid() {
  var dt = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    // eslint-disable-next-line
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
