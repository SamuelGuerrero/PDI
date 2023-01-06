import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const RGBAlgoritm = () => {
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
  image1.src = window.URL.createObjectURL(curFile[0]);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;

    ctx1.drawImage(image1, 0, 0);
    RGBChannels();
  };

  function RGBChannels() {
    BlueChannel();
    bordesHorizontales();
    bordesCombinados();
  }

  function BlueChannel() {
    var image2 = new Image() as any;
    image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const pixels = image2.data;
    const numPixels = image2.width * image2.height;
    for (var i = 0; i < numPixels; i++) {
      pixels[i * 4] = 0;
      pixels[i * 4 + 1] = 0;
      pixels[i * 4 + 2] = pixels[i * 4 + 2];
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
      pixels[i * 4] = 0;
      pixels[i * 4 + 1] = pixels[i * 4 + 1];
      pixels[i * 4 + 2] = 0;
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
      pixels[i * 4] = pixels[i * 4];
      pixels[i * 4 + 1] = 0;
      pixels[i * 4 + 2] = 0;
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
];

export const VideoCamara = () => {
  return (
    <div>
      <Input idInput="imagen1" selectTool={VideoCamara} />
      <video id='video' width={"600"} height={"300"} autoPlay playsInline>
      </video>
    </div>
  );
};
