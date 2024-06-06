import { html } from '../lib/lit-html.js';
import { CONFIG } from '../config.js';

const SPECIAL_USER_ID = CONFIG.SPECIAL_USER_ID;

export const navTemplate = (hasUser, userId) => {
    return html`
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
            <div class="container">
                <a class="navbar-logo navbar-brand fs-4" href="/">       
                    <img src="/src/img/logo.svg" alt="">
                </a>
                <button 
                    class="navbar-toggler shadow-none border-0" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasNavbar" 
                    aria-controls="offcanvasNavbar" 
                    aria-label="Toggle navigation">
                    <span class="toggler-icon"><i class='bx bx-menu-alt-right'></i></span>
                </button>
                
                <div class="sidebar offcanvas offcanvas-start" tabindex="-1" 
                     id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header text-white border-bottom">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">\
                        <a class="instagram-icon-top px-3 py-1 rounded-4 text-decoration-none" href="https://www.instagram.com/treatanxiety/" target="_blank"><i class='bx bxl-instagram'></i></a>
                        </h5>
                        <button type="button" class="btn-close btn-close-white shadow-none" 
                                data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
                        <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                            <li class="nav-item mx-4" data-bs-dismiss="offcanvas">
                                <a class="nav-link" aria-current="page" href="/" style="color: #272727">Home</a>
                            </li>
                            <li class="nav-item mx-4" data-bs-dismiss="offcanvas">
                                <a class="nav-link" href="/blogs">Blogs</a>
                            </li>
                            <li class="nav-item mx-4" data-bs-dismiss="offcanvas">
                                <a class="nav-link" href="/about">About</a>
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
                        <div class="navbar-bottom d-flex flex-row flex-lg-row justify-content-center align-items-center gap-3 text-decoration-none" data-bs-dismiss="offcanvas">
                            ${hasUser
                                ? html`
                                    <a class="text-decoration-none px-3 py-1 rounded-4" href="/logout"  style="margin-left: 35px">Logout</a>
                                 `
                                : html`
                                    <a class="text-decoration-none px-3" href="/login" style="margin-left: 50px">Login</a>
                                    <a class="px-3 py-1 rounded-4 text-decoration-none" href="/register">Register</a>
                                `}
                                <a class="instagram-icon px-3 py-1 rounded-4 text-decoration-none" href="https://www.instagram.com/treatanxiety/" target="_blank"><i class='bx bxl-instagram'></i></a>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
};
