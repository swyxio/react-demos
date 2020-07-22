export type User = {
  id: string
  name: string
  isOnline: boolean
}
export type Message = { user: User; text: string }
