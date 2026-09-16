declare module "node-device-detector/parser/bot-abstract-parser.js" {
  import type { ResultBot } from "node-device-detector";

  export default class BotParser {
    parse(userAgent: string): ResultBot | null;
  }
}
