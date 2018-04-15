#include "Message.h"

int main(void) {
  NSLog(@"Simple.");
  // Create an instance of Message
  Message *myMessage;
  myMessage = [[Message alloc] init];
  // Send message to `myMessage`
  [myMessage echo:@"Hello from Main"];
  return 0;
}
