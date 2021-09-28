// FIXME I _really_ want to come get fetch tests working, but I have been unable to
// get fetch mocked properly thus far.

// import { ApiService } from '../src/ApiService';
// import { InternalApiRequest } from '../src/interfaces';
// import { RemoteApiRequest } from '../src/RemoteApiRequest';
// import fetch from 'cross-fetch';

// const mockFetch = function(): Promise<Response> {
//   return new Promise(resolve => {
//     resolve(new Response('help!'));
//   });
// };

// global.fetch = jest.fn(mockFetch);

// describe('@bflint/tools-api', () => {
//   it('works', () => {
//     console.log('sfadsfwew' + global.fetch);

//     const sut = new ApiService('someBaseUrl');

//     const req: InternalApiRequest<Record<string, never>> = new RemoteApiRequest<Record<string, never>>(
//       '/some/remoteendpoint',
//       'GET',
//       new Headers(),
//     );

//     return sut.remoteRequest(req).then(resp => {
//       console.log(JSON.stringify(resp));
//       return expect(resp.success).toBe(true);
//     });
//   });
// });

// below tests are not using mocks, and do not work right now
// BUT, the tests themselves are written like they should be when
// we get mocking of APIService up and running
// describe('ApiService', () => {
//     interface TestResponse {
//         data: string;
//     }
      
//     const DEFAULT_TEST_COMMAND = ['some', 'command'];
  
//     let testObj: ApiService;
  
//     beforeAll(() => {
//       testObj = new ApiService('http://localhost:4000');
//     });
  
//     describe('when sending a CLI valid request', () => {
//       it('returns successful response', async () => {
//         const res = await testObj.cliRequest<TestResponse>(...DEFAULT_TEST_COMMAND);
//         expect(res.success).toBeTruthy();
//       });
  
//       it('returns expected response object type', async () => {
//         const res = await testObj.cliRequest<TestResponse>(...DEFAULT_TEST_COMMAND);
//         expectResponseTypeToBeTestResponse(res.response);
//       });
//     });
  
//     describe('when sending a CLI request while server unreachable', () => {
//       beforeAll(() => {
//         testObj = new ApiService('http://fakehostname');
//       });
  
//       it('returns unsuccessful response', async () => {
//         const res = await testObj.cliRequest<TestResponse>(...DEFAULT_TEST_COMMAND);
//         expect(res.success).toBeFalsy();
//       });
  
//       it('returns expected response object type', async () => {
//         const res = await testObj.cliRequest<TestResponse>(...DEFAULT_TEST_COMMAND);
//         expectResponseTypeToBeApiError(res.response);
//       });
//     });
  
//     function expectResponseTypeToBeTestResponse(obj: unknown) {
//       const castedResponse = obj as TestResponse;
//       expect(castedResponse.data).toBe('data');
//     }
  
//     function expectResponseTypeToBeApiError(obj: unknown) {
//       expect(obj).toHaveProperty('errorCode');
//       expect(obj).toHaveProperty('errorMessage');
//     }
//   });
  
