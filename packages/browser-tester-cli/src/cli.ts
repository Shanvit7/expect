import { Command } from "commander";
import { click } from "./commands/click";
import { diff } from "./commands/diff";
import { fill } from "./commands/fill";
import { hover } from "./commands/hover";
import { screenshot } from "./commands/screenshot";
import { select } from "./commands/select";
import { snapshot } from "./commands/snapshot";
import { type } from "./commands/type";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const program = new Command()
  .name("browser-tester-cli")
  .description("browser automation with ARIA snapshots")
  .version("0.0.1", "-v, --version");

program.addCommand(snapshot);
program.addCommand(click);
program.addCommand(fill);
program.addCommand(type);
program.addCommand(select);
program.addCommand(hover);
program.addCommand(screenshot);
program.addCommand(diff);

const main = async () => {
  await program.parseAsync();
};

main();
