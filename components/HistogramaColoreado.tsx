import { Dispatch, SetStateAction, useState } from "react";

import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const HistogramaAlgoritm = (setRedChannel: Dispatch<SetStateAction<any[]>>, setGreenChannel: Dispatch<SetStateAction<any[]>>, setBlueChannel: Dispatch<SetStateAction<any[]>>,
    setPixelsRange: Dispatch<SetStateAction<{
        start: number;
        end: number;
    }>>, initialPoint: number, endPoint: number) => {
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
        ctx1.drawImage(image1, 0, 4);
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

        canvas2.width = canvas1.width;
        canvas2.height = canvas1.height;

        /* */
        for (var i = 0; i < numPixels; i++) {
            redChannelValues[pixels[i * 4]] += 1;
            greenChannelValues[pixels[i * 4 + 1]] += 1;
            blueChannelValues[pixels[i * 4 + 2]] += 1;
        }

        var maxR = Math.max(...redChannelValues)
        var maxG = Math.max(...greenChannelValues)
        var maxB = Math.max(...blueChannelValues);

        for (i = 0; i < redChannelValues.length; i++) {
            redChannelValues[i] = Math.trunc((redChannelValues[i] * 400) / maxR)
            greenChannelValues[i] = Math.trunc((greenChannelValues[i] * 400) / maxG)
            blueChannelValues[i] = Math.trunc((blueChannelValues[i] * 400) / maxB)
        }

        setRedChannel(redChannelValues)
        setGreenChannel(greenChannelValues)
        setBlueChannel(blueChannelValues)
        /* */

        var changePixelsRed = []
        var changePixelsGreen = []
        var changePixelsBlue = []

        for (var i = 0; i < numPixels; i++) {
            if ((pixels[i * 4] <= initialPoint) || (pixels[i * 4] >= endPoint))
                changePixelsRed.push(i)
            if ((pixels[i * 4 + 1] <= initialPoint) || (pixels[i * 4 + 1] >= endPoint))
                changePixelsGreen.push(i)
            if ((pixels[i * 4 + 2] <= initialPoint) || (pixels[i * 4 + 2] >= endPoint))
                changePixelsBlue.push(i)
        }


        for (i = 0; i < changePixelsRed.length; i++) {
            if (((pixels[changePixelsRed[i] * 4]) < initialPoint) || ((pixels[changePixelsRed[i] * 4]) > endPoint)) {
                pixels[changePixelsRed[i] * 4] = (pixels[changePixelsRed[i] * 4] + pixels[changePixelsRed[i] * 4 + 1] + pixels[changePixelsRed[i] * 4 + 2]) / 3
                pixels[changePixelsRed[i] * 4 + 1] = (pixels[changePixelsRed[i] * 4] + pixels[changePixelsRed[i] * 4 + 1] + pixels[changePixelsRed[i] * 4 + 2]) / 3
                pixels[changePixelsRed[i] * 4 + 2] = (pixels[changePixelsRed[i] * 4] + pixels[changePixelsRed[i] * 4 + 1] + pixels[changePixelsRed[i] * 4 + 2]) / 3
            }
        }

        for (i = 0; i < changePixelsGreen.length; i++) {
            if (((pixels[changePixelsGreen[i] * 4 + 1]) < initialPoint) || ((pixels[changePixelsGreen[i] * 4 + 1]) > endPoint)) {
                pixels[changePixelsGreen[i] * 4] = (pixels[changePixelsGreen[i] * 4] + pixels[changePixelsGreen[i] * 4 + 1] + pixels[changePixelsGreen[i] * 4 + 2]) / 3
                pixels[changePixelsGreen[i] * 4 + 1] = (pixels[changePixelsGreen[i] * 4] + pixels[changePixelsGreen[i] * 4 + 1] + pixels[changePixelsGreen[i] * 4 + 2]) / 3
                pixels[changePixelsGreen[i] * 4 + 2] = (pixels[changePixelsGreen[i] * 4] + pixels[changePixelsGreen[i] * 4 + 1] + pixels[changePixelsGreen[i] * 4 + 2]) / 3
            }
        }


        for (i = 0; i < changePixelsBlue.length; i++) {
            if (((pixels[changePixelsBlue[i] * 4 + 2]) < initialPoint) || ((pixels[changePixelsBlue[i] * 4 + 2]) > endPoint)) {
                pixels[changePixelsBlue[i] * 4] = (pixels[changePixelsBlue[i] * 4] + pixels[changePixelsBlue[i] * 4 + 1] + pixels[changePixelsBlue[i] * 4 + 2]) / 3
                pixels[changePixelsBlue[i] * 4 + 1] = (pixels[changePixelsBlue[i] * 4] + pixels[changePixelsBlue[i] * 4 + 1] + pixels[changePixelsBlue[i] * 4 + 2]) / 3
                pixels[changePixelsBlue[i] * 4 + 2] = (pixels[changePixelsBlue[i] * 4] + pixels[changePixelsBlue[i] * 4 + 1] + pixels[changePixelsBlue[i] * 4 + 2]) / 3
            }
        }

        ctx2.putImageData(image, 0, 0);
    }
};


export const HistogramaColoreado = () => {
    const [redChannel, setRedChannel] = useState<any[]>([0])
    const [blueChannel, setBlueChannel] = useState<any[]>([0])
    const [greenChannel, setGreenChannel] = useState<any[]>([0])
    const [pixelsRange, setPixelsRange] = useState({ start: -1, end: -1 })

    return (
        <div>
            <Input idInput="imagen1" selectTool={() => HistogramaAlgoritm(setRedChannel, setBlueChannel, setGreenChannel, setPixelsRange, 0, 0)} />

            <div className="container mx-auto flex space-x-5 justify-center">

                <div className="hidden">
                    <ImageCard variantName={"Imagen Original"} target={0} />
                </div>

                <ImageCard variantName={"Imagen"} target={1} />
            </div>
            {
                redChannel.length > 1 && (
                    <div className="w-full flex flex-col items-center space-y-2 pb-5">
                        <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded h-11 w-36 cursor-pointer" onClick={() => { setPixelsRange({ start: -1, end: -1 }); HistogramaAlgoritm(setRedChannel, setBlueChannel, setGreenChannel, setPixelsRange, 0, 0) }}>Reiniciar</button>
                        <div className="flex flex-col bg-[#fffaeb] shadow-black shadow-2xl w-min mx-auto ">
                            <h1 className="text-center font-ramptartOne text-4xl">Histograma</h1>
                            <div className="flex justify-center items-baseline">
                                {redChannel.map((el, i) => (
                                    <button onClick={() => {
                                        if (pixelsRange.start < 0) {
                                            setPixelsRange({ ...pixelsRange, start: i })
                                            return
                                        }
                                        if (pixelsRange.start >= 0)
                                            setPixelsRange({ ...pixelsRange, end: i })

                                        HistogramaAlgoritm(setRedChannel, setBlueChannel, setGreenChannel, setPixelsRange, pixelsRange.start, i)
                                    }}
                                        style={{ height: (el * 0.5) }}
                                        className={`w-[5px] hover:w-[15px] border border-black hover:cursor-pointer bottom-0 ${i == pixelsRange.start ? 'bg-yellow-400' : ((pixelsRange.end >= i) && ((pixelsRange.start <= i))) ? 'bg-yellow-400' : 'bg-red-600'}`} key={i} />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col bg-[#fffaeb] shadow-black shadow-2xl w-min mx-auto ">
                            <h1 className="text-center font-ramptartOne text-4xl">Histograma</h1>
                            <div className="flex justify-center items-baseline">
                                {greenChannel.map((el, i) => (
                                    <button onClick={() => {
                                        if (pixelsRange.start < 0) {
                                            setPixelsRange({ ...pixelsRange, start: i })
                                            return
                                        }
                                        if (pixelsRange.start > 0)
                                            setPixelsRange({ ...pixelsRange, end: i })

                                        HistogramaAlgoritm(setRedChannel, setBlueChannel, setGreenChannel, setPixelsRange, pixelsRange.start, i)
                                    }}
                                        style={{ height: (el * 0.5) }}
                                        className={`w-[5px] hover:w-[15px] border border-black hover:cursor-pointer bottom-0 ${i == pixelsRange.start ? 'bg-yellow-400' : ((pixelsRange.end >= i) && ((pixelsRange.start <= i))) ? 'bg-yellow-400' : 'bg-green-800'}`} key={i} />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col bg-[#fffaeb] shadow-black shadow-2xl w-min mx-auto ">
                            <h1 className="text-center font-ramptartOne text-4xl">Histograma</h1>
                            <div className="flex justify-center items-baseline">
                                {blueChannel.map((el, i) => (
                                    <button onClick={() => {
                                        if (pixelsRange.start < 0) {
                                            setPixelsRange({ ...pixelsRange, start: i })
                                            return
                                        }
                                        if (pixelsRange.start > 0)
                                            setPixelsRange({ ...pixelsRange, end: i })

                                        HistogramaAlgoritm(setRedChannel, setBlueChannel, setGreenChannel, setPixelsRange, pixelsRange.start, i)
                                    }}
                                        style={{ height: (el * 0.5) }}
                                        className={`w-[5px] hover:w-[15px] border border-black hover:cursor-pointer bottom-0 ${i == pixelsRange.start ? 'bg-yellow-400' : ((pixelsRange.end >= i) && ((pixelsRange.start <= i))) ? 'bg-yellow-400' : 'bg-blue-700'}`} key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
