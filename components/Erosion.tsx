import { ImageCard } from "./ImageCard";
import { Input } from "./Input";
import { zeros } from "mathjs";

const ErosionAlgoritm = (matrixDimensions: number) => {
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
    erosion();
  };

  function erosion() {
    var image = new Image() as any;
    image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const pixels = image.data;
    const numPixels = image.width * image.height;

    var matrix = zeros([matrixDimensions, matrixDimensions]);

    const diference = Math.trunc(matrixDimensions / 2);
    console.log(diference);

    for (var i = 0; i < numPixels; i++) {
      for (var m = 0; m < matrixDimensions; m++) {
        for (var n = 0; n < matrixDimensions; n++) {
          var index = i + image.width * (diference) + (n - diference);
          // var save = pixels[]
        }
      }
    }
  }
};

export const Erosion = () => {
  return (
    <div>
      <Input
        idInput="imagen1"
        selectTool={() => {
          ErosionAlgoritm(3);
        }}
      />

      <div className="container mx-auto flex justify-center">
        <ImageCard variantName={"Imagen Original"} target={0} />=
        <ImageCard variantName={"Imagen con Erosion"} target={1} />
      </div>
    </div>
  );
};
