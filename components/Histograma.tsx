import { Dispatch, SetStateAction, useState } from "react";

import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const BordesAplicados = (setRedChannel: Dispatch<SetStateAction<any[]>>, setGreenChannel: Dispatch<SetStateAction<any[]>>, setBlueChannel: Dispatch<SetStateAction<any[]>>,) => {
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
        histograma();
    };

    function histograma() {

        var redChannelValues = new Array(256).fill(0)
        var greenChannelValues = new Array(256).fill(0)
        var blueChannelValues = new Array(256).fill(0)

        var image = new Image() as any;
        image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        const pixels = image.data;
        const numPixels = image.width * image.height;

        for (var i = 0; i < numPixels; i++) {
            redChannelValues[pixels[i * 4]] += 1;
            greenChannelValues[pixels[i * 4 + 1]] += 1;
            blueChannelValues[pixels[i * 4 + 2]] += 1;
        }

        var maxR = 0, maxG = 0, maxB = 0;

        for (i = 0; i < redChannelValues.length; i++)
            maxR = redChannelValues[i] > maxR ? redChannelValues[i] : maxR

        for (i = 0; i < greenChannelValues.length; i++)
            maxG = greenChannelValues[i] > maxG ? greenChannelValues[i] : maxG

        for (i = 0; i < blueChannelValues.length; i++)
            maxB = blueChannelValues[i] > maxB ? blueChannelValues[i] : maxB



        for (i = 0; i < redChannelValues.length; i++) {
            redChannelValues[i] = Math.trunc((redChannelValues[i] * 400) / maxR)
        }

        for (i = 0; i < greenChannelValues.length; i++) {
            greenChannelValues[i] = Math.trunc((greenChannelValues[i] * 400) / maxG)
        }

        for (i = 0; i < blueChannelValues.length; i++) {
            blueChannelValues[i] = Math.trunc((blueChannelValues[i] * 400) / maxB)
        }

        setRedChannel(redChannelValues)
        setGreenChannel(greenChannelValues)
        setBlueChannel(blueChannelValues)
    }

};

const variants = [
    {
        name: "Imágen Original",
    },
];

export const Histograma = () => {
    const [redChannel, setRedChannel] = useState<any[]>([0])
    const [blueChannel, setBlueChannel] = useState<any[]>([0])
    const [greenChannel, setGreenChannel] = useState<any[]>([0])

    return (
        <div>
            <Input idInput="imagen1" selectTool={() => BordesAplicados(setRedChannel, setBlueChannel, setGreenChannel)} />

            <div className="container flex justify-center mb-5 mx-auto">
                {variants.map((variant, target) => (
                    <ImageCard variantName={variant.name} target={target} />
                ))}
            </div>

            <div className="w-full flex pb-5">

                <div className="flex flex-col bg-[#fffaeb] shadow-red-600 shadow-2xl w-min mx-auto ">
                    <h1 className="text-center font-ramptartOne text-red-600 text-4xl">Red</h1>
                    <div className="flex justify-center items-baseline">
                        {redChannel.map((el, i) => (
                            <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-red-600" key={i} />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col bg-[#fffaeb] shadow-green-800 shadow-2xl w-min mx-auto">
                    <h1 className="text-center font-ramptartOne text-green-800 text-4xl">Green</h1>
                    <div className="flex justify-center items-baseline">
                        {greenChannel.map((el, i) => (
                            <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-green-800" key={i} />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col bg-[#fffaeb] shadow-blue-700 shadow-2xl w-min mx-auto">
                    <h1 className="text-center font-ramptartOne text-blue-700 text-4xl">Blue</h1>
                    <div className="flex justify-center items-baseline">
                        {blueChannel.map((el, i) => (
                            <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-blue-700" key={i} />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};
