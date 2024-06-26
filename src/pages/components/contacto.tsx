import React, { FormEvent, forwardRef, useState, useEffect } from "react";
import Image from "next/image";
import sheeran from "../../img/sheeran2.png";
import barato from "../../img/barato2.png";
import hodor from "../../img/hodor2.png";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

interface propsContact {
  message: string;
  setMessage: (string) => void;
  scrollToForm: () => void;
}
const Contacto = forwardRef<HTMLDivElement, propsContact>((props, ref) => {
  const { message, setMessage, scrollToForm } = props;
  const [isSent, setIsSent] = useState(false);
  const [showError, setShowError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telf, setTelf] = useState("");
  const [error, setError] = useState("");

  function sendEmail(event: FormEvent) {
    var messageText = "";
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      if (name.trim() === "" && email.trim() === "" && message.trim() === "") {
      }
      if (name.trim() === "") {
        messageText = messageText + " " + "Nombre";
      }
      if (email.trim() === "") {
        messageText = messageText + " " + "Correo";
      }
      if (message.trim() === "") {
        messageText = messageText + " " + "Mensaje";
      }

      if (messageText === "") {
        messageText = "Por favor, rellena todos los campos.";
      } else {
        messageText = "Por favor rellena los siguientes campos:" + messageText;
      }

      setError(messageText);
      // Handle the case where required fields are empty (you can show an error message)
      setShowError(true);
      scrollToForm();
      setTimeout(() => {
        setShowError(false);
      }, 7000);
      return;
    }

    if (!isSent) {
      event.preventDefault();
      const formData = {
        name,
        email,
        telf,
        message,
      };

      axios
        .post("/api/email", formData)
        .then((response) => {
          setName("");
          setEmail("");
          setTelf("");
          setMessage("");

          setIsSent(true);
          setTimeout(() => {
            setIsSent(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div
      id="contacto"
      className="h-contacto w-auto contacto-bg  flex items-center justify-center shadow-inset-y pt-4 pb-8"
      ref={ref}
    >
      <div className="h-contacto-form md:h-auto w-full flex md:flex-row flex-col gap-4 py-4">
        <div className="md:w-4/6 flex flex-col justify-between align-middle items-end px-8 md:pr-0 md:py-8">
          <div className="h-full md:w-4/6 3xl:w-3/5 w-full flex flex-col justify-between gap-4">
            <div className="text-2xl md:text-xl lg:text-2xl text-white grid place-content-center w-full mt-4 md:m-0">
              <h2 className="text-center p-2 border-b-2  uppercase">
                ¡Contáctanos!
              </h2>
            </div>
            {showError && <ErrorMessage error={error} />}
            <div className="h-contacto-form form-bg w-full border-2 border-white shadow-lg p-4 grid gap-4 text-sm rounded-sm">
              <div className="w-full h-full">
                <div className="md:h-full flex flex-col justify-between w-full text-sm ">
                  <form
                    className="w-full md:h-full gap-2 flex flex-col justify-between"
                    onSubmit={sendEmail}
                  >
                    <div className="w-full">
                      <label className="text-white text-lg">Nombre:</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="text-lg text-gray-100 bg-black/50 h-10 border-2 mt-1 mb-1 rounded-sm px-4 w-full border-white shadow-inset"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                    <div className="">
                      <label className="text-white text-lg">Correo:</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="text-lg text-gray-100 bg-black/50 h-10 border-2 mt-1 mb-1 rounded-sm px-4 w-full border-white shadow-inset"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="">
                      <label className="text-white text-lg">Teléfono:</label>
                      <input
                        type="tel"
                        name="tel"
                        id="tel"
                        className="text-lg text-gray-100 bg-black/50 h-10 border-2 mt-1 mb-1 rounded-sm px-4 w-full border-white shadow-inset"
                        placeholder="*Opcional*"
                        value={telf}
                        onChange={(event) => setTelf(event.target.value)}
                      />
                    </div>
                    <div className="flex align-middle w-full h-full">
                      <div className="w-full h-auto">
                        <label className="text-white text-lg">Mensaje:</label>
                        <textarea
                          name="text"
                          rows={6}
                          className="pt-1 text-lg text-gray-100 bg-black/50 border-2 mt-1 mb-1 rounded-sm px-4 w-full border-white shadow-inset"
                          required
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className={`grid w-full text-center transition-all duration-1000`}
                    >
                      <div
                        className={`${
                          isSent
                            ? "w-full shadow-none bg-black/50"
                            : " shadow-sm hover:bg-black/20 bg-white/10 hover:shadow-none hover:cursor-pointer"
                        } border-2 border-white text-white py-2 px-4 rounded-sm text-xl shadow-black/60   transition-all duration-1000 `}
                        onClick={sendEmail}
                      >
                        {isSent ? "Enviado" : "ENVIAR"}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-between align-middle items-start py-8 md3:pr-28">
          <div className=" md3:w-full lg:w-5/6 xl:w-4/6 3xl:w-4/6 md:w-5/6 w-full flex flex-col items-start h-full gap-4 px-8 md:pl-8 ">
            <div className="w-full">
              <div className="text-2xl md:text-xl lg:text-2xl text-white grid place-content-center w-full ">
                <h2 className="text-center p-2 border-b-2 uppercase">
                  ¡Llámanos!
                </h2>
              </div>
            </div>
            <div className="w-full h-full flex flex-col justify-between ">
              <div className="h-full capa-bg text-white  h-contacto-foto lg:h-contacto-foto2  w-full border-2 flex flex-row mb-4 md:m-0 rounded-sm rounded-b-none shadow-lg">
                <div className="h-full w-1/3 md:w-2/5 border-r-2">
                  <Image
                    src={sheeran}
                    alt="sheeran"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      border: "2px",
                      borderColor: "#fff",
                    }}
                  />
                </div>
                <ul className=" flex flex-col justify-center gap-2 lg:gap-4 w-3/5 px-4 py-4 md2:py-1 md3:py-4 lg:py-6 xl:py-6 2xl:py-8">
                  <li className="text-left text-lg md:text-sm md3:text-base lg:text-lg 2xl:text-xl mx-auto">
                    Sheeran (Pablo)
                  </li>
                  <li className="text-left text-base md:text-sm 2xl:text-xl mx-auto">
                    ☏ 637 69 61 99
                  </li>
                </ul>
              </div>
              <div className=" capa-bg text-white h-contacto-foto lg:h-contacto-foto2 h-min w-full border-2 flex flex-row  mb-4 md:m-0 rounded-sm rounded-y-none shadow-lg">
                <div className="h-full w-1/3 md:w-2/5 border-r-2">
                  <Image
                    src={barato}
                    alt="barato"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      border: "2px",
                      borderColor: "#fff",
                    }}
                  />
                </div>
                <ul className=" flex flex-col justify-center gap-2 lg:gap-4 w-3/5 px-4 py-4 md2:py-1 md3:py-4 lg:py-6 xl:py-6 2xl:py-8">
                  <li className="text-left text-lg md:text-sm md3:text-base lg:text-lg 2xl:text-xl mx-auto">
                    Barato (Pedro)
                  </li>
                  <li className="text-left text-base md:text-sm 2xl:text-xl mx-auto">
                    ☏ 640 63 09 16
                  </li>
                </ul>
              </div>
              <div className="capa-bg text-white h-contacto-foto lg:h-contacto-foto2 w-full border-2 flex flex-row rounded-sm rounded-t-none shadow-lg">
                <div className="h-full w-1/3 md:w-2/5 border-r-2">
                  <Image
                    src={hodor}
                    alt="hodor"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      border: "2px",
                      borderColor: "#fff",
                    }}
                  />
                </div>
                <ul className=" flex flex-col justify-center gap-2 lg:gap-4 w-3/5 px-4 py-4 md2:py-1 md3:py-4 lg:py-6 xl:py-6 2xl:py-8">
                  <li className="text-left text-lg md:text-sm md3:text-base lg:text-lg 2xl:text-xl mx-auto">
                    Hodor (Santi)
                  </li>
                  <li className="text-left text-base md:text-sm 2xl:text-xl mx-auto">
                    ☏ 678 82 01 67
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Contacto;
