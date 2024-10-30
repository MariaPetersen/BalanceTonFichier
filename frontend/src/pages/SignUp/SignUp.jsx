import React, { useState } from "react";

import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function SignUp() {
  const envelop = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#A0A0A0" class="bi bi-envelope-fill" viewBox="0 0 16 16">
  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
</svg>`;

  const lock = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#A0A0A0" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
</svg>`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <div className="signIn">
      <div className="half">
        <MainLayout />
      </div>
      <div className="half">
        <p className="signIn__title">S'inscrire</p>
        <div className="log">
          <Input
            svgCode={envelop}
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            svgCode={lock}
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="no__account">
            Déjà un compte ? Connectez-vous <Link to="/signin">ici</Link>.
          </p>
          <Button
            label="S'inscrire à BalanceTonFichier"
            onClick={handleClick}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
