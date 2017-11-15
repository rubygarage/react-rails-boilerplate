// moved the ugly environment (server/client) check to this helper
export const isServer = () => typeof window === 'undefined'
export const isClient = () => typeof window !== 'undefined'
