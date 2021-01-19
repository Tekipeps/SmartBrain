import React from "react";
import { Route } from "../../types";

interface Props {
  updateRoute: (path: Route) => void;
  onLogin: (email: string, password: string) => void;
}

const SignIn: React.FC<Props> = ({ updateRoute, onLogin }) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form
          className="measure"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(email, password);
          }}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => updateRoute(Route.SIGN_UP)}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
