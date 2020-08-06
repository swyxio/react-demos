import React, { useRef, useEffect, Component, CSSProperties } from 'react'
import { Message } from 'types'

function ChatScroller(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldScrollRef = useRef(true)
  useEffect(() => {
    const node = ref.current
    if (node && shouldScrollRef.current) {
      node.scrollTop = node.scrollHeight
    }
  })
  const handleScroll = () => {
    const node = ref.current
    if (node) {
      const { scrollTop, clientHeight, scrollHeight } = node
      const atBottom = scrollHeight === clientHeight + scrollTop
      shouldScrollRef.current = atBottom
    }
  }
  return <div {...props} ref={ref} onScroll={handleScroll} />
}
class MessagesList extends Component<{
  style: CSSProperties
  messages: Message[]
  children?: React.ReactNode
}> {
  render() {
    const styles: Record<string, CSSProperties> = {
      container: {
        overflowY: 'auto',
        padding: '1rem',
        // flex: 1,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
      },
      li: {
        marginTop: 13,
        marginBottom: 13,
      },
      senderUsername: {
        fontWeight: 'bold',
        color: '#2b6cb0',
      },
      message: { fontSize: 15, color: 'white', marginTop: '0' },
    }
    return (
      <div
        style={{
          // height: '100%',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'flex-end',

          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
          paddingBottom: '4rem',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <ChatScroller
          style={{
            ...this.props.style,
            ...styles.container,
          }}
        >
          {this.props.messages.map((message, index) => (
            <div key={index} style={styles.li}>
              <div>
                <span style={styles.senderUsername}>{message.user.name}</span>{' '}
              </div>
              <p style={styles.message}>{message.text}</p>
            </div>
          ))}
          {this.props.children}
        </ChatScroller>
      </div>
    )
  }
}

export default MessagesList
