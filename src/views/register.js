import { register } from '../data/users.js';
import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';

const registerTemplate = (onSubmit, errorMessage) => html`
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
                        ${errorMessage ? html`
                        <div class="alert alert-danger" role="alert">
                            ${errorMessage}
                        </div>
                    ` : ''}
                        <div class="input-group mb-3 d-flex justify-content-left">
                            <input type="checkbox" class="form-check-input" id="formCheck">
                            <label for="formCheck" class="form-check-label text-secondary">
                                <small class="ms-2">Remember me</small>
                            </label>
                        </div>
                        <button
                            class="register-btn btn btn-lg w-100 mb-3">
                            Register
                        </button>
                    </form>
                    <div class="text-center">
                        <small class="bottom-link">
                            Already have an account?
                            <a href="/login" class="fw-bold">Login</a>
                        </small>
                    </div>
                </div>
        </div>
    </div>
`

export function registerView(ctx) {

    let errorMessage = '';

    const updateErrorMessage = (message) => {
        errorMessage = message;
        ctx.render(registerTemplate(submitHandler(onRegister), errorMessage));
    };

    ctx.render(registerTemplate(submitHandler(onRegister)));

    async function onRegister({ email, username, password, repass }) {
        if (email == '' || username == '' || password == '') {
            updateErrorMessage('All fields are required');
            return;
        }

        if (username.length <= 3) {
            updateErrorMessage('Username must be at least 4 characters long');
            return;
        }

        if (email.length <= 5) {
            updateErrorMessage('Invalid email');
            return;
        }

        if (password.length <= 5) {
            updateErrorMessage('Password must be at least 6 characters long');
            return;
        }

        if (password != repass) {
            updateErrorMessage('Passwords must match');
            return;
        }

        try {
            await register(email, username, password);
            ctx.page.redirect('/blogs');
        } catch (err) {
            // Handle registration errors (network issues, server errors, etc.)
            updateErrorMessage(err.message);
        }
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