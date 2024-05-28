import { html } from '../lib/lit-html.js';

export const notFoundView = () => html`
    <div class="container text-center mt-5">
        <h1>Page Not Found</h1>
        <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
        <a class="btn btn-primary" href="/">Back to Home</a>
    </div>
`;
