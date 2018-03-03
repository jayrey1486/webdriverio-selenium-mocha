This project requires a running selenium-standalone server
     - Make sure you have Java added to your PATH variable
     - In the terminal:
        - npm install selenium-standalone
        - selenium-standalone install
        - selenium-standalone start
    - leave it running in a separate terminal (like nodemon)

This project also requires node-gyp
    - Make sure you have C++ redistributable installed first
    - npm install -g node-gyp

Additional dependencies are in the package.json file

To execute tests, the wdio can be called through the npm "test" command:
    - npm test

The configuration for the base URL is in the wdio config file, not in the test files.

This suite will test in both Firefox and Chrome.


