import { html } from '../lib/lit-html.js';

const homeTemplate = () => html`
    <h1>Welcome to Treat Anxiety</h1>
    <p>Your are not your thoughts</p>
    <p>check out latest blogs <a href="/blogs">all blogs</a></p>
`;

export async function homeView(ctx) {
    ctx.render(homeTemplate());
};