# Hello World

Create an empty file called `hello_world.m`
Try to compile it with `> gcc hello_world.m -o hello_world` and get the error:
```
Undefined symbols for architecture x86_64:
  "_main", referenced from:
    implicit entry/start for main executable
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

This because every C program needs an [entry point](https://en.wikipedia.org/wiki/Entry_point). As with plain old C programs, the main() function serves as the root of an Objective-C application.

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

int main(int argc, char *argv[])
{
  puts("Hello world.");
  return 0;
}
```

They will both produce the same result.
