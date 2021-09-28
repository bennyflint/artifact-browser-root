export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return !Object.keys(obj).length;
};

export enum OS {
  MacOs,
  Windows,
  Linux,
  Undefined
}

export function getOS(): OS {
  let platform = process.platform;
  if (platform == "win32") {
    return OS.Windows
  } else if (platform == "darwin") {
    return OS.MacOs
  } else if (platform == "linux") {
    return OS.Linux
  }
  return OS.Undefined
}