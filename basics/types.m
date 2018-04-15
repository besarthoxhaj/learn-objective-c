#import <Foundation/Foundation.h>
#include <stdio.h>

int main(void) {

  NSLog(@"Hello, World!");

  NSString *variableString = @"Hello, World";
  NSLog(@"Say %@!", variableString);

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

  return 0;
}
