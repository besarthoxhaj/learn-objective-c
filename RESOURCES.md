## Resources

- while trying to link Frameworks
  - https://github.com/premake/premake-core/issues/196
  - https://stackoverflow.com/questions/1780133/linking-against-apple-frameworks-with-gcc
  - `man ld` section
  - https://gcc.gnu.org/onlinedocs/gcc-4.4.7/gcc/Link-Options.html
  - look at Xcode build logs
  - found it `gcc {inputPath} -o {outputPath} [... -framework {name}] -F{frameworkPath} -F{moreFrameworkPath}`
