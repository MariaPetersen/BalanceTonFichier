import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Error.css";

export default function Error() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 500);
  };

  return (
    <div className="errorPage">
      <div className="errorPage__content">
        <svg
          width="25"
          height="28"
          viewBox="0 0 25 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.16 7.36C23.8933 8.96 23.24 10.2933 22.2 11.36C21.16 12.4267 19.88 13.2133 18.36 13.72C19.5867 13.9333 20.6 14.56 21.4 15.6C22.2 16.64 22.6 17.8667 22.6 19.28C22.6 19.7067 22.56 20.12 22.48 20.52C22.24 21.9333 21.6533 23.2133 20.72 24.36C19.7867 25.48 18.56 26.3733 17.04 27.04C15.5467 27.68 13.88 28 12.04 28H0.92L5.84 0.199998H16.44C18.9733 0.199998 20.9067 0.746665 22.24 1.84C23.6 2.93333 24.28 4.34667 24.28 6.08C24.28 6.48 24.24 6.90666 24.16 7.36ZM19.44 7.92C19.4933 7.54667 19.52 7.26667 19.52 7.08C19.52 6.04 19.16 5.22667 18.44 4.64C17.72 4.05333 16.7067 3.76 15.4 3.76H9.76L8.32 12H13.96C15.4533 12 16.68 11.64 17.64 10.92C18.6267 10.2 19.2267 9.2 19.44 7.92ZM18 20.04C18.0533 19.6133 18.08 19.3067 18.08 19.12C18.08 18.0267 17.68 17.16 16.88 16.52C16.08 15.88 15.0133 15.56 13.68 15.56H7.68L6.12 24.44H12.28C13.8267 24.44 15.1067 24.0533 16.12 23.28C17.1333 22.5067 17.76 21.4267 18 20.04Z"
            fill="#BB271A"
          />
        </svg>
        <p className="errorPage__title2">BalanceTonErreur</p>
        <h1 className="errorPage__title">404</h1>
        <p>T'as fait une tetrachié de chemin pour rien,</p>
        <p>retournes d'où tu viens ...</p>
        <Button
          label="Je retourne d'où je viens"
          onClick={handleClick}
          loading={loading}
        />
      </div>
    </div>
  );
}
