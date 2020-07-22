# React Demos

plug and play React components to show off your backend tech by implementing a small set of methods!

goes without saying - none of these are meant for production!

## Installation

```bash
npm i react-demos
```

## Chat Example

```tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Chat, useChatLocalState } from 'react-demos'

const App = () => {
  const props = useChatLocalState()
  // // To implement:
  //   currentUser: User | null;
  //   usersOnline: User[];
  //   messages: Message[];
  //   /** set currentUser and add them to usersOnline */
  //   onUserLoggedIn: (name: string) => Promise<void>;
  //   /** (optional) unset currentUser and remove from usersOnline */
  //   onUserLoggedOut: (id: string) => Promise<void>;
  //   /** add to messages by also adding the currentUser */
  //   sendMessage: (text: string) => Promise<void>;
  return (
    <div>
      <Chat {...props} />
    </div>
  )
}
```
