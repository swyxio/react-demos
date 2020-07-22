import React, { Component, CSSProperties } from 'react'
class MessagesList extends Component<{
  style: CSSProperties
  messages: Message[]
}> {
  render() {
    const styles: Record<string, CSSProperties> = {
      container: {
        overflowY: 'scroll',
        flex: 1,
      },
      ul: {
        listStyle: 'none',
      },
      li: {
        marginTop: 13,
        marginBottom: 13,
      },
      senderUsername: {
        fontWeight: 'bold',
      },
      message: { fontSize: 15 },
    }
    return (
      <div
        style={{
          ...this.props.style,
          ...styles.container,
        }}
      >
        <ul style={styles.ul}>
          {this.props.messages.map((message, index) => (
            <li key={index} style={styles.li}>
              <div>
                <span style={styles.senderUsername}>{message.user.name}</span>{' '}
              </div>
              <p style={styles.message}>{message.text}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default MessagesList
