# @odessa/console-server

TBD

# Connecting to MDK CLI
The Web Console server plugin has the ability to connect to a local machine's MDK CLI installation. This opens up a whole host of capabilities to the WCF. 
At the moment the MDK-CLI connection ionly works when using the WCF locally.

## Configuration
The MDK-CLI should already be installed prior to trying to use it. If need be, review the MDK-CLI ReadMe.md for first time user instructions.
In order for the console-server to communicate to correct mdk-cli, we provide a configurable json file, found at `src/configs/console-server-config.json`
Set the `relativePathToCliWindows` & `relativePathToCliUnix` values.
    - Path to cli script is relative to the `web-console-server` folder
    - Typical setups look like
        - `"relativePathToCliWindows": "../mdk-cli/.venv/Scripts/mdk"` & `"relativePathToCliUnix": "..mdk-cli/.venv/bin/mdk"`

## Making A Call To CLI Command
### From WCF
Invoking the command looks like
```
export interface FooResponse {
    message: string;
}

foo () {
    const sut = new ApiService('http://localhost:4000');
    sut.cliRequest<FooResponse>('name_of_command', 'argOne', 'argTwo').then(resp => {
        const response = resp.response as FooResponse;
        ...
    })
}
```
Keep in mind that WCF communicates to CLI via stdin, so args will be passed as string.

### From CLI
To send message back to the WCF , it looks something like
```
def respond():
    reponse = {
        "success": True
        "message": "some sort of message"
    }
    print(json.dumps(reponse))
```
WCF is looking for stdout, so a simple print statement with a formated json string will be recieved back in WCF