#import <Foundation/Foundation.h>

int main () {

  NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

  NSMutableDictionary *my_dict = [[NSMutableDictionary alloc] init];

  [my_dict setObject:@"foo" forKey:@"key_1"];
  [my_dict setObject:@"bar" forKey:@"key_2"];

  NSLog(@"my_dict access 'key_1': %@", [my_dict objectForKey:@"key_1"]); // my_dict access 'key_1': foo
  NSLog(@"my_dict access 'key_2': %@", [my_dict objectForKey:@"key_2"]); // my_dict access 'key_2': bar

  [pool drain];
  return 0;
}
