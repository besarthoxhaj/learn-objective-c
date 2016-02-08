#import <Foundation/Foundation.h>

int main () {

  NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

  NSMutableArray *empty_array = [[NSMutableArray alloc] init];

  for (int ii = 1; ii < 10; ii++) {

    NSDictionary *dictionary = @{
      @"hello": @"hello"
    };

    [empty_array addObject:dictionary];
  }

  NSLog(@"%@", empty_array);

  [pool drain];
  return 0;
}
