# aiala.frontend
Web application for AIALA

## Project structure
AIALA frontend constist of two applications.

_Portal_ is the main application of AIALA.

_Public_ is responsible for registration, confirmation and password reset.

## How to run
Both application are based on  [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx) and several 3rd party libraries and components.
* Install [Node](https://nodejs.org/en/download/)
* Install _Node package manager_
* Ensure _npm is set to path_
* Install _@angular/cli_ 
* Install _@nrwl/schematics_
* Install / restore required node packages using `npm install`
* Connect to xappido package feed ([ask for access and license](mailto:aiala@xappido.com))

### Run Portal
`ng serve portal`

### Run Public
`ng serve public`

## Package feed
Ensure all required tools are installed, otherwise run

`npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false`

Add a .npmrc to your project, in the same directory as your package.json with following entry
```
registry=https://xappido.pkgs.visualstudio.com/_packaging/Web/npm/registry/
always-auth=true
```

Then, run vsts-npm-auth to get an Azure Artifacts token added to your user-level .npmrc file

`vsts-npm-auth -config .npmrc`

## Configuration
All required options for _portal_ and as well for _public_ are within their app located on file `apps\portal\src\environments\environment.ts` and `apps\public\src\environments\environment.ts` respectively.

## Documentation
See mentioned documentation for any further information. If you like to use AIALA within your organisation feel free and get in touch with [AIALA Project Team](mailto:aiala@xappido.com).