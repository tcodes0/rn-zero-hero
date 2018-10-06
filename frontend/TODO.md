# React Native Fullstack: Zer0 to Hero

<br>

<p align="center">
  <img src="https://placekitten.com/220/220" alt="reakit" width="320" />
</p>

*awesome logo goes here*


## Initial working version

### How to play with it

- Clone the repo
- `cd` into it
- `cd` into `server/`
- `yarn && yarn start`
- `cd -` To go back to the repo
- `cd` into `frontend/`
- `yarn && yarn start` To start Metro Bundler

>Now you need: `react-native-cli` installed globally (`npm i -g react-native-cli`)

>OR

>Xcode.

#### React native cli

- `react-native run-ios` To compile the project and launch the Simulator.

#### Xcode

- `Open ios/frontend.xcodeproj` To launch the Xcode project. Click the build button and hang tight, it'll launch the Simulator soon.

### What's to be improved

#### Done
✔ use flatList
✔ get some feedback

#### Modern design
rounded buttons
gradients
dark bg gradient


#### Expensive
✔ make things pretty
- CI
- unit tests
- detox e2e
✔ fix TS

#### Regular
- add pagination to List using meta-data <Query> ({fetchMore})
- Id everything in backed
- see if dataid func on constructor works o => o.id
V send token in headers
- Use Query
- sort by recent todos server-side https://stackoverflow.com/questions/47624681/sort-by-reverse-order-mongoose?rq=1
xb add TS on server
✔b add MongoDB & Mongoose

✔ moved styles to styled
✔ Use Mutation and Query from `react-apollo` to leverage the loading state
    use Activity indicator to show loading states
✔ ApolloConsumer -> graphql HOC
✔ Ditch react-power-plug in cases where the JSX is full of complicated handlers that can be moved to an instance method in the class. E.g. `() => this.doFoo()`

#### Cheap
✔ use theme provider to provide a color.main prop
✔ Button -> touchable opacity
✔ Remove redux
✔  refactor server files, move auth code to Auth module
✔ queries in component
✔ refactor \n in texts to two <Text>`s
✔ use reverse to sort items by new first!
✔ make queries required (!) where it makes sense
✔  destruct in args `(parent, { name, genre, authorId }) => {`

#### Bugs
- firing a second addBook mutation from same user doesn't update  UI even tho book is added on server. (CACHE)

### App login

|  |  |  |
|--|--|--|
|user| Foton | _case-**in**sensitive_ |
|pass| foton | _case-sensitive_ |

Or create your user. :)