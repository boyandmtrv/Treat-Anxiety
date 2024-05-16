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

page(addRender(document.querySelector('main'), document.querySelector('header')));
page(addSession(getUserData));
page(addUserNav(navTemplate))

page('/index.html', '/');
page('/', homeView);
page('/create', createView);
page('/blogs', blogView);
page('/blogs/:id', ({ params: { id } }) => console.log('details', id));
page('/create', createView);
page('/login', loginView);
page('/register', registerView);

page.start();

window.api = api;