import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const EsqueletoAlgoritm = (matrixDimensions: number) => {
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
    esqueleto();
  };

  function esqueleto() {
    var image = new Image() as any;
    image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

    var imageResult = new Image() as any;
    imageResult = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const resultPixels = imageResult.data;

    const pixels = image.data;
    const numPixels = image.width * image.height;

    const diference = Math.trunc(matrixDimensions / 2);
    console.log(diference);

    for (var i = 0; i < numPixels; i++) {
      var flagOne = true;
      var suma = 0;
      for (var m = 0; m < matrixDimensions; m++) {
        for (var n = 0; n < matrixDimensions; n++) {
          var index = i + image.width * (m - diference) + (n - diference);
          if (
            pixels[index * 4] == 255 ||
            pixels[index * 4 + 1] == 255 ||
            pixels[index * 4 + 2] == 255
          ) {
            flagOne = false;
            break
          }
        }
      }
      if (flagOne) {
        paintPixel(resultPixels, i, 255);
      }
    }

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

export const Esqueleto = () => {
  return (
    <div>
      <Input
        idInput="imagen1"
        selectTool={() => {
          EsqueletoAlgoritm(3);
        }}
      />

      <div className="container mx-auto flex justify-center">
        <ImageCard variantName={"Imagen Original"} target={0} />
        <input
          className="w-16 h-10 bg-purple-600 mx-4 rounded-xl text-center text-slate-50 text-3xl"
          type="number"
          min={3}
          step={2}
          defaultValue={3}
          onChange={(e) => EsqueletoAlgoritm(parseInt(e.target.value))}
        />
        <ImageCard variantName={"Imagen Esqueleto"} target={1} />
      </div>
    </div>
  );
};
