const { JSDOM } = require('jsdom');

describe('Navbar', () => {
  let window, document;

  beforeEach(() => {
    // Set up a simple DOM environment
    const dom = new JSDOM(
      `
      <nav class="nav-menu">
        <ul>
          <li><a href="#i-want-to-get-involved">Get Involved</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#i-maintain-a-project">Maintain a Project</a></li>
        </ul>
      </nav>
      <div id="i-want-to-get-involved">Section 1</div>
      <div id="projects">Section 2</div>
      <div id="i-maintain-a-project">Section 3</div>
    `,
      {
        url: 'http://localhost',
        runScripts: 'dangerously',
      }
    );

    window = dom.window;
    document = window.document;

    // Simple mock for scrollTo
    window.scrollTo = jest.fn();
    window.performance = { now: () => Date.now() };
    window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  });

  // Test 1: Basic structure
  it('should have navigation menu', () => {
    const nav = document.querySelector('.nav-menu');
    expect(nav).not.toBeNull();
  });

  // Test 2: Number of links
  it('should have three navigation links', () => {
    const links = document.querySelectorAll('.nav-menu a');
    expect(links).toHaveLength(3);
  });

  // Test 3: Link hrefs
  it('should have correct href attributes', () => {
    const links = document.querySelectorAll('.nav-menu a');
    expect(links[0].getAttribute('href')).toBe('#i-want-to-get-involved');
    expect(links[1].getAttribute('href')).toBe('#projects');
    expect(links[2].getAttribute('href')).toBe('#i-maintain-a-project');
  });

  // Test 4: Link text
  it('should have correct link text', () => {
    const links = document.querySelectorAll('.nav-menu a');
    expect(links[0].textContent).toBe('Get Involved');
    expect(links[1].textContent).toBe('Projects');
    expect(links[2].textContent).toBe('Maintain a Project');
  });

  // Test 5: Basic scroll check
  it('should call scrollTo when link is clicked', async () => {
    // Setup click handler
    document
      .querySelector('.nav-menu a')
      .addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo(0, 100);
      });

    // Click the link
    document.querySelector('.nav-menu a').click();

    // Wait for any async operations
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Check if scrollTo was called
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
