import React, { Component, ReactNode } from 'react'
import { User } from 'types'

function WhosOnlineList(props: {
  users: User[]
  currentUser: string
  logOut: (id: string) => void
}) {
  if (props.users) {
    return (
      <>
        <div>Who's Online</div>
        <hr></hr>
        <ul style={{ padding: 0 }}>
          {props.users.map((user, index) => {
            if (user.id === props.currentUser) {
              return (
                <WhosOnlineListItem key={index} isOnline>
                  {user.name} (You){' '}
                </WhosOnlineListItem>
              )
            }
            return (
              <WhosOnlineListItem key={index} isOnline={user.isOnline}>
                {user.name}
              </WhosOnlineListItem>
            )
          })}
        </ul>
        <hr></hr>
        <button
          style={{
            width: '100%',
            color: '#fff',
            padding: '1rem',
            border: '0',
            borderRadius: '0.25rem',
            backgroundColor: '#2a4365',
          }}
          onClick={() => props.logOut(props.currentUser)}
        >
          Log Out
        </button>
      </>
    )
  } else {
    return <p>Loading...</p>
  }
}

class WhosOnlineListItem extends Component<{
  isOnline?: boolean
  children?: ReactNode
}> {
  render() {
    const styles = {
      li: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2,
      },
      div: {
        borderRadius: '50%',
        width: 11,
        height: 11,
        marginRight: 10,
      },
    }
    return (
      <li style={styles.li}>
        {/* <div
          style={{
            ...styles.div,
            backgroundColor: this.props.isOnline ? '#539eff' : '#414756',
          }}
        /> */}
        {this.props.children}
      </li>
    )
  }
}

export default WhosOnlineList
