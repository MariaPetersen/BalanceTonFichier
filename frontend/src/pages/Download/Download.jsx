import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Download.css";
import useApi from "../../hooks/useApi";

export default function Recap() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchData } = useApi();
  const [link, setLink] = useState();
  const [textToCopy, setTextToCopy] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      fetchData(`/shareLink/${id}`, "GET", {}, true).then((link) => {
        console.log(link);
        setLink(link);
        setTextToCopy(link.link);
      });
    };
    fetchLink();
  }, [id]);

  const returnToFiles = () => {
    navigate("/recap");
  };

  return (
    <div className="download-page">
      <img src="/logo.svg" alt="logo" />
      <div className="download-container">
        <div className="top-download">
          <img src="/success.svg" alt="logo" />
          <h4>
            Votre lien est prêt. Copiez-le en un clic et partagez-le à vos
            destinataires.
          </h4>
        </div>
        <div>
          <div className="resume-download">1 fichier importé</div>
          <div className="resume-download">
            <div className="download-link-section">
              <div>Lien de téléchargement</div>
              {link && (
                <a href={link.link} target="__blank">
                  {link.link}
                </a>
              )}
            </div>
            <div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(textToCopy);
                }}
              >
                <i className="fa-regular fa-copy"></i>
              </button>
            </div>
          </div>
          <button
            className="generate-link-button other-button"
            onClick={returnToFiles}
          >
            Retourner sur mes fichiers
          </button>
        </div>
      </div>
    </div>
  );
}
