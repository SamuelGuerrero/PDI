import DropdownMenuMatrix from "./DropdownMenuMatrix";
import { ImageCard } from "./ImageCard";
import { Input } from "./Input";
import { NavigationMenuDemo } from "./NavigationMenuDemo";
import { useState } from "react";

const ConvolutionAlgoritm = (matrix: any) => {
  var canvas1 = document.getElementById(
    "canvasImagen1"
  ) as HTMLCanvasElement | null;
  var canvas2 = document.getElementById(
    "canvasImagen2"
  ) as HTMLCanvasElement | null;

  var image1 = new Image();
  var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

  var ctx1 = canvas1?.getContext("2d");
  var ctx2 = canvas2?.getContext("2d");
  var matrixMean = matrix.reduce((partialSum, a) => partialSum + a, 0);
  if (matrixMean == 0) matrixMean = 1;
  if (matrixMean < 0) matrixMean = Math.abs(matrixMean);

  var curFile = imagen1.files;

  if (!curFile.length) {
    return;
  }

  image1.src = window.URL.createObjectURL(curFile[0]);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;

    ctx1.drawImage(image1, 0, 0);
    convolucion();
  };

  function convolucion() {
    var image2 = new Image() as any;
    image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

    var image3 = new Image() as any;
    image3 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

    const initialPoint = Math.trunc(Math.sqrt(matrix.length) / 2);
    const pixels1 = image2.data;
    const pixels2 = image3.data;
    const numPixels = image2.width * image2.height;

    var i = initialPoint * image2.width + initialPoint;

    for (; i < numPixels; i++) {
      if (i % image2.width == 0) {
        i += 1;
      } else {
        const newCordenates = obtainCoordenates(i, image2);

        var R = productR(newCordenates, pixels1, matrix);
        var G = productG(newCordenates, pixels1, matrix);
        var B = productB(newCordenates, pixels1, matrix);

        R = R < 0 ? 0 : R;
        G = G < 0 ? 0 : G;
        B = B < 0 ? 0 : B;

        R = R > 255 ? 255 : R;
        G = G > 255 ? 255 : G;
        B = B > 255 ? 255 : B;

        if (R > 255 || G > 255 || B > 255) console.log(R, G, B);
        if (R < 0 || G < 0 || B < 0) console.log(R, G, B);

        pixels2[i * 4] = R;
        pixels2[i * 4 + 1] = G;
        pixels2[i * 4 + 2] = B;
      }
    }
    canvas2.width = image3.width;
    canvas2.height = image3.height;
    ctx2.putImageData(image3, 0, 4);
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
};

export const Convolucion = () => {
  const [matrix, setMatrix] = useState([0, 0, 0, 0, 1, 0, 0, 0, 0])

  return (
    <div>
      <Input
        idInput="imagen1"
        selectTool={() => {
          ConvolutionAlgoritm([0, 0, 0, 0, 1, 0, 0, 0, 0]);
        }}
      />

      <div className="absolute top-[100px] left-10 z-0">
        <DropdownMenuMatrix FocoAlgoritm={ConvolutionAlgoritm} matrix={matrix} setMatrix={setMatrix} />
      </div>


      <div className="container mx-auto flex justify-center">
        <div className="hidden w-0 h-0">
          <ImageCard variantName={'Imágen Original'} target={0} />
        </div>
        <ImageCard variantName={'Imágen con Convolución'} target={1} />
      </div>
    </div>
  );
};
