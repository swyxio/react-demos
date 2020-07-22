import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Chat, useChatLocalState } from '../.'

const App = () => {
  const props = useChatLocalState()
  return (
    <div>
      <Chat {...props} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
