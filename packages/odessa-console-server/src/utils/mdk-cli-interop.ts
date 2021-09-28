import 'process';
import * as path from 'path'
import CliInterop from 'interfaces/cli.interface';
import {getOS, OS} from '../utils/util';
import { exec } from 'child_process';
import { cwd } from 'process';

class MdkCliInterop implements CliInterop {
  public async executeCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      var config = require('../configs/console-server-config.json')
      let pathToCli = this.getPathToCli(config)
      // below is commented out, because Jay could not get this working on his windows machine
      // possible this work on mac? leaving here until we can confirm
      // exec(command, { cwd: '..' }, (error, stdout, stderr) => {
      console.log(`COMMAND: ${command}`);
      exec(pathToCli + ' ' + command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing '${command}': ${error} stderr: ${stderr}`);
          reject(error);
          return;
        }
        console.log(`${command} response: ${stdout}`);
        resolve(stdout);
      });
    });
  }

  getPathToCli(config: any): string {
    if (getOS() === OS.Windows) {
      return path.join(cwd(), config.relativePathToCliWindows)
    } else {
      return path.join(cwd(), config.relativePathToCliUnix)
    }
  }
}

export default MdkCliInterop;
