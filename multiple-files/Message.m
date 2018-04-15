#import "Message.h"

@implementation Message
  - (void)echo:(NSString*)str {
    NSLog(@"Message echo: %@",str);
  }
@end