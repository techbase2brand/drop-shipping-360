import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="Signup-page-os">
      <div className="container-os">
        <form class="signup" onsubmit="return false" autocomplete="off">
          <h1>Create account</h1>
          <h2>
            Already have an account? <span>Sign in</span>
          </h2>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              name="Shop"
              id="Shop"
              required
            />
            <label class="signup__label" for="Shop">
              Shop
            </label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              name="fullname"
              id="fullname"
              required
            />
            <label class="signup__label" for="fullname">
              fullname
            </label>
          </div>
          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              name="email"
              id="email"
              required
            />
            <label class="signup__label" for="email">
              Email
            </label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="password"
              name="password"
              id="password"
              required
            />
            <label class="signup__label" for="password">
              Password
            </label>
          </div>
          <div class="signup__field">
            <input
              class="signup__input"
              type="password"
              name="phone"
              id="phone"
              required
            />
            <label class="signup__label" for="phone">
              Phone
            </label>
          </div>

          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
