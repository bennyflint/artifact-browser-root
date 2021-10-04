import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import PluginsRoute from './routes/plugins.route';
import CliRoute from './routes/cli.route';
import RemoteRoute from './routes/remote.route';
import { FileSystemRoute } from './filesystem/filesystem.route';
import validateEnv from './utils/validateEnv';
import MdkCliInterop from './utils/mdk-cli-interop';
import RemoteServerInterop from './remote/remote-server-interop';
import { RemoteInterop } from './interfaces/remote.interface';
import { FileSystemInteropImpl } from './filesystem/filesystem.interop';

const env = validateEnv();

const cliInterop = new MdkCliInterop();
const remoteHost = env.REMOTE_HOST as string;
console.log('REMOTE_ENV=' + remoteHost);
const remoteInterop: RemoteInterop = new RemoteServerInterop(remoteHost);
const fileSystemInterop = new FileSystemInteropImpl();
const app = new App([
  new IndexRoute(),
  new PluginsRoute(cliInterop),
  new CliRoute(cliInterop),
  new RemoteRoute(remoteInterop),
  new FileSystemRoute(fileSystemInterop)
]);

app.listen();
