import { html } from '../lib/lit-html.js';
import { CONFIG } from '../config.js';

const SPECIAL_USER_ID = CONFIG.SPECIAL_USER_ID;

export const navTemplate = (hasUser, userId) => {
    return html`
      <!-- <nav>
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
        </nav> -->

        <nav class="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top">
        <div class="container">
            <a class="navbar-brand fs-4" href="#">Treat Anxiety</a>
            <button 
            class="navbar-toggler shadow-none border-0" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar" 
            aria-controls="offcanvasNavbar" 
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="sidebar bg-transparent offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header text-white border-bottom">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column p-6">
                <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                <li class="nav-item mx-2">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link" href="#">Link</a>
                </li>
                </ul>
               <div class="d-flex justify-content-center align-items-center gap-3">
                    <a href="/login"  class="text-white">Login</a>
                    <a href="/register" class="text-white text-decoration-none px-3 py-1 rounded-4"
                    style="background-color: #f94ca4">Register</a>
            </div>
            </div>
        </div>
</nav>
    `;
};
