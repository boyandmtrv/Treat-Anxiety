import { html } from '../lib/lit-html.js';
import { CONFIG } from '../config.js';

const SPECIAL_USER_ID = CONFIG.SPECIAL_USER_ID;

export const navTemplate = (hasUser, userId) => {
    return html`
      <nav>
            <a href="/">Home</a>
            <a href="/blogs">Blogs</a>
            ${hasUser
        ? html`
            ${userId === SPECIAL_USER_ID
        ? html`<a href="/create">Create</a>`
        : ''}
            <a href="/logout">Logout</a>`
        : html`
            <a href="/register">Register</a>
            <a href="/login">Login</a>
            `}
        </nav>
    `;
};
