import ClientComponent from '@/components/client-auth-component'
import ServerComponent from '@/components/server-auth-component'

export default function Home() {
  return (
      <div>
          <ServerComponent />
          <ClientComponent />
      </div>
  )
}
