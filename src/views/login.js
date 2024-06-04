import { login } from '../data/users.js';
import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';
import { until } from '../lib/directives/until.js';

const loginTemplate = (onSubmit, errorMessage) => html`
     <div class="row vh-100 g-0">
            <div class="bg-forms row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
                <div class="col col-sm-6 col-lg-4 col-xl-3">
                    <div class="text-center mb-5">
                        <h3 class="fw-bold">Login</h3>
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
                            <i class='bx bx-lock-alt' ></i>
                            </span>
                            <input 
                                type="password"  
                                name="password" 
                                class="form-control form-control-lg fs-6"
                                placeholder="Password"
                            />
                        </div>
                        ${errorMessage ? html`
                                <div class="alert alert-danger" role="alert" >
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
                            class="btn register-btn btn-lg w-100 mb-3">
                            Login
                        </button>
                    </form>
                    <div class="text-center">
                        <small class="bottom-link">
                           Don't have an account?
                            <a href="/register" class="fw-bold ">Register</a>
                        </small>
                    </div>
                </div>
            </div>
    </div>
`;

export function loginView(ctx) {
    let errorMessage = '';

    const updateErrorMessage = (message) => {
        errorMessage = message;
        ctx.render(loginTemplate(submitHandler(onLogin), errorMessage));
    };

    ctx.render(loginTemplate(submitHandler(onLogin), errorMessage));

    async function onLogin({ email, password }) {
        if (email == '' || password == '') {
            errorMessage = 'All fields are required';
            ctx.render(loginTemplate(submitHandler(onLogin), errorMessage));
            return;
        };

        await login(email, password);
        ctx.page.redirect('/blogs');
    }
};
