// A Fraction class
#import <Foundation/Foundation.h>

//———————— Interface ————————
@interface Fraction : NSObject {
  int numerator;
  int denominator;
}

- (void)showResults;
- (void)setNumerator:(int)n;
- (void)setDenominator:(int)d;

@end

//———————— Implementation ————————
@implementation Fraction

- (void)showResults {
  NSLog(@"This is a fraction with a value of %d/%d", numerator, denominator);
}

- (void)setNumerator:() {
  numerator = n;
}

- (void)setDenominator:(int)d {
  denominator = d;
}

@end

//———————— Main Program ————————
int main (int argc, const char * argv[]) {

  NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

  // Create an instance of Fraction
  Fraction *myFraction;

  myFraction = [[Fraction alloc] init];

  // Set myFraction to 2/5
  [myFraction setNumerator:2];
  [myFraction setDenominator:5];

  // Display the value of myFraction
  [myFraction showResults];

  // Clear up memory
  [myFraction release];
  [pool drain];
  return 0;
}
