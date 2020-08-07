# React Demos

plug and play React components to show off your backend tech by implementing a small set of methods! Done in TypeScript because [I like React + TypeScript](https://react-typescript-cheatsheet.netlify.app/). Use this as an easy demo to show off your backend integrations. (e.g. React + Firebase, React + AWS Amplify, React + Node/Express/Mongo, etc.)

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
  const {
    currentUser,
    sendMessage,
    loginUser,
    logoutUser,
    messages,
    usersOnline,
  } = useChatLocalState()
  // // To implement:
  //   currentUser: User | null;
  //   usersOnline: User[];
  //   messages: Message[];
  // /** set currentUser and add them to usersOnline */
  // async function loginUser(name: string) {}
  // /** add to messages by also adding the currentUser */
  // async function sendMessage(text: string) {}
  // /** (optional) unset currentUser and remove from usersOnline */
  // async function logOutUser(id: string) {}
  return (
    <div>
      <Chat
        {...{
          currentUser,
          sendMessage,
          loginUser,
          logoutUser,
          messages,
          usersOnline,
        }}
      />
    </div>
  )
}
```

Here are the schemas of the 2 models used:

```ts
export type User = {
  id: string
  name: string
  isOnline: boolean
}
export type Message = { user: string; text: string }
```

<details>
<summary>
AWS AppSync model
</summary>

```graphql
type User @model {
  id: ID!
  name: String
  isOnline: Boolean
}

type Message @model {
  id: ID!
  user: String
  text: String
}
```

</details>

## Todo Example

TodoMVC with a clean React implementation (no Redux).

**Live Demo: [react-todomvc.netlify.app](https://react-todomvc.netlify.app)**

![image](https://user-images.githubusercontent.com/6764957/87823641-59816500-c8a6-11ea-920e-5140041977b0.png)

### Usage

The core of this package is a `<Todos>` component that takes 5 props:

- `todos: TodoType[]`: an array of `TodoType` objects
- `addNewTodo: (value: string) => Promise<void>`: callback for adding a new todo
- `updateTodo: (modifiedTodo: PartialTodoType) => Promise<void>`: update the value or completion state of a Todo by its `id`
- `deleteTodo?: (id: string) => Promise<void>`: optional callback for deleting a todo by ID
- `clearCompletedTodos?: () => void`: optional callback for clearing completed todos (if omitted, the corresponding button won't show)
- `todosTitle?: string`: optional string - to customize the title shown. defaults to `"React-TodoMVC"`.

For demo purposes, a sample implementation is provided from `useTodosLocalState`. The intent is that you will swap out these functions for your own as you implement your backend.

```js
import { Todos, useTodosLocalState } from 'react-demos'
import 'react-todomvc/dist/todomvc.css' // for styling

const App = () => {
  // FOR DEMO CREATOR: replace this with your impl!
  const props = useTodosLocalState()
  // // must implement
  // todos: TodoType[]
  // function addNewTodo(value: string): Promise<void>`
  // function updateTodo(modifiedTodo: PartialTodoType): Promise<void>`
  // // optional
  // function deleteTodo(id: string): Promise<void>
  // function clearCompletedTodos(): void
  // todosTitle?: string
  return (
    <div>
      <Todos {...props} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

If you want something that persists in localstorage, you can use `useTodosLocalStorageState` instead. It has the same API as `useTodosLocalState`.

### List of Implementations

- AWS Amplify + AppSync: _tbd_
- Firebase: _tbd_
- Netlify + FaunaDB: _tbd_

### Acknowledgements

The http://todomvc.com/ project

the `todomvc.css` was combined from `todomvc-app-css` and `todomvc-common`.
