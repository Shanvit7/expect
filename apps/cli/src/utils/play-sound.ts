import { exec } from "node:child_process";
import { platform } from "node:os";

export const playSound = () =>
  new Promise<void>((resolve) => {
    const os = platform();

    const command =
      os === "darwin"
        ? "afplay /System/Library/Sounds/Glass.aiff"
        : os === "win32"
          ? "powershell -c (New-Object Media.SoundPlayer 'C:\\Windows\\Media\\chimes.wav').PlaySync()"
          : "paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null || aplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null";

    exec(command, () => resolve());
  });
