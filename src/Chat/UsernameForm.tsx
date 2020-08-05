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
      username: 'DEFAULT_USERNAME_' + Math.floor(Math.random() * 100),
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
      <div>
        <div>
          <h2>What is your username?</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Your full name"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default UsernameForm
