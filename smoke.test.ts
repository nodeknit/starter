import { spawn } from 'child_process';
import { describe, it, expect } from 'vitest';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Smoke Test: Application Startup', () => {
  it('should start the application without crashing for a short period', async () => {
    const proc = spawn('npx', ['tsx', 'index.ts'], { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', data => {
      stderr += data.toString();
    });
    // Allow the application to start and run briefly
    await sleep(5000);
    // Terminate the application process
    proc.kill();
    // Assert that no errors were output to stderr
    expect(stderr).toBe('');
  }, { timeout: 15000 });
});
