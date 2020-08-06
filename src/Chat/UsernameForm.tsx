import React, { Component } from 'react'

type Props = {
  onSubmit(text: string): void
  onChange?(): void
}
type State = {
  username: string
}
class UsernameForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: 'USER_' + Math.floor(Math.random() * 100),
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    localStorage.setItem('REACT_DEMOS', this.state.username)
    this.props.onSubmit(this.state.username)
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
          backgroundColor: '#1a202c',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div>
          <h2>What is your username?</h2>
          <form
            onSubmit={this.onSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <input
              autoFocus
              type="text"
              value={this.state.username}
              placeholder="Your full name"
              onChange={this.onChange}
              style={{
                fontSize: '1.5rem',
                margin: '1rem',
                padding: '0.5rem',
              }}
            />
            <button
              style={{
                backgroundColor: 'papayawhip',
                padding: '1rem',
                fontSize: '1.5rem',
                textTransform: 'uppercase',
              }}
              disabled={!this.state.username.length}
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default UsernameForm
