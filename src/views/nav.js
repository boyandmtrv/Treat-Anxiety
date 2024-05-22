import { html } from '../lib/lit-html.js';
import { CONFIG } from '../config.js';

const SPECIAL_USER_ID = CONFIG.SPECIAL_USER_ID;

export const navTemplate = (hasUser, userId) => {
    return html`
        <nav class="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top">
            <div class="container">
                <a class="navbar-logo navbar-brand fs-4" href="/">Treat  <span>Anxiety</span></a>
                <button 
                    class="navbar-toggler shadow-none border-0" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasNavbar" 
                    aria-controls="offcanvasNavbar" 
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="sidebar bg-transparent offcanvas offcanvas-start" tabindex="-1" 
                     id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header text-white border-bottom">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Treat Anxiety</h5>
                        <button type="button" class="btn-close btn-close-white shadow-none" 
                                data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
                        <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                            <li class="nav-item mx-4" data-bs-dismiss="offcanvas">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item mx-4" data-bs-dismiss="offcanvas">
                                <a class="nav-link" href="/blogs">Blogs</a>
                            </li>
                            ${hasUser
                                ? html`
                                    ${userId === SPECIAL_USER_ID
                                        ? html`
                                            <li class="nav-item mx-1" data-bs-dismiss="offcanvas">
                                                <a class="nav-link" href="/create">Create</a>
                                            </li>
                                        `
                                        : ''}
                                `
                                : ''}
                        </ul>
                        <div class="d-flex flex-row flex-lg-row justify-content-center align-items-center gap-3 text-decoration-none" data-bs-dismiss="offcanvas">
                            ${hasUser
                                ? html`
                                    <a class="text-white text-decoration-none px-3 py-1 rounded-4 bg-[#f3f3f3]" href="/logout">Logout</a>
                                `
                                : html`
                                    <a class="text-white" href="/login">Login</a>
                                    <a class="text-white text-decoration-none px-3 py-1 rounded-4 bg-[#f3f3f3]" href="/register">Register</a>
                                `}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
};
