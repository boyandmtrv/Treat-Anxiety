import { inject } from '@vercel/analytics';
import page from './lib/page.mjs';
import * as api from './data/users.js';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { getUserData } from './util.js';
import { createView } from './views/create.js';
import { blogView } from './views/blogs.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { addUserNav } from './middlewares/userNav.js';
import { navTemplate } from './views/nav.js';
import { logoutAction } from './views/logout.js';
import { preloader } from './middlewares/preloader.js';
import { hasUser, isOwner } from './middlewares/guards.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { notFoundView } from './views/notFound.js'; 
import { aboutView } from './views/about.js';

inject()

page(addRender(document.querySelector('main'), document.querySelector('header')));
page(addSession(getUserData));
page(addUserNav(navTemplate))

page('/', homeView);
page('/create', hasUser(), createView);
page('/blogs', blogView);
page('/about', aboutView);
page('/blogs/:id', preloader('id', 'blogs'), detailsView);
page('/edit/:id', preloader('id', 'blogs'), isOwner(), editView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutAction);

page('*', notFoundView);

page.start();

window.api = api;