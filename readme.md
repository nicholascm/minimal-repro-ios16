### Failing Case - Minimal Reprocible Example iOS 16

This login flow crashes during the sign in while the web browser is visible on iOS 16
You'll need to add a valid clientId and try to sign in with an account on that clientId to see the failure

Sample Log Output when it crashes: 

``` 
LOG  AuthSession.loadAsync successful
 LOG  AuthSession.promptAsync successful
 ERROR  Your app just crashed. See the error below.
NSInvalidArgumentException: -[EXRequestInterceptorProtocol task]: unrecognized selector sent to instance 0x6000003d5540
  0   CoreFoundation                      0x00007ff80045478b __exceptionPreprocess + 242
  1   libobjc.A.dylib                     0x00007ff80004db73 objc_exception_throw + 48
  2   CoreFoundation                      0x00007ff8004638c4 +[NSObject(NSObject) instanceMethodSignatureForSelector:] + 0
  3   CoreFoundation                      0x00007ff800458c66 ___forwarding___ + 1443
  4   CoreFoundation                      0x00007ff80045ae08 _CF_forwarding_prep_0 + 120
  5   PreviewClinicNative.debug.dylib     0x000000010132a4eb $s15ExpoModulesCore0A26RequestInterceptorProtocolC10urlSession_4task15didSendBodyData14totalBytesSent0no10ExpectedToK0ySo12NSURLSessionC_So0S4TaskCs5Int64VA2NtF + 315
  6   PreviewClinicNative.debug.dylib     0x000000010132abcf $s15ExpoModulesCore0A26RequestInterceptorProtocolC10urlSession_4task15didSendBodyData14totalBytesSent0no10ExpectedToK0ySo12NSURLSessionC_So0S4TaskCs5Int64VA2NtFTo + 95
  7   PreviewClinicNative.debug.dylib     0x00000001013779cd $sTa.47 + 45

  ```