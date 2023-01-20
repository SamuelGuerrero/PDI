import { Input } from "./Input";

const RellenoAlgoritm = () => {
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

  canvas1.addEventListener("click", manejadorRaton, false);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;

    ctx1.drawImage(image1, 0, 0);
  };

  function relleno(relativeX: number, relativeY: number) {
    var image = new Image() as any;
    image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

    const pixels = image.data;
    const numPixels = image.width * image.height;

    var stack = [];
    var iAux = relativeY * image.width + relativeX;
    stack.push(iAux);
    
    while (stack.length) {
      var point = stack.pop();
      if (pixels[point * 4] != 0) {
        paintPixel(pixels, point, 0);

        if (point - 1 > 0 && point - 1 < numPixels) {
          stack.push(point - 1);
        }
        if (point + 1 > 0 && point + 1 < numPixels) {
          stack.push(point + 1);
        }
        if (point - image.width > 0 && point - image.width < numPixels) {
          stack.push(point - image.width);
        }
        if (point + image.width > 0 && point + image.width < numPixels) {
          stack.push(point + image.width);
        }
      }
    }

    canvas2.width = image.width;
    canvas2.height = image.height;
    ctx2.putImageData(image, 0, 4);
  }

  function manejadorRaton(e) {
    var relativeX =
      e.clientX - (canvas1.offsetLeft - Math.floor(window.scrollX));
    var relativeY =
      e.clientY - (canvas1.offsetTop - Math.floor(window.scrollY));
    relleno(relativeX, relativeY);
  }

  function paintPixel(imageData: any, i: number, color: number) {
    imageData[i * 4] = color;
    imageData[i * 4 + 1] = color;
    imageData[i * 4 + 2] = color;
  }
};

export const Relleno = () => {
  return (
    <div>
      <Input
        idInput="imagen1"
        selectTool={() => {
          RellenoAlgoritm();
        }}
      />

      <div className="container mx-auto space-x-7 flex justify-center">
        <canvas className="rounded-md" id={"canvasImagen1"}></canvas>
        <canvas className="rounded-md" id={"canvasImagen2"}></canvas>
      </div>
    </div>
  );
};
