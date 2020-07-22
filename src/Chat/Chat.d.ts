// ambient type
type User = {
  id: string
  name: string
  isOnline: boolean
}
type Message = { user: User; text: string }
