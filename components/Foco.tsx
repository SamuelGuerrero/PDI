import { useState } from "react";

import DropdownMenuMatrix from "./DropdownMenuMatrix";
import { Input } from "./Input";

const FocoAlgoritm = (matrix: any) => {
  var canvas1 = document.getElementById(
    "canvasImagen1"
  ) as HTMLCanvasElement | null;

  var image1 = new Image();
  var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

  var matrixMean = matrix.reduce((partialSum, a) => partialSum + a, 0);
  if (matrixMean == 0) matrixMean = 1;
  if (matrixMean < 0) matrixMean = Math.abs(matrixMean);

  var ctx1 = canvas1?.getContext("2d");

  canvas1.removeEventListener("mousedown", manejadorRaton, true);
  canvas1.addEventListener("mousemove", manejadorRaton, false);

  var curFile = imagen1.files;

  if (!curFile.length) {
    return;
  }
  image1.src = window.URL.createObjectURL(curFile[0]);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;
    ctx1.drawImage(image1, 0, 0);
  };

  function crearFoco(radio: number, X: number, Y: number) {
    const canvas = document.createElement("canvas") as any;
    canvas.setAttribute("id", "canvasFoco");
    canvas.width = radio * 2;
    canvas.height = radio * 2;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
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

    var imageFoco = new Image() as any;
    imageFoco = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageFoco.data;
    const numPixels = imageFoco.width * imageFoco.height;

    var originalImage1 = new Image() as any;
    originalImage1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const originalPixels = originalImage1.data;

    var originalImage2 = new Image() as any;
    originalImage2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const originalPixels2 = originalImage2.data;

    var i = Y * originalImage1.width + X;
    var iaux = 1;

    for (var j = 0; j < numPixels; j++) {
      const newCordenates = obtainCoordenates(i, originalImage1);

      var R = productR(newCordenates, originalPixels, matrix);
      var G = productG(newCordenates, originalPixels, matrix);
      var B = productB(newCordenates, originalPixels, matrix);

      R = R < 0 ? 0 : R;
      G = G < 0 ? 0 : G;
      B = B < 0 ? 0 : B;

      R = R > 255 ? 255 : R;
      G = G > 255 ? 255 : G;
      B = B > 255 ? 255 : B;

      if (pixels[j * 4] == 255) originalPixels2[i * 4] = R;
      if (pixels[j * 4 + 1] == 255) originalPixels2[i * 4 + 1] = G;
      if (pixels[j * 4 + 2] == 255) originalPixels2[i * 4 + 2] = B;

      if (j % imageFoco.width == 0) {
        i = (Y + iaux) * originalImage1.width + X;
        iaux++;
        i--;
      }
      i++;
    }

    ctx1.putImageData(originalImage2, 0, 0);
    transform(X, Y);
  }

  function obtainCoordenates(i, image2) {
    const newMatrix = [];
    newMatrix.push(i - image2.width - 1);
    newMatrix.push(i - image2.width);
    newMatrix.push(i - image2.width + 1);

    newMatrix.push(i - 1);
    newMatrix.push(i);
    newMatrix.push(i + 1);

    newMatrix.push(i + image2.width - 1);
    newMatrix.push(i + image2.width);
    newMatrix.push(i + image2.width + 1);

    return newMatrix;
  }
  function productR(newMatrix, pixels, matrix) {
    var rSum = 0;
    for (var i = 0; i < matrix.length; i++) {
      rSum = rSum + pixels[newMatrix[i] * 4] * matrix[i];
    }

    return Math.round(rSum / matrixMean);
  }
  function productG(newMatrix, pixels, matrix) {
    var gSum = 0;
    for (var i = 0; i < matrix.length; i++) {
      gSum = gSum + pixels[newMatrix[i] * 4 + 1] * matrix[i];
    }

    return Math.round(gSum / matrixMean);
  }
  function productB(newMatrix, pixels, matrix) {
    var bSum = 0;
    for (var i = 0; i < matrix.length; i++) {
      bSum = bSum + pixels[newMatrix[i] * 4 + 2] * matrix[i];
    }

    return Math.round(bSum / matrixMean);
  }

  function manejadorRaton(e) {
    var relativeX =
      e.clientX - (canvas1.offsetLeft - Math.floor(window.scrollX)) - 100;
    var relativeY =
      e.clientY - (canvas1.offsetTop - Math.floor(window.scrollY)) - 100;

    ctx1.drawImage(image1, 0, 0);
    crearFoco(100, relativeX, relativeY);
  }

  function transform(X: number, Y: number) {
    var canvas = document.getElementById("canvasFoco") as
      | HTMLInputElement
      | any;

    if (!canvas) return;

    console.log(canvas);

    var originalImage = new Image() as any;
    originalImage = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const originalPixels = originalImage.data;
    const numPixels = originalImage.width * originalImage.height;

    const canvasPixels = canvas.data;
    console.log(canvasPixels.length);

    var i = originalImage.width * Y + X;
    var yAux = Y + 1;
    for (var j = 0; j < numPixels; j++) {
      if (j % originalImage.width.width == 0) {
        i = originalImage.width * yAux + X;
        yAux++;
        i--;
      }
      if (canvasPixels[j] > 0) {
        originalPixels[i * 4] = 255;
        originalPixels[i * 4 + 1] = 255;
        originalPixels[i * 4 + 2] = 255;
      }
      i++;
    }
    ctx1.drawImage(originalImage, 0, 0);
  }
};

const variants = [
  {
    name: "Foco",
  },
];

export const Foco = () => {
  const [matrix, setMatrix] = useState([0, 0, 0, 0, 1, 0, 0, 0, 0])

  return (
    <div>
      <Input
        idInput="imagen1"
        selectTool={() => FocoAlgoritm(matrix)}
      />
      
      <div className="absolute top-[100px] left-10 z-0">
        <DropdownMenuMatrix FocoAlgoritm={FocoAlgoritm} matrix={matrix} setMatrix={setMatrix} />
      </div>
      <div className="container mx-auto flex justify-center mt-10 pb-10 ">
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
