import { Dispatch, SetStateAction, useState } from "react";

import { Input } from "./Input";

const FocoAlgoritm = (
  setCoordenates: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >
) => {
  var canvas1 = document.getElementById(
    "canvasImagen1"
  ) as HTMLCanvasElement | null;

  var image1 = new Image();
  var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

  var ctx1 = canvas1?.getContext("2d");

  canvas1.addEventListener("mousemove", manejadorRaton, false);

  var curFile = imagen1.files;
  image1.src = window.URL.createObjectURL(curFile[0]);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;
    ctx1.drawImage(image1, 0, 0);
  };

  function crearFoco(radio: number, X: number, Y: number) {
    const canvas = document.createElement("canvas");
    canvas.width = radio * 2;
    canvas.height = radio * 2;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, radio * 2, radio * 2);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(radio, radio, radio, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(radio, radio, radio - 3, 0, Math.PI * 2);
    ctx.fill();
    ctx1.drawImage(canvas, X, Y);
  }

  function manejadorRaton(e) {
    var relativeX = e.clientX - (canvas1.offsetLeft - Math.floor(window.scrollX)) - 100;
    var relativeY = e.clientY - (canvas1.offsetTop - Math.floor(window.scrollY)) - 100;


    ctx1.drawImage(image1, 0, 0);
    crearFoco(100, relativeX, relativeY);
  }
};

const variants = [
  {
    name: "Foco",
  },
];

export const Foco = () => {
  const [coordenates, setCoordenates] = useState({ x: 0, y: 0 });

  return (
    <div>
      <Input
        idInput="imagen1"
        selectTool={() => FocoAlgoritm(setCoordenates)}
      />
      <div className="w-full flex justify-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Cordenadas: {coordenates.x}, {coordenates.y}
        </h1>
      </div>

      <div className="container mx-auto flex justify-center pb-10">
        {variants.map((variant, target) => (
          <div
            key={target}
            className="max-w-full bg-[#fffaeb] mb-10 rounded-lg border border-gray-200 shadow-slate-700 shadow-2xl dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                  {variant.name}
                </h5>
              </a>
            </div>
            <canvas
              className="w-full rounded-md"
              id={"canvasImagen" + (target + 1).toString()}
            ></canvas>
          </div>
        ))}
      </div>
    </div>
  );
};
