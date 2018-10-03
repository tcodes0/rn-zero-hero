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

#### Expensive
- make things pretty
- CI/CD
- unit tests
- detox e2e
- fix TS

#### Regular
- add pagination to List using meta-data <Query> ({fetchMore})
    -b leverage model db methods to implement pagination. I.e:
    ```
    return BookModel.find({})
          .limit(args.size)
          .skip(args.size * args.page)
    ```
- Use Mutation and Query from `react-apollo` to leverage the loading state
    use Activity indicator to show loading states
- add TS on server
- ApolloConsumer -> graphql HOC
- add MongoDB & Mongoose

#### Cheap
- use theme provider to provide a color.main prop
- Button -> touchable opacity
- refactor server files, move auth code to Auth module
- queries in component
- Ditch react-power-plug in cases where the JSX is full of complicated handlers that can be moved to an instance method in the class. E.g. `() => this.doFoo()`
- refactor \n in texts to two <Text>`s
✔ use reverse to sort items by new first!
✔ make queries required (!) where it makes sense
-b `combineResolvers` with `skip` from `graphql-resolvers`
-b destruct in args `(parent, { name, genre, authorId }) => {`

#### Bugs
- firing a second addBook mutation from same user doesn't update  UI even tho book is added on server. (CACHE)

### App login

|  |  |  |
|--|--|--|
|user| Foton | _case-**in**sensitive_ |
|pass| foton | _case-sensitive_ |

Or create your user. :)