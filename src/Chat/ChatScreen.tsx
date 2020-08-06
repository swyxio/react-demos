import React, { Component, CSSProperties } from 'react'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import TypingIndicator from './TypingIndicator'
import WhosOnlineList from './WhosOnlineList'
import { User, Message } from 'types'

type Props = {
  // userIsTypingIn(roomId: string): Promise<void>;
  sendMessage(text: string): Promise<void>
  logOut(id: string): Promise<void>
  usersOnline: User[]
  currentUser: User
  messages: Message[]
  usersWhoAreTyping?: string[]
}

class ChatScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
    // this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }
  // sendTypingEvent() {
  //   if (!this.state.currentUser) return;
  //   this.props
  //     .userIsTypingIn(this.state.currentRoom.id)
  //     .catch(error => console.error('error', error));
  // }

  sendMessage(text: string) {
    this.props.sendMessage(text)
  }

  componentDidMount() {
    // connect to backend
    // set currentuser
    // load messages
    // onuserstatrtedtyping
    // onuser stoppedtyping
    // onpresencechange
    // onuserjoined
    // set currentroom
  }
  render() {
    const styles: Record<string, CSSProperties> = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '15%',
        padding: 20,
        backgroundColor: '#1a202c',
        color: 'white',
      },
      chatListContainer: {
        // padding: 20,
        boxSizing: 'border-box',
        backgroundColor: '#2d3748',
        width: '85%',
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      },
    }

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <WhosOnlineList
              currentUser={this.props.currentUser}
              logOut={this.props.logOut}
              users={this.props.usersOnline}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <div style={{ position: 'relative', height: '100vh' }}>
              <MessageList
                messages={this.props.messages}
                style={styles.chatList}
              ></MessageList>
              {this.props.usersWhoAreTyping && (
                <TypingIndicator
                  usersWhoAreTyping={this.props.usersWhoAreTyping}
                />
              )}
              <SendMessageForm
                onSubmit={this.sendMessage}
                // onChange={this.sendTypingEvent}
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default ChatScreen
