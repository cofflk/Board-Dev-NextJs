export type BroadcastMessage =
  | { type: 'LOGIN'; user: string }
  | { type: 'LOGOUT' }
  | { type: 'TOKEN_REFRESH'; token: string }