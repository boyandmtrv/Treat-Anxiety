import { html } from '../lib/lit-html.js';

const homeTemplate = () => html`
    <div class="home">
        <div id="carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div class="carousel-controls">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1" style="background: url(src/img/first-main.png)"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2" style="background: url(src/img/fifth-main.jpg)"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3" style="background: url(src/img/third-main.jpg)"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4" style="background: url(src/img/fourth-main.jpg)"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="4" aria-label="Slide 5" style="background: url(src/img/second-main.jpg)"></button>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <div>
                        
                        <i class='bx bx-left-arrow' alt></i>
                    </div>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <div>
                        <i class='bx bx-right-arrow'></i>
                    </div>
                </button>
            </div>
            <div class="carousel-inner">
                <div 
                    class="carousel-item active"
                    style="background: url(src/img/first-main.png)">
                    <div class="container">
                        <h2 class="title"><span class="title-treat">Treat</span> Anxiety</h2>
                        <p class="subtitle">you are not your thoughts</p>
                        <a class="nav-link" href="/blogs">See All Blogs</a>
                    </div>
                </div>
                <div 
                    class="carousel-item"
                    style="background: url(src/img/fifth-main.jpg)">
                    <div class="container">
                        <h2>Safe space</h2>
                        <p>dedicated to sharing thoughts and experiences related to anxiety</p>
                    </div>
                </div>
                <div 
                    class="carousel-item"
                    style="background: url(src/img/third-main.jpg)">
                    <div class="container">
                        <h2>You are not alone</h2>
                        <p>Remember, you are not alone. There is peace within you, and your thoughts do not define who you are.</p>
                    </div>  
                </div>
                <div 
                    class="carousel-item"
                    style="background: url(src/img/fourth-main.jpg)">
                    <div class="container container-quote">
                        <p class="quote-text">"The greatest weapon against stress is our ability to choose one thought over another."</p>
                        <h2 class="quote-author">— William James</h2>
                    </div>  
                </div>
                <div 
                    class="carousel-item"
                    style="background: url(src/img/second-main.jpg)">
                    <div class="container">
                        <h2 class="social">
                            <a href="https://www.instagram.com/treatanxiety/" target="_blank" rel="noopener noreferrer">
                                <i class='bx bxl-instagram'></i>
                            </a>
                        </h2>
                        <p>want to meet?</p>
                    </div>  
                </div>
            </div>
        </div>
    </div>
`;
export async function homeView(ctx) {
    ctx.render(homeTemplate());
};

