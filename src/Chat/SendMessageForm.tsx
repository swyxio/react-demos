import React, { Component } from 'react'

type Props = {
  onSubmit(text: string): void
  onChange?(): void
}
type State = {
  text: string
}
class SendMessageForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      text: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    this.setState({ text: '' })
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: e.target.value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  render() {
    const styles = {
      container: {
        padding: 20,
        borderTop: '1px #4C758F solid',
        marginBottom: 20,
      },
      form: {
        display: 'flex',
      },
      input: {
        color: 'inherit',
        background: 'none',
        outline: 'none',
        border: 'none',
        flex: 1,
        fontSize: 16,
      },
    }
    return (
      <div style={styles.container}>
        <div>
          <form onSubmit={this.onSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Type a message here then hit ENTER"
              onChange={this.onChange}
              value={this.state.text}
              style={styles.input}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default SendMessageForm
