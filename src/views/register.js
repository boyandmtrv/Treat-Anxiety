import { register } from '../data/users.js';
import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';

const registerTemplate = (onSubmit) => html`
    <div class="row vh-100 g-0">
        <div class="col-lg-6 position-relative d-none d-lg-block">
            <div 
                class="bg-holder"
                style="background-image:url(src/img/forest.jpg)">
            </div>
        </div>
        <div class="col-lg-6">
            <div class="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                <div class="col col-sm-6 col-lg-7 col-xl-6">
                    <a href="/" class="d-flex justify-content-center">
                        <img src="src/img/logo.png" alt="" width="60">
                    </a>
                    <div class="text-center mb-5">
                        <h3 class="fw-bold">Register</h3>
                        <p class="text-secondary">Get access</p>
                    </div>
                    <button class="btn btn-outline-secondary btn-outline-custom bg-lg w-100 mb-3">
                        <i class='bx bxl-google text-danger me-1 fs-6'></i> Login with Google
                    </button>
                    <div class="position-relative">
                        <hr class="text-secondary divider">
                        <div class="divider-content-center">or</div>
                    </div>
                    <form @submit=${onSubmit}>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                            <i class='bx bx-envelope' ></i>
                            </span>
                            <input 
                                type="text"  
                                name="email" 
                                class="form-control form-control-lg fs-6"
                                placeholder="Email"
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                            <i class='bx bx-user' ></i>
                            </span>
                            <input 
                                type="text"  
                                name="username" 
                                class="form-control form-control-lg fs-6"
                                placeholder="Username"
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                            <i class='bx bx-lock-alt' ></i>
                            </span>
                            <input 
                                type="password"  
                                name="password" 
                                class="form-control form-control-lg fs-6"
                                placeholder="Password"
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                            <i class='bx bx-repeat' ></i>
                            </span>
                            <input 
                                type="password"  
                                name="repass" 
                                class="form-control form-control-lg fs-6"
                                placeholder="Repeat Password"
                            />
                        </div>
                        <div class="input-group mb-3 d-flex justify-content-left">
                            <input type="checkbox" class="form-check-input" id="formCheck">
                            <label for="formCheck" class="form-check-label text-secondary">
                                <small class="ms-2">Remember me</small>
                            </label>
                        </div>
                        <button
                            class="btn btn-primary btn-lg w-100 mb-3">
                            Register
                        </button>
                    </form>
                    <div class="text-center">
                        <small class="text-white">
                            Already have an account?
                            <a href="/login" class="fw-bold text-white">Login</a>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
`

export function registerView(ctx) {
    ctx.render(registerTemplate(submitHandler(onRegister)));

    async function onRegister({ email, username, password, repass }) {
        if (email == '' || username == '', password == '') {
            return alert('All fields are required')
        };

        if (password != repass) {
            return alert('Passwords must match')
        };

        await register(email, username, password);
        ctx.page.redirect('/blogs')
    }
};

{/* <h2>Register</h2>
    <form @submit=${onSubmit}>
        <label>Email <input type="text"  name="email"></label>
        <label>Username <input type="text"  name="username"></label>
        <label>Password <input type="password"  name="password"></label>
        <label>Repeat Password <input type="password"  name="repass"></label>
        <button>Register</button>
    </form> */}