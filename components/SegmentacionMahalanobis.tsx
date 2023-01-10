import { Dispatch, SetStateAction, useState } from "react";

import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const SegmentacionMahalanobisAlgoritm = (
  setRgbPixel: Dispatch<
    SetStateAction<{
      R: number;
      G: number;
      B: number;
    }>
  >,
  threshold: number,
  setPixelSelected: Dispatch<
    SetStateAction<{
      X: number;
      Y: number;
    }>
  >,
  totalClicks: number,
  setTotalClicks: Dispatch<SetStateAction<number>>,
  coordenates: {
    x1: number;
    y1: number;
  },
  setCoordenates: Dispatch<
    SetStateAction<{
      x1: number;
      y1: number;
    }>
  >
) => {
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

  setTotalClicks(totalClicks + 1);
  // console.log(totalClicks);
  canvas1.addEventListener("click", manejadorRaton, false);
  image1.onload = function () {
    canvas1.width = image1.width;
    canvas1.height = image1.height;

    ctx1.drawImage(image1, 0, 0);
  };

  function segmentacion(relativeX: number, relativeY: number) {
    var image = new Image() as any;
    image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const pixels = image.data;
    const numPixels = image.width * image.height;

    //Aquí se pueden checar las coordenadas.

    if (coordenates.y1 < relativeY) {
      if (coordenates.x1 < relativeX) {
        var initialPoint = { x: coordenates.x1, y: coordenates.y1 };
        var endPoint = { x: relativeX, y: relativeY };
      } else {
        var initialPoint = { x: relativeX, y: coordenates.y1 };
        var endPoint = { x: coordenates.x1, y: relativeY };
      }
    } else {
      if (relativeX < coordenates.x1) {
        var initialPoint = { x: relativeX, y: relativeY };
        var endPoint = { x: coordenates.x1, y: coordenates.y1 };
      } else {
        var initialPoint = { x: coordenates.x1, y: relativeY };
        var endPoint = { x: relativeX, y: coordenates.y1 };
      }
    }

    var heightArea = 

    console.log(initialPoint);
    console.log(endPoint);
    setTotalClicks(0);

    for (var i = 0; i < numPixels; i++) {}

    canvas2.width = image.width;
    canvas2.height = image.height;
    ctx2.putImageData(image, 0, 4);
  }

  function manejadorRaton(e) {
    var relativeX =
      e.clientX - (canvas1.offsetLeft - Math.floor(window.scrollX));
    var relativeY =
      e.clientY - (canvas1.offsetTop - Math.floor(window.scrollY));
    setPixelSelected({ X: relativeX, Y: relativeY });
    if (totalClicks == 0) {
      setCoordenates({ ...coordenates, x1: relativeX, y1: relativeY });
    }
    if (totalClicks == 1) {
      segmentacion(relativeX, relativeY);
      setTotalClicks(0);
    }
  }
};

const variants = [
  {
    name: "Imágen Original",
  },
  {
    name: "Imágen segmentada",
  },
];

export const SegmentacionMahalanobis = () => {
  const [rgbPixel, setRgbPixel] = useState({ R: 0, G: 0, B: 0 });
  const [pixelSelected, setPixelSelected] = useState({ X: 0, Y: 0 });
  const [totalClicks, setTotalClicks] = useState(0);
  const [coordenates, setCoordenates] = useState({
    x1: 0,
    y1: 0,
  });

  return (
    <div>
      <Input
        idInput="imagen1"
        selectTool={() =>
          SegmentacionMahalanobisAlgoritm(
            setRgbPixel,
            100,
            setPixelSelected,
            totalClicks,
            setTotalClicks,
            coordenates,
            setCoordenates
          )
        }
      />

      <div
        className="w-10 h-10 border border-black mx-auto"
        style={{
          background: `rgb(${
            rgbPixel.R + "," + rgbPixel.G + "," + rgbPixel.B
          })`,
        }}
      />

      <div
        onClick={() =>
          SegmentacionMahalanobisAlgoritm(
            setRgbPixel,
            100,
            setPixelSelected,
            totalClicks,
            setTotalClicks,
            coordenates,
            setCoordenates
          )
        }
        className="container flex flex-col items-center space-y-5 mx-auto"
      >
        {variants.map((variant, target) => (
          <ImageCard key={target} variantName={variant.name} target={target} />
        ))}
      </div>
    </div>
  );
};
