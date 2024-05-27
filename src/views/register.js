import { register } from '../data/users.js';
import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';

const registerTemplate = (onSubmit) => html`
    <div class="row vh-100 g-0">
            <div class="bg-forms row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                <div class="col col-sm-6 col-lg-4 col-xl-3">
                   
                    <div class="text-center mb-5">
                        <h3 class="fw-bold">Register</h3>
                    </div>
                    <div class="position-relative">
                        <hr class="text-secondary divider">
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
                                <small class="ms-2 text-light">Remember me</small>
                            </label>
                        </div>
                        <button
                            class="register-btn btn btn-lg w-100 mb-3">
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
`

export function registerView(ctx) {
    ctx.render(registerTemplate(submitHandler(onRegister)));

    async function onRegister({ email, username, password, repass }) {
        if (email == '' || username == '', password == '') {
            return alert('All fields are required')
        };

        if (username.length <= 3) {
            return alert('Username must be at least 4 characters long')
        };

        if (email.length <= 5) {
            return alert('Invalid email')
        };

        if (password.length <= 5) {
            return alert('Password must be at least 6 characters long')
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