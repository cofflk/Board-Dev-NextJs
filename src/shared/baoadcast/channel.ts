let channel: BroadcastChannel | null = null

export function getChannel() {
  if (typeof window === 'undefined') return null

  if (!channel) {
    channel = new BroadcastChannel('haeahn-login-channel')
  }

  return channel
}