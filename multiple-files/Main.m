#include "Message.h"
#include "Person.h"

int main(void) {
  NSLog(@"Simple.");

  // Create an instance of Message
  Message *myMessage;
  myMessage = [[Message alloc] init];

  // Create an instance of Person
  Person *myPerson;
  myPerson = [[Person alloc] init];

  // Send message to `myMessage` and `myPerson`
  [myMessage echo:@"Hello from Main"];
  [myPerson talk:@"Hello, I'm a Person"];
  return 0;
}
