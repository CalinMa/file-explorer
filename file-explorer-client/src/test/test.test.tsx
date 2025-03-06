
import styles from './test.module.css'

describe('CSS Module Test', () => {
  it('should import CSS module without errors', () => {
    expect(styles).toBeDefined();
  });
});