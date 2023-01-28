import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const Mouse = () => {

  var canvas = document.getElementById(
    "canvasImagen1"
  ) as HTMLCanvasElement | null;

  var image1 = new Image();
  var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

  var ctx1 = canvas?.getContext("2d");

  var curFile = imagen1.files;
  image1.src = window.URL.createObjectURL(curFile[0]);
  image1.onload = function () {
    canvas.width = image1.width;
    canvas.height = image1.height;
    ctx1.drawImage(image1, 0, 0);
    canvas.addEventListener('mousemove', manejadorRaton, false);
  };

  function manejadorRaton(e) {
    var relativeX = e.clientx - canvas.offsetLeft
    var relativeY = e.clienty - canvas.offsetTop
    console.log(relativeX, relativeY)
  }
}

const OperadoresAlgoritm = () => {
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
  var canvas5 = document.getElementById(
    "canvasImagen5"
  ) as HTMLCanvasElement | null;
  var canvas6 = document.getElementById(
    "canvasImagen6"
  ) as HTMLCanvasElement | null;
  var canvas7 = document.getElementById(
    "canvasImagen7"
  ) as HTMLCanvasElement | null;

  var image1 = new Image();
  var image2 = new Image();
  var imagen1 = document.getElementById("imagen1") as HTMLInputElement;
  var imagen2 = document.getElementById("imagen2") as HTMLInputElement;

  var ctx1 = canvas1?.getContext("2d");
  var ctx2 = canvas2?.getContext("2d");
  var ctx3 = canvas3?.getContext("2d");
  var ctx4 = canvas4?.getContext("2d");
  var ctx5 = canvas5?.getContext("2d");
  var ctx6 = canvas6?.getContext("2d");
  var ctx7 = canvas7?.getContext("2d");

  canvas1.addEventListener('mousemove', manejadorRaton, false);

  var curFile = imagen1.files;
  image1.src = window.URL.createObjectURL(curFile[0]);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;
    ctx1.drawImage(image1, 0, 0);

    var curFile2 = imagen2.files;
    if (curFile2.length != 0) {
      image2.src = window.URL.createObjectURL(curFile2[0]);
      image2.onload = function () {
        canvas2.width = image2.width;
        canvas2.height = image2.height;
        ctx2.drawImage(image2, 0, 0);
        Operadores();
      };
    }
  };

  function Operadores() {
    AND();
    OR();
    XOR();
    NOT1();
    NOT2();
  }

  function manejadorRaton(e) {
    var relativeX = e.clientX - canvas1.offsetLeft;
    var relativeY = e.clientY - canvas1.offsetTop;
    console.log(relativeX, relativeY);
  }

  function AND() {
    var firstImage = new Image() as any;
    var secondImage = new Image() as any;
    firstImage = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    secondImage = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    const pixels1 = firstImage.data;
    const pixels2 = secondImage.data;
    const numPixels = firstImage.width * firstImage.height;
    for (var i = 0; i < numPixels; i++) {
      pixels1[i * 4] = pixels1[i * 4] & pixels2[i * 4];
      pixels1[i * 4 + 1] = pixels1[i * 4 + 1] & pixels2[i * 4 + 1];
      pixels1[i * 4 + 2] = pixels1[i * 4 + 2] & pixels2[i * 4 + 2];
    }
    canvas3.width = firstImage.width;
    canvas3.height = firstImage.height;
    ctx3.putImageData(firstImage, 0, 4);
  }

  function OR() {
    var firstImage = new Image() as any;
    var secondImage = new Image() as any;
    firstImage = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    secondImage = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    const pixels1 = firstImage.data;
    const pixels2 = secondImage.data;
    const numPixels = firstImage.width * firstImage.height;
    for (var i = 0; i < numPixels; i++) {
      pixels1[i * 4] = pixels1[i * 4] | pixels2[i * 4];
      pixels1[i * 4 + 1] = pixels1[i * 4 + 1] | pixels2[i * 4 + 1];
      pixels1[i * 4 + 2] = pixels1[i * 4 + 2] | pixels2[i * 4 + 2];
    }
    canvas4.width = firstImage.width;
    canvas4.height = firstImage.height;
    ctx4.putImageData(firstImage, 0, 4);
  }

  function XOR() {
    var firstImage = new Image() as any;
    var secondImage = new Image() as any;
    firstImage = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    secondImage = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    const pixels1 = firstImage.data;
    const pixels2 = secondImage.data;
    const numPixels = firstImage.width * firstImage.height;
    for (var i = 0; i < numPixels; i++) {
      pixels1[i * 4] = pixels1[i * 4] ^ pixels2[i * 4];
      pixels1[i * 4 + 1] = pixels1[i * 4 + 1] ^ pixels2[i * 4 + 1];
      pixels1[i * 4 + 2] = pixels1[i * 4 + 2] ^ pixels2[i * 4 + 2];
    }
    canvas5.width = firstImage.width;
    canvas5.height = firstImage.height;
    ctx5.putImageData(firstImage, 0, 4);
  }

  function NOT1() {
    var image = new Image() as any;
    image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const pixels = image.data;
    const numPixels = image.width * image.height;
    for (var i = 0; i < numPixels; i++) {
      pixels[i * 4] = Math.abs(255 - pixels[i * 4]);
      pixels[i * 4 + 1] = Math.abs(255 - pixels[i * 4 + 1]);
      pixels[i * 4 + 2] = Math.abs(255 - pixels[i * 4 + 2]);
    }
    canvas6.width = image.width;
    canvas6.height = image.height;
    ctx6.putImageData(image, 0, 4);
  }

  function NOT2() {
    var image = new Image() as any;
    image = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    const pixels = image.data;
    const numPixels = image.width * image.height;
    for (var i = 0; i < numPixels; i++) {
      pixels[i * 4] = Math.abs(255 - pixels[i * 4]);
      pixels[i * 4 + 1] = Math.abs(255 - pixels[i * 4 + 1]);
      pixels[i * 4 + 2] = Math.abs(255 - pixels[i * 4 + 2]);
    }
    canvas7.width = image.width;
    canvas7.height = image.height;
    ctx7.putImageData(image, 0, 4);
  }
};

const variants = [
  {
    name: "Primera Imágen",
  },
  {
    name: "Segunda Imágen",
  },
  {
    name: "AND",
  },
  {
    name: "OR",
  },
  {
    name: "XOR",
  },
  {
    name: "NOT Primera Imágen",
  },
  {
    name: "NOT Segunda Imágen",
  },
];

export const Operadores = () => {
  return (
    <div>
      <Input idInput="imagen1" selectTool={OperadoresAlgoritm} />

      <button className="bg-slate-700 z-50 hover:bg-rojo text-white fixed left-[200px] top-4 font-bold py-2 px-4 rounded h-11 w-36 cursor-pointer">
        Subir Imágen
        <input
          onChange={OperadoresAlgoritm}
          className="h-11 w-36 absolute top-0 left-0 opacity-0 cursor-pointer"
          type="file"
          id="imagen2"
          accept=".jpg, .jpeg, .png"
        />
      </button>

      <div className="container flex flex-col items-center mx-auto">
        {variants.map((variant, target) => (
          <ImageCard key={target} variantName={variant.name} target={target} />
        ))}
      </div>
    </div>
  );
};
