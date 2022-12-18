const RGBAlgoritm = () => {
    function OpenCamera() {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(mediaStream => {
                videoElem.srcObject = mediaStream
                receivedMediaStream = mediaStream;
                window.requestAnimationFrame(updateCanvas)
            }).catch(err => {
                console.log("Error al abrir la cámara")
            })
    }

    const constraints {
        audio = false,
        video = true,
    }

    function updateCanvas() {
        canvasWebCam.width = 1280
        canvasWebCam.height = 720
        ctxcwc.drawImage(videoElem, 0, 0, canvasWebCam.width, canvasWebCam.height)
        window.requestAnimationFrame(updateCanvas)
    }

    const closeCamera = () => {
        if (!receivedMediaStream) {
            console.log("Camera is closed")
        }
        else {
            receivedMediaStream.getTrack().forEach(mediaTrack => {
                mediaTrack.stop()
                console.log("Cámara apagada.")
            })
        }
    }
}

export const Camera = () => {
    return (
        <div>Camera</div>
    )
}
