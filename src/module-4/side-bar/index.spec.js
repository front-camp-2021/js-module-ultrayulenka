import SideBar from './solution';
import { categoryFilterConfig, brandFilterConfig } from './config.js';

describe('SideBar', () => {
  let sideBar;

  beforeEach(() => {
    sideBar = new SideBar(categoryFilterConfig, brandFilterConfig);

    document.body.append(sideBar.element);
  });

  afterEach(() => {
    sideBar.destroy();
    sideBar = null;
  });

  it('should be rendered correctly', () => {
    expect(sideBar.element).toBeInTheDocument();
    expect(sideBar.element).toBeVisible();
  });

  it('should have ability to be destroyed', () => {
    sideBar.destroy();

    expect(sideBar.element).not.toBeInTheDocument();
  });
});

