#import <Foundation/Foundation.h>

int main () {

  NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

  int sum = 0;    // Make sure we start at zero, to avoid issues later

  // Allow user input
  NSLog(@"Please enter a value.");
  int times;
  scanf("%d", &times);

  // for() loop construct:
  for(int n = 1; n <= times; n = n + 1){
    sum = sum + n;
  }

  NSLog(@"Sum of all values from 1 to %d is %d", times, sum);

  [pool drain];
  return 0;
}
