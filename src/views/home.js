import { html } from '../lib/lit-html.js';

const homeTemplate = () => html`
    <div class="home">
        <div id="carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div class="carousel-controls">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1" style="background: url(src/img/main-img.png)"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2" style="background: url(src/img/second-main.png)"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3" style="background: url(src/img/third-main.png)"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4" style="background: url(src/img/fourth-main.png)"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="4" aria-label="Slide 5" style="background: url(src/img/fifth-main.png)"></button>
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
                    style="background: url(src/img/main-img.png)">
                    <div class="container">
                        <h2 class="title"><span class="title-treat">Treat</span> Anxiety</h2>
                        <p class="subtitle">you are not your thoughts</p>
                        <a class="nav-link" href="/blogs">See All Blogs</a>
                    </div>
                </div>
                <div 
                    class="carousel-item"
                    style="background: url(src/img/second-main.png)">
                    <div class="container">
                        <h2>Safe space</h2>
                        <p>dedicated to sharing thoughts and experiences related to anxiety</p>
                    </div>
                </div>
                <div 
                    class="carousel-item"
                    style="background: url(src/img/third-main.png)">
                    <div class="container">
                        <h2>You are not alone</h2>
                        <p>we aim to remind you that you are not alone. We strive to uncover the hidden peace within each of us, promoting the idea that our thoughts do not define us.</p>
                    </div>  
                </div>
                <div 
                    class="carousel-item"
                    style="background: url(src/img/fourth-main.png)">
                    <div class="container container-quote">
                        <p class="quote-text">“Worrying is carrying tomorrow’s load with today’s strength — carrying two days at once. It is moving into tomorrow ahead of time. Worrying doesn’t empty tomorrow of its sorrow, it empties today of its strength.”</p>
                        <h2 class="quote-author">— Corrie ten Boom</h2>
                    </div>  
                </div>
                <div 
                    class="carousel-item"
                    style="background: url(src/img/fifth-main.png)">
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

