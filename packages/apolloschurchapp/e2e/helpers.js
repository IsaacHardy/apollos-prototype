import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

const SCREENSHOT_DIR = '/tmp/screenshots';

const SCREENSHOT_OPTIONS = {
  timeout: 1000,
  killSignal: 'SIGKILL',
};

let screenshotIndex = 0;

const takeScreenshot = () => {
  if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR);
  /* eslint-disable-next-line */
  const screenshotFilename = `${SCREENSHOT_DIR}/screenshot-${screenshotIndex++}.png`;
  execSync(
    `xcrun simctl io booted screenshot ${screenshotFilename}`,
    SCREENSHOT_OPTIONS
  );
};

export default takeScreenshot;
