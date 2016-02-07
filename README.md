## Objective-C

Some good materials
- [Awesome iOS](https://github.com/vsouza/awesome-ios)
- [NYTimes Objective-C Style Guide](https://github.com/NYTimes/objective-c-style-guide/blob/master/README.md)


### Simple types
```objc
NSLog(@"Hello, World!");

NSString *variableString = @"Hello, World";

NSLog("Say %@!", variableString);

NSNumber *myBirthdayYear = @1990;

NSArray *people = @[@"Foo", @"Bar", @"Zoo"];
// NSArray is an immutable object.

NSLog(@"%@", people[0]);

people = @[@"Foo", @"Bar", @"Zoo", @"Lee"];

NSArray *ratings = @[@3, @5];

NSDictionary *person = @{@"First Name": @"Bar"};

NSDictionary *appRatings = @{@"AngryFowl": @3, @"Lettertouch": @5};

NSLog(@"%@", appRatings[@"AngryFowl"]);
```

### Sending messages
"Sending a message" is sometimes referred to as "calling a method".
```objc
[objectName messageName];

NSArray *foods = @[@"tacos", @"burgers"];

NSLog(@"%@", [foods description]); // the description message

NSString *result = [foods description];

NSLog(@"%@", result);

NSString *city = @"Ice World";
NSUInteger cityLength = [city length];

NSLog(@"City has %lu characters", cityLength); // note '%lu'
```

### Objective-C and C

A good rule of thumb for how to tell if an object is an Objective-C object or a C one: Objective-C objects are defined with the * in front of variable names, like this: NSString *name
Multiplying with * is something done in c, and thus c types are expected on either side of the multiplication sign.


**Adding values** *- unsignedIntegerValue*
```objc
NSNumber *higgiesAge = @25;
NSUInteger higgiesAgeInteger = [higgiesAge unsignedIntegerValue];
```
Multiplication is a *C* operation, for this reason it needs `C` arguments. The way to convert an NS object to *C* is by sending a specific message, in this case `[NSNumber unsignedIntegerValue]`

**String concatenation** *- stringByAppendingString*
```objc
NSString *firstName = @"Bes";
NSString *lastName = @"Hoxhaj";

NSString *fullName = [firstName stringByAppendingString:lastName];
NSLog(@"%@", fullName); // BesHoxhaj
```
The same as before: `[NSString stringByAppendingString:NSString]`

**Nesting messages**
```objc
NSString *firstName = @"Bes";
NSString *lastName = @"Hoxhaj";

NSString *fullName = [[firstName stringByAppendingString:@" "] stringByAppendingString:lastName];
NSLog(@"%@", fullName); // Bes Hoxhaj
```

Note `[[firstName stringByAppendingString:@" "] stringByAppendingString:lastName]`.

**Working with long message names**
```objc
NSString *firstName = @"Bes";
NSString *lastName = @"Hoxhaj";

NSString *fullName = [[firstName stringByAppendingString:@" "]
                        stringByAppendingString:lastName];

NSString *replaced = [fullName stringByReplacingOccurrencesOfString:firstName
                                                         withString:lastName];

NSLog(@"%@", replaced); // Hoxhaj Hoxhaj
```

**Creating an NSString with a message**
```objc
NSString
  stringWithString:
  initWithString:
  stringWithFormat:
  isEqualToString:
NSNumber
  intValue
```

Examples
```objc
NSString *firstName = @"Bes";

NSString *copy = [NSString stringWithString:firstName];

NSLog(@"%@ is a copy of %@", copy, firstName);

NSArray *emptyArray = [NSArray array];

NSDictionary *emptyDict = [NSDictionary dictionary];

// pattern for creating empy objects

NSString *emptyString = [[NSString alloc] init];
NSArray *emptyArray = [[NSArray alloc] init];
NSDictionary *emptyDictionary = [[NSDictionary alloc] init];

// All classes respond to the alloc message, which allocates a place in memory to store the object. alloc returns an object that is unusable until init is sent to it.

NSString *firstName = @"Bes";
NSString *copy = [[NSString alloc] initWithString:firstName];
NSLog(@"%@ is a copy of %@", copy, firstName); // Bes is a copy of Bes

NSString *firstName = @"Bes";
NSString *lastName = @"Hoxhaj";
NSString *fullname = [NSString stringWithFormat:@"%@ %@", firstName, lastName];
```
## Flow control
**if/else**
```objc
BOOL mrHiggieIsMean = NO;
// BOOL mrHiggieIsMean = [mrHiggie areYouMean];

if (mrHiggieIsMean) {
  NSLog(@"Confirmed: he is super mean");
} else {
  NSLog(@"No, actually he's really nice");
}

if(0-3) {
  NSLog(@"Mr. Higgie is on the nice side");
} else if(4-7) {
  NSLog(@"Mr. Higgie is sorta nice but not really");
} else {
  NSLog(@"Mr. Higgie is definitely mean");
}
```

**switch**
```objc
NSInteger day = getDayOfWeek();

switch (day) {
  case 1: {
    NSLog(@"Monday");
    break;
  }
  case 2: {
    NSLog(@"Tuesday");
    break;
  }
  /* snip Wednesday through Saturday */
  case 7: {
    NSLog(@"Sunday");
    break;
  }
}
```
Note: you can't pass switch an NSString because switch is in the "c layer" and thus doesn't know anything about NSString.

```objc
typedef NS_ENUM(NSInteger, DayOfWeek) {
  DayOfWeekMonday = 1,
  DayOfWeekTuesday = 2,
  DayOfWeekWednesday = 3,
  DayOfWeekThursday = 4,
  DayOfWeekFriday = 5,
  DayOfWeekSaturday = 6,
  DayOfWeekSunday = 7
};
```

**Fast Enumeration**

```objc
NSArray *funnyWords = @[@"Schadenfreude", @"Portmanteau", @"Penultimate"];

for (NSString *word in funnyWords) {
  NSLog(@"%@ is a funny word", word);
}
```

**Enumerating an NSDictionary**
```objc
NSDictionary *funnyWords = @{
  @"Schadenfreude": @"pleasure derived by someone from another person's misfortune.",
  @"Portmanteau": @"consisting of or combining two or more separable aspects or qualities",
  @"Penultimate": @"second to the last"
};

for (NSString *word in funnyWords){
  NSString *definition = funnyWords[word];
  NSLog(@"%@ is defined as %@", word, definition);
}
```
**Code blocks**
```objc
void (^myFirstBlock)(void) = ^{
  NSLog(@"Hello from inside the block");
};

myFirstBlock(); // Hello from inside the block
```

Syntax: `void (^myFirstBlock)(void) = ^{`
- `void` the first *void* describes what the block returns
- `(^myFirstBlock)` is the name of the block
- `(void)` is the argument the block expects to receive

**Blocks with arguments**
```objc
void (^sumNumbers)(NSUInteger, NSUInteger) = ^(NSUInteger num1, NSUInteger num2){
  NSLog(@"The sum of the numbers is %lu", num1 + num2);
};
sumNumbers(45, 89);

void (^logCount)(NSArray *) = ^(NSArray *array){
  NSLog(@"There are %lu objects in this array", [array count]);
};

logCount(@[@"Mr.", @"Higgie"]);
logCount(@[@"Mr.", @"Jony", @"Ive", @"Higgie"]);

void (^myFirstBlock)(NSString *) = ^(NSString *name){
  NSLog(@"%@",name);
};

myFirstBlock(@"Hello");
myFirstBlock(@"World");
```

**Enumerate with blocks** *- enumerateObjectsUsingBlock:*

```objc
for (NSString *word in funnyWords) {
  NSLog(@"%@ is a funny word", word);
}
// replace
[funnyWords enumerateObjectsUsingBlock:
  ^(NSString *word, NSUInteger index, BOOL *stop){
    NSLog(@"%@ is a funny word", word);  
  }
];
// or
void (^enumeratingBlock)(NSString *, NSUInteger, BOOL *) = 
  ^(NSString *word, NSUInteger index, BOOL *stop){
    NSLog(@"%@ is a funny word", word);
  };
                         
[funnyWords enumerateObjectsUsingBlock:enumeratingBlock];
```

## Classes
- class interface

```objc
NSDictionary *talkingiPhone = @{
  @"Name": @"Mr. Higgie", 
  @"ModelNumber": @1
};
```
We could send a message to this object, but the only messages we have to choose from are defined by `NSDictionary` and have to do with dictionary-like operations.

```objc
@interface Phone
@end
```
At this point there aren’t any messages we can send to Phone objects. With this interface definition we wouldn’t even be able to create a Phone object because Phone doesn’t implement alloc or init. There are other methods all Objective-C objects are expected to have as well: description, class, copy, and more. Do we need to define alloc and init and all these other common methods in our Phone class interface to get it to work? No, that would be an awful lot of work. Object-Oriented languages like Objective-C have a technique to solve this problem in an elegant way: Inheritance.

**Inheritance**
```objc
@interface Phone : NSObject
@end
```
Now “Customers” of Phone will see that it inherits from NSObject and can assume that Phone will respond to all the messages an NSObject can respond to, like class, init, copy, description, etc.

```objc
// Person.h
@interface Person : NSObject
@property NSString *firstName;
@property NSString *lastName;
@end
```

**Class implementation**
```objc
// Person.m
#import "Phone.h"

@implementation Person
@end
```

**Using a property**
```objc
Person *person = [[Person alloc] init];
person.firstName = @"Eric";

NSLog(@"Person's first name is %@", person.firstName);
```

Note: Properties, although accessed and set using dot notation, use message sending under the hood. When you write person.firstName, it actually calls `[person firstName]` and when you write person.`firstName = @"Eric"` it actually calls `[person setFirstName:@"Eric"]`

**Creating a custom method**
```objc
// Phone.h
@interface Phone : NSObject

  // list of properties

  -(void)speak;
@end

```

`-(void)speak;` the dash represents a method followed by the type of value returned

```objc
// Phone.m
#import "Phone.h"
@implementation Phone
  - (void) speak; {
    NSLog(@"Hello, World");
  }
@end
```

**Understanding self**

```objc
// Phone.m
#import "Phone.h"
@implementation Phone
  - (void) speak; {
    NSLog(@"%@ says Hello There!", self);
  }
@end
```

```objc
#import "Phone.h"

Phone *phone = [[Phone alloc] init];
phone.phoneName = @"Mr. Higgie";

[phone speak]; // <Phone: 0x7ffda0402b70> says Hello There!
```

`Self` points to the memory `alloc` when the `*phone` gets initialized.


**Logging a property instead of self**

```objc
// ...
  NSLog(@"%@ says Hello There!", [self phoneName]);
// ...
```

**Method that returns a result**
```objc
@interface Person : NSObject
  @property NSString *firstName;
  @property NSString *lastName;

  -(void)speak;
  - (NSString *)fullName;
@end
```
```objc
@implementation Phone
  - (void) speak; {
    NSLog(@"%@ says Hello There!", self);
  }

  - (NSString *)fullName; {
    return [NSString stringWithFormat:@"%@ %@", self.firstName, self.lastName];
  }

  - (NSArray *)names; {
    return @[self.firstName, self.lastName];
  }
@end
```

Note: you have to set the return type in both the header and implementation files.

**Declaring a method with arguments**

```objc
// Person.h
@interface Person : NSObject
  @property NSString *firstName;
  @property NSString *lastName;

  -(void)speak;
  -(NSString *)fullName;
  -(NSString *)sayHi:(NSString *)greeting;
@end
```

- `:` means “what follows is an argument declaration”.
- The type of the argument in parentheses `(NSString *)`
- The argument name `greeting`

```objc
// Person.m
#import "Person.h"

@implementation Person
  // ...
  -(NSString *)sayHi:(NSString *)greeting; {

    NSString *message = [NSString stringWithFormat:@"%@ says %@", self.firstName, greeting];
    return message;
  }
@end
```

Note: Message names that take arguments should include the : in the name. So a message named speak takes no arguments, while one named speak: takes a single argument. A message takes the same number of arguments as :'s in its name. So with something like dictionaryWithObjects:forKeys:count: you know it takes 3 arguments.


**Making a property read-only**

```objc
// Person.h
@interface Person : NSObject
  @property NSString *firstName;
  @property (readonly) NSString *lastName;
@end
```

```objc
// Person.m
#import "Person.h"

@implementation Person

  - (void) changeLastName:(NSString *)newLastName; {
    _lastName = newLastName;
  }
@end
```
> Every property has a special internal variable that is prefixed with an underscore _. This way a property can be read-only to the outside world, but methods on the class still are able to update the property’s value.

**Assigning a default property**
`Method overriding`

```objc
#import "Person.h"

@implementation Person
  - (Person *) init; {

    NSLog(@"Cool, a new Person is being initialized");
    return [super init];
  }
@end
```
Is possible to initialize internal variables

```objc
#import "Person.h"

@implementation Person
  - (Person *) init; {
    NSLog(@"Cool, a new Person is being initialized");
    _firstName = @"Tim";
    _lastName = @"Cook";
    return [super init];
  }
@end
```

**Creating an instance variable**

```objc
// Coffee.h
@interface Coffee : NSObject {
  NSNumber *_temperature;
}
@property NSString *phoneName;
@property NSString *modelNumber;

- (void) decreaseBatteryLife:(NSNumber *)arg;
- (NSString *) speak:(NSString *)greeting;
- (void) reportBatteryLife;
@end
```

Note the curly brackets.

## Errors
**Compile time**
> Before a program can run, it must first be compiled, and it’s the job of the compiler to combine all your code into an executable program. If the compiler finds any errors, it will not compile your code into an executable, and instead report the errors so you can fix them. So far in this course, you’ve only had to fix these kinds of errors.

**Run time**
> Just because your code successfully compiles and runs, it doesn’t mean you are in the clear because the compiler can’t catch everything (nor would we want it to, it would end up taking forever to compile anything). When an error happens at “runtime” it is called an exception. This is exactly what happened in the last challenge: your code compiled but when we ran the compiled program, we got this runtime exception:
```
Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: '-[Phone copyWithZone:]: unrecognized selector sent to instance 0x7fdf014010d0'
```
> The NSInvalidArgumentException means that we sent a message to an object and the object did not recognize the message because its class does not implement it. In this case, the copy message caused the copyWithZone: message to be sent to talkingiPhone, which it doesn’t respond to. Since the compiler didn’t check if talkingiPhone could respond to copyWithZone:, when the program ran, the copyWithZone: message was sent to the object and the object didn’t know what to do and so the program crashed.

All hope is not lost! We can always ask an object if it can respond to a message before we send it. For example, we can ask the talkingiPhone object if it responds to the decreaseBatteryLife: message like this:

```objc
if([talkingiPhone respondsToSelector:@selector(decreaseBatteryLife:)]){
  NSLog(@"Yup, talkingiPhone responds to the decreaseBatteryLife: message");
}
```

A selector is the object used to identify a message, and here we are passing the decreaseBatteryLife: selector to the respondsToSelector: message. respondsToSelector: figures out if the object it was sent to responds to the message corresponding to the name of the selector. In the case above, respondsToSelector: would return YES because the talkingiPhone object does respond to the decreaseBatteryLife: message.

If we wanted to check if the talkingiPhone object responds to a message with the name thisMessageDoesNotExist, we could do that like so:

```objc
if([talkingiPhone respondsToSelector:@selector(thisMessageDoesNotExist)]){
  NSLog(@"Yup, talkingiPhone responds to the thisMessageDoesNotExist message");
}else{
  NSLog(@"Nope, talkingiPhone DOES NOT respond to the thisMessageDoesNotExist message");
}
```

We’ve essentially added error-checking to the runtime of our application, because we could not rely on errors from compile time to catch the problem.

```objc
[talkingiPhone respondsToSelector:@selector(copy:)]
// is equal to
[talkingiPhone respondsToSelector:@selector(copyWithZone)]
```

## Protocols

## Initializer

## Open/closed principle

## id type

## Pointers

