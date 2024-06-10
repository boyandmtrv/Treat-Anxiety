import { html } from '../lib/lit-html.js';

const aboutTemplate = () => html`
    <div class="about">
        <div class="about-section">
            <div class="container">
                <div class="center-content">
                    <div class="left-right-container">
                        <div class="left-side">
                            <h1>About</h1>
                            <p>Welcome to treatanxiety, a dedicated space where we explore the multifaceted world of anxiety. Our mission is to provide a safe, supportive, and informative environment where individuals can share their experiences, gain insights, and find solace in knowing they are not alone.</p>
                            <p>At treatanxiety, we understand that anxiety is a complex and deeply personal experience. Each person's journey with anxiety is unique, and we are here to support you every step of the way.</p>
                            <p>Explore and contribute personal stories that shed light on the varied experiences of individuals living with anxiety.</p>
                        </div>
                        <div class="right-side">
                            <h1>We aim to:</h1>
                            <ul>
                                <li>Educate: Provide clear, accessible explanations of anxiety-related concepts. Our blog features articles that break down complex ideas into easily understandable information, empowering readers with knowledge to manage their anxiety.</li>
                                <li>Empower: Encourage individuals to share their personal journeys with anxiety, fostering a sense of community and mutual support.</li>
                                <li>Inspire: Help individuals identify symptoms of anxiety rather than feeling something is inherently wrong with them, fostering a sense of community and mutual support.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="bottom-container">
                        <div class="bottom-side">
                            <h1>Join our community:</h1>
                            <p>We believe in the power of shared experiences and the strength that comes from understanding and support. By joining our community, you're taking a step towards finding the hidden peace within you and helping others to do the same. Remember, you are not alone, and you are not your thoughts. Thank you for being a part of our journey. Together, we can navigate the challenges of anxiety and discover the tranquility that lies beyond it.</p>
                        </div>
                        <div class="big-bottom">
                            <p>treat<span class="second-text">anxiety</span><span class="sub-text"> - Finding the hidden peace.</span></p>
                            <a class="instagram-icon-about" href="https://www.instagram.com/treatanxiety/" target="_blank"><i class='bx bxl-instagram'></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export async function aboutView(ctx) {
    ctx.render(aboutTemplate());
};
