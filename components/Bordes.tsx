import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const BordesAplicados = () => {
  var canvas1 = document.getElementById(
    "canvasImagen1"
  ) as HTMLCanvasElement | null;
  var canvas2 = document.getElementById(
    "canvasImagen2"
  ) as HTMLCanvasElement | null;
  var canvas3 = document.getElementById(
    "canvasImagen3"
  ) as HTMLCanvasElement | null;
  var canvas4 = document.getElementById(
    "canvasImagen4"
  ) as HTMLCanvasElement | null;

  var image1 = new Image();
  var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

  var ctx1 = canvas1?.getContext("2d");
  var ctx2 = canvas2?.getContext("2d");
  var ctx3 = canvas3?.getContext("2d");
  var ctx4 = canvas4?.getContext("2d");

  var curFile = imagen1.files;

  if (!curFile.length) {
    return;
  }
  image1.src = window.URL.createObjectURL(curFile[0]);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;

    ctx1.drawImage(image1, 0, 0);
    bordes();
  };

  function bordes() {
    bordesVerticales();
    bordesHorizontales();
    bordesCombinados();
  }

  function bordesVerticales() {
    var image2 = new Image() as any;
    image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const pixels = image2.data;
    const numPixels = image2.width * image2.height;
    for (var i = 0; i < numPixels; i++) {
      var r = Math.abs(pixels[i * 4] - pixels[i * 4 + 4]);
      var g = Math.abs(pixels[i * 4 + 1] - pixels[i * 4 + 4 + 1]);
      var b = Math.abs(pixels[i * 4 + 2] - pixels[i * 4 + 4 + 2]);

      pixels[i * 4] = r;
      pixels[i * 4 + 1] = g;
      pixels[i * 4 + 2] = b;
    }
    canvas2.width = image2.width;
    canvas2.height = image2.height;
    ctx2.putImageData(image2, 0, 4);
  }

  function bordesHorizontales() {
    var image2 = new Image() as any;
    image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const pixels = image2.data;
    const numPixels = image2.width * image2.height;
    for (var i = 0; i < numPixels; i++) {
      var r = Math.abs(pixels[i * 4] - pixels[i * 4 + image2.width * 4]);
      var g = Math.abs(
        pixels[i * 4 + 1] - pixels[i * 4 + image2.width * 4 + 1]
      );
      var b = Math.abs(
        pixels[i * 4 + 2] - pixels[i * 4 + image2.width * 4 + 2]
      );

      pixels[i * 4] = r;
      pixels[i * 4 + 1] = g;
      pixels[i * 4 + 2] = b;
    }
    canvas3.width = image2.width;
    canvas3.height = image2.height;
    ctx3.putImageData(image2, 0, 4);
  }

  function bordesCombinados() {
    var image2 = new Image() as any;
    image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const pixels = image2.data;
    const numPixels = image2.width * image2.height;
    for (var i = 0; i < numPixels; i++) {
      var r1 = Math.abs(pixels[i * 4] - pixels[i * 4 + 4]);
      var g1 = Math.abs(pixels[i * 4 + 1] - pixels[i * 4 + 4 + 1]);
      var b1 = Math.abs(pixels[i * 4 + 2] + -pixels[i * 4 + 4 + 2]);

      var r2 = Math.abs(pixels[i * 4] - pixels[i * 4 + image2.width * 4]);
      var g2 = Math.abs(
        pixels[i * 4 + 1] - pixels[i * 4 + image2.width * 4 + 1]
      );
      var b2 = Math.abs(
        pixels[i * 4 + 2] - pixels[i * 4 + image2.width * 4 + 2]
      );

      pixels[i * 4] = Math.max(r1, r2);
      pixels[i * 4 + 1] = Math.max(g1, g2);
      pixels[i * 4 + 2] = Math.max(b1, b2);
    }
    canvas4.width = image2.width;
    canvas4.height = image2.height;
    ctx4.putImageData(image2, 0, 4);
  }
};

const variants = [
  {
    name: "Imágen Original",
  },
  {
    name: "Bordes Verticales",
  },
  {
    name: "Bordes Horizontales",
  },
  {
    name: "Bordes Mezclados",
  },
];

export const Bordes = () => {
  return (
    <div>
      <Input idInput="imagen1" selectTool={BordesAplicados} />

      <div className="container mx-auto grid grid-cols-2 gap-y-10 place-items-center mb-10">
        {variants.map((variant, target) => (
          <ImageCard variantName={variant.name} target={target} />
        ))}
      </div>
    </div>
  );
};
