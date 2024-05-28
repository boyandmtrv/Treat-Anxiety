import { html } from '../lib/lit-html.js';

const notFoundTemplate = () => html`
      <section id="not-found">
            <h1>Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/">Go to Home</a>
        </section>
`;
export async function notFoundView(ctx) {
    ctx.render(notFoundTemplate());
};

