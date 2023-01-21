import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const LimpiezaAlgoritm = (matrixDimensions: number) => {
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

  var curFile = imagen1.files;

  if (!curFile.length) {
    return;
  }
  image1.src = window.URL.createObjectURL(curFile[0]);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;
    ctx1.drawImage(image1, 0, 0);
    limpieza();
  };

  function limpieza() {
    var image = new Image() as any;
    image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

    for (var i = 0; i < 10; i++) {
      erosion(image);
      dilatacion(image);
    }
  }

  function dilatacion(image: any) {
    var imageResult = new Image() as any;
    imageResult = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

    const resultPixels = imageResult.data;
    const pixels = image.data;
    const numPixels = image.width * image.height;

    const diference = Math.trunc(matrixDimensions / 2);

    for (var i = 0; i < numPixels; i++) {
      var flagZero = false;
      for (var m = 0; m < matrixDimensions; m++) {
        for (var n = 0; n < matrixDimensions; n++) {
          var index = i + image.width * (m - diference) + (n - diference);
          if (
            pixels[index * 4] == 0 ||
            pixels[index * 4 + 1] == 0 ||
            pixels[index * 4 + 2] == 0
          ) {
            flagZero = true;
            break;
          }
        }
      }
      if (flagZero) {
        paintPixel(resultPixels, i, 0);
      }
    }

    image = imageResult;

    canvas2.width = image.width;
    canvas2.height = image.height;
    ctx2.putImageData(imageResult, 0, 4);
  }

  function erosion(image: any) {
    var imageResult = new Image() as any;
    imageResult = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

    const resultPixels = imageResult.data;

    const pixels = image.data;
    const numPixels = image.width * image.height;

    const diference = Math.trunc(matrixDimensions / 2);

    for (var i = 0; i < numPixels; i++) {
      var suma = 0;
      for (var m = 0; m < matrixDimensions; m++) {
        for (var n = 0; n < matrixDimensions; n++) {
          var index = i + image.width * (m - diference) + (n - diference);
          if (
            pixels[index * 4] == 255 ||
            pixels[index * 4 + 1] == 255 ||
            pixels[index * 4 + 2] == 255
          ) {
            suma = suma + 255;
          }
        }
      }
      if (suma > 0) {
        paintPixel(resultPixels, i, 255);
      }
    }
    image = imageResult;

    canvas2.width = image.width;
    canvas2.height = image.height;
    ctx2.putImageData(imageResult, 0, 4);
  }

  function paintPixel(imageData: any, i: number, color: number) {
    imageData[i * 4] = color;
    imageData[i * 4 + 1] = color;
    imageData[i * 4 + 2] = color;
  }
};

export const Limpieza = () => {
  return (
    <div>
      <Input
        idInput="imagen1"
        selectTool={() => {
          LimpiezaAlgoritm(3);
        }}
      />

      <div className="container mx-auto flex justify-center">
        <ImageCard variantName={"Imagen Original"} target={0} />
        <input
          className="w-16 h-10 bg-purple-600 mx-4 rounded-xl text-center text-slate-50 text-3xl"
          type="number"
          min={3}
          max={35}
          step={2}
          defaultValue={3}
          onChange={(e) => LimpiezaAlgoritm(parseInt(e.target.value))}
        />
        <ImageCard variantName={"Imagen limpia"} target={1} />
      </div>
    </div>
  );
};
