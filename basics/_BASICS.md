# Hello World

Create an empty file called `hello_world.m`. Try to compile it with,
`$ gcc hello_world.m -o hello_world` and get the error:

```sh
Undefined symbols for architecture x86_64:
  "_main", referenced from:
    implicit entry/start for main executable
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

This because every C program needs an [entry point](https://en.wikipedia.org/wiki/Entry_point).
As with plain old C programs, the main() function serves as the root of an
Objective-C application.

```objc
int main() {}
int main(int argc, const char * argv[]) {}
```

- `argc` means *argument count*. It signifies how many arguments are being passed into the executable.
- `argv` means *argument vector*. It is a pointer to an array of characters. Or to think about it in another way, it is an array of C strings (since C strings are just arrays of characters).

> The value returned from the main function becomes the exit status of the process, though the C standard only ascribes specific meaning to two values: EXIT_SUCCESS (traditionally 0) and EXIT_FAILURE. The meaning of other possible return values is implementation-defined. In case a return value is not defined by the programmer, an implicit return 0; at the end of the main() function is inserted by the compiler; this behavior is required by the C++ standard.

`Objective-C` is a superset of `C`.

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
  puts("Hello world.");
  return 0;
}
```

They will both produce the same result.


```objc
#include <stdio.h>

int main() {
  NSLog(@"Hello world.");
  puts("Hello world.");
  return 0;
}
```

When trying to compile the code about the compiler will complien with the follwing error.

```sh
ns_hello.m:6:3: warning: implicitly declaring library function 'NSLog' with type 'void (id, ...)'
  NSLog(@"Hello world.");
  ^
ns_hello.m:6:3: note: include the header <Foundation/NSObjCRuntime.h> or explicitly provide a declaration for 'NSLog'
1 warning generated.
Undefined symbols for architecture x86_64:
  "_NSLog", referenced from:
      _main in ns_hello-221abb.o
  "___CFConstantStringClassReference", referenced from:
      CFString in ns_hello-221abb.o
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

Let's import `Foundation` and try to compile it again.

```objc
#import <Foundation/Foundation.h>
#include <stdio.h>

int main() {
  NSLog(@"Hello world.");
  puts("Hello world.");
  return 0;
}
```

Run

```sh
$ gcc ns_hello.m -o ns_hello
```

and the compiler complains again

```
Undefined symbols for architecture x86_64:
  "_NSLog", referenced from:
      _main in ns_hello-6364aa.o
  "___CFConstantStringClassReference", referenced from:
      CFString in ns_hello-6364aa.o
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```
Try with:
```
basics > gcc -framework Foundation ns_hello.m -o ns_hello
```
It works! Run it by `./ns_hello` and see the output:
```
basics > ./ns_hello
2016-02-07 22:05:11.897 ns_hello[61768:2094543] Hello world.
Hello world.
```

```objc
#import <Foundation/Foundation.h>
```
The file in question is a system file, and that is why the name is enclosed in the brackets < and >. If you were importing a local file , you would enclose the file name in double quotes “ and ”. This file is imported because code later in the file requires information that is contained in this file; you are telling the compiler to look up the information in that file as necessary.

