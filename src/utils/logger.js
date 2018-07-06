import { valExists } from ".";

const DebugConfig = require("../../config/DebugConfig");
class Logger {
  constructor(options) {
    this.suppressOptions = options.suppress;
    this.tempSuppress = false;
  }

  suppress = disable => {
    this.tempSuppress = disable ? false : true;
    return this;
  };

  error = (...msgs) => {
    if (this.suppressOptions.errors) return;
    if (this.tempSuppress) {
      setTimeout(() => (this.tempSuppress = false), 0);
      return this;
    }
    console.error(...msgs.filter(val => valExists(val)));
    return this;
  };

  warn = (...msgs) => {
    if (this.suppressOptions.warnings) return;
    if (this.tempSuppress) {
      setTimeout(() => (this.tempSuppress = false), 0);
      return this;
    }
    console.warn(...msgs.filter(val => valExists(val)));
    return this;
  };

  log = (...msgs) => {
    if (this.suppressOptions.logs) return;
    if (this.tempSuppress) {
      setTimeout(() => (this.tempSuppress = false), 0);
      return this;
    }
    console.log(...msgs.filter(val => valExists(val)));
    return this;
  };
}

export default new Logger(DebugConfig.logger);
