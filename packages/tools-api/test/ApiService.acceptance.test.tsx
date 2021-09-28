// import { ApiService } from '../src/ApiService';
// import { ApiError, InternalApiRequest } from '../src/interfaces';
// import { RemoteApiRequest } from '../src/RemoteApiRequest';

/* This test requires two running servers: 1) a running game server whose URL comes
from the REMOTE_HOST environment variable (http://localhost:8080 by default), and 2) a running local Node backend server whose
URL is defined below (http://localhost:4000 by default). */

// describe('@bflint/tools-api:ApiService:Acceptance Test', () => {
//   const sut = new ApiService('http://localhost:4000');
//   test('can call server', () => {
//     const request: InternalApiRequest<void> = new RemoteApiRequest<void>('/actuator/health', 'GET', new Headers());
//     return sut.remoteRequest(request).then(data => {
//       if (data.success === false) {
//         const err = data.response as ApiError;
//         console.log('Error calling remote API: ' + err.errorCode + ', ' + err.errorMessage);
//       } else {
//         console.log('RESPONSE: ' + JSON.stringify(data.response));
//       }
//       expect(data.success).toBe(true);
//     });
//   });
// });
