# PLT-ASM

## Prerequisite for project
- Node with version >= 14.15.0 should be insatlled on system
- npm and node configured properly to be accessed via terminal

## How to start project
**Excute the following command in project folder**
- npm run start:dev

## How to run unit test cases
**Excute the following command in project folder**
- npm run test

## API to get stock
GET: http://localhost:3000/api/v1/product/stock?sku=LTV719449/39/39
[^note]:
To check stock for a particular item, update sku in query param of above API

## Project Structure
**Top-level directory**
```
.
├── dist                   # Compiled js files
├── src                    # Source files
├── index.ts               # Entry-point file
├── jest.config.js         # Jest configuration file
├── tsconfig.json          # Typescript compiler configuration
└── README.md
```

## Note
- Unit test case cover the bussiness logic of this project. Ultility function like logger, error handler are not tested.
- Project is structured by modules not roles like controller, models, routes etc.
- All files related to a module are placed in same module folder i.e. test files, interface, types etc
- Adding env file directly in repo so that project can be run without any extra configuration
