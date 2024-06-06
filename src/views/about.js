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
                            <p>Explore a range of topics from the physiological responses to anxiety, to psychological patterns and coping mechanisms.</p>
                            <p>Read and share personal stories that highlight the diverse experiences of those living with anxiety.</p>
                            <p>Access practical tools and resources designed to help manage anxiety, from mindfulness exercises to cognitive-behavioral techniques.</p>
                        </div>
                        <div class="right-side">
                            <h1>We aim to:</h1>
                            <ul>
                                <li>Educate: Provide thorough explanations of anxiety-related topics such as the Fight/Flight response, cognitive distortions, and more. Our blog is rich with articles that break down these concepts into easily understandable information.</li>
                                <li>Empower: Encourage individuals to share their personal journeys with anxiety, fostering a sense of community and mutual support.</li>
                                <li>Inspire: Offer insights and strategies for finding peace and managing anxiety, reminding everyone that "you are not your thoughts."</li>
                                <li>Inspire: Offer insights and strategies for finding peace and managing anxiety, reminding everyone that "you are not your thoughts."</li>
                            </ul>
                        </div>
                    </div>
                    <div class="bottom-container">
                        <div class="bottom-side">
                            <h1>Join our community:</h1>
                            <p>We believe in the power of shared experiences and the strength that comes from understanding and support. By joining our community, you're taking a step towards finding the hidden peace within you and helping others to do the same. Remember, you are not alone, and you are not your thoughts. Thank you for being a part of our journey. Together, we can navigate the challenges of anxiety and discover the tranquility that lies beyond it.</p>
                        </div>
                        <div class="big-bottom">
                            <p>treat<span class="second-text">anxiety</span><span class="sub-text">- Finding the hidden peace.</span></p>
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
