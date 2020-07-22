import React, { Component, ReactNode } from 'react'

function WhosOnlineList(props: { users: User[]; currentUser: User }) {
  if (props.users) {
    return (
      <ul>
        {props.users.map((user, index) => {
          if (user.id === props.currentUser.id) {
            return (
              <WhosOnlineListItem key={index} isOnline>
                {user.name} (You)
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
    )
  } else {
    return <p>Loading...</p>
  }
}

class WhosOnlineListItem extends Component<{
  isOnline: boolean
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
        <div
          style={{
            ...styles.div,
            backgroundColor: this.props.isOnline ? '#539eff' : '#414756',
          }}
        />
        {this.props.children}
      </li>
    )
  }
}

export default WhosOnlineList
