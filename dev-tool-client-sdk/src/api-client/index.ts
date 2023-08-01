import { createChannel, createClient, Metadata } from 'nice-grpc-web'
import { BACKEND_URL } from '../config'
import { SessionServiceClient, SessionServiceDefinition } from '../generated/channel'

async function makeGrpcClient(accessToken: string, clientType: string) {
	// grpc-web channel
	// both the witness & backend can be accessed from this URL
	const channel = createChannel(BACKEND_URL)
	// metadata for auth token
	const metadata = new Metadata()

	metadata.set('Authorization', accessToken)
	metadata.set('client-type', clientType)
	// actual client to communicate with backend
	const client: SessionServiceClient = createClient(
		SessionServiceDefinition,
		channel,
		{ '*': { metadata } }
	)

	return client
}

export { makeGrpcClient }

// function FetchTransport(): import('nice-grpc-web/lib/client/Transport').Transport | undefined {
// 	throw new Error('Function not implemented.')
// }
