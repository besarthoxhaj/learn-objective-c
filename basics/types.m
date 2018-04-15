#import <Foundation/Foundation.h>
#include <stdio.h>

int main(void) {

  NSLog(@"Hello, World!");

  // https://developer.apple.com/documentation/foundation/nsstring?language=objc
  NSString *variableString = @"Hello, World";
  NSString* myString = [[NSString alloc]initWithFormat:@"here's a number: %i", 123];
  NSString* makeItUp = [variableString uppercaseString]; 
  NSLog(@"String: %@!", variableString);
  NSLog(@"String: %@!", myString);
  NSLog(@"String: %@!", makeItUp);

  NSNumber *myBirthdayYear = @1990;
  NSLog(@"Number %@!", myBirthdayYear);

  // NSArray is an immutable object.
  NSArray *people = @[@"Foo", @"Bar", @"Zoo"];
  NSLog(@"Array %@", people[0]);
  people = @[@"Foo", @"Bar", @"Zoo", @"Lee"];
  NSLog(@"Array %@", people[3]);

  NSArray *ratings = @[@3, @5];
  NSDictionary *person = @{@"First Name": @"Bar"};
  NSDictionary *appRatings = @{@"AngryFowl": @3, @"Lettertouch": @5};
  NSLog(@"%@", appRatings[@"AngryFowl"]);

  // `blocks`
  void (^someCode)() = ^{
    NSLog(@"Block `someCode` is executed");
  };

  someCode();
  return 0;
}
