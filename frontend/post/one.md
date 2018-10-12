## iOS emphasis

We'll be focusing on getting the ins and outs of iOS apps because that's what we do better.

## The simulator

The simulator is the development tool we use to simulate an iPhone.

### What you should know:

- `cmd+d` will invoke a toolbox with several options
- `cmd+r` will reload the Simulator (we do this *very* often)

### Enable `hot reloading.`

Avoid `live reloading.`
It's a poor man's hot reload.
It'll reload the whole app and reset your route to the beginning of the stack, so you'll need to click the UI to get back to the screen you were.

### Enable `Debug JS remotely.`

It'll launch a chrome tab.
Right click it and choose `inspector`.
When inspector is open, a `debugger;` statement in the source code will pause the runtime, but if the inspector is closed, it WILL NOT PAUSE.

#### Inspector will close randomly, you'll need to re-open it.
#### When inspector pauses, it'll grab your desktop focus, even if it is in another desktop.

This can be a little annoying.

#### Debugging causes Simulator to crash with the message `Runtime is not ready for debugging.`

If you get that, it's most likely because you restarted Metro or something else.
Restarting metro will throw this error all the time.
If metro is running in a terminal tab, hit `cmd+r` in simulator and look at the metro tab.
If you see loading activity, wait a bit.
Then reload again.
Also try closing chrome or temporarily disabling `debug JS remotely`, but it shouldn't be needed.

### Run Metro using `react-native start --reset-cache`

This method is very safe, if you don't mind waiting a bit more (10 seconds).
If you install npm packages or modify node_modules, it's likely you could crash the app with some random error.
Also renaming files will crash the app and crash Metro.
Keep calm and kill Metro with `ctrl+c`, then restart it again using the `--reset-cache` flag.

### Alias `react-native` to `rn`

`alias rn='react-native'`
This one is awesome.
If you ever have problems, `alias` will dump all aliases currently active to stdin.
`alias | grep foo` will search aliases for `'foo'` and print matches.
`unalias rn` will undo the alias.
Under bash the shell will read `~/.bash_profile` and `~/.bashrc` on every startup, so it's a good place to put aliases.

### Build on Xcode

Xcode builds give you more control over errors.
Avoid `react-native run-ios`.
Nothing wrong with it though, it's just a recommendation.
To build on Xcode, open the xcode project.
Normally `open ios/${APPNAME}.xcodeproj` from the project root, where APPNAME is your app's name.

### Cocoa pods

Try to avoid.
But if you're using it anyway, DON'T open the `*.xcodeproj` file.
It won't build no matter how much you beg it.
Open the `*.xcworkspace` file.

### Xcode caches

Soft clean: `cmd+k`
Hard clean: `shift+cmd+k`

This is often a good troubleshooting step.
When facing a random error, clean it.
