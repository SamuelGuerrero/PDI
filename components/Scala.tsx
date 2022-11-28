import { Input } from "../components/Input";
import React from "react";

const ScalaAlgoritm = (scala: number) => {
    var canvas1 = document.getElementById(
        "canvasImagen1"
    ) as HTMLCanvasElement | null;


    var image1 = new Image();
    var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

    var ctx1 = canvas1?.getContext("2d");

    var curFile = imagen1.files;
    image1.src = window.URL.createObjectURL(curFile[0]);
    image1.onload = function () {
        canvas1.width = image1.width;
        canvas1.height = image1.height;
        ctx1.drawImage(image1, 0, 0);
        Scala();
    };


    function Scala() {
        var image = new Image() as any;
        image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

        var imageResult = new Image() as any;
        imageResult = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

        const pixels = image.data;
        const numPixels = image.width * image.height;
        var res = imageResult.data;
        var height = image.height;
        var width = image.width;
        for (var k = 0; k < scala; k++) {
            for (var i = 0, j = 0; i < numPixels; j++, i = i + 2) {
                pixels[j * 4] = pixels[i * 4];
                pixels[j * 4 + 1] = pixels[i * 4 + 1];
                pixels[j * 4 + 2] = pixels[i * 4 + 2];
                if (i == image.width) {
                    i = i + image.width;
                }
            }
            res = pixels;
            height = height / 2;
            width = width / 2;
        }

        canvas1.width = width;
        canvas1.height = height;
        ctx1.putImageData(image, 0, 4);
    }
};

export const Scala = () => {
    return (
        <div className="h-screen">
            <Input idInput="imagen1" selectTool={() => ScalaAlgoritm(0)} />

            <div className="w-full flex flex-col items-center space-y-4">
                <div>
                    <input className="w-[400px]" type={"range"} min={0} max={4} defaultValue={0} onChange={(e) => ScalaAlgoritm(parseInt(e.target.value))} />
                </div>
                <div className="flex justify-between mx-auto">
                    <canvas className="w-auto" id={"canvasImagen1"}></canvas>
                </div>
            </div>
        </div>
    );
};