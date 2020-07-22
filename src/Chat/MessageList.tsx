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
      <ChatScroller
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
      </ChatScroller>
    )
  }
}

export default MessagesList
