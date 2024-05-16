import { html } from "../lib/lit-html.js";
 
const homeTemplate = () => html`

<section class="home" id="home">
        <!-- <div class="btn-box">
            <a href="/create" class="btn">Create</a>
            <a href="/blogs" class="btn">Blogs</a>
        </div> -->
    </div>
</section>
`; 

export function homeView(ctx) {
    ctx.render(homeTemplate());
};