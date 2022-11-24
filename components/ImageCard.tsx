type ImageCardProps = {
  target: number;
  variantName: string;
};

export const ImageCard = (props: ImageCardProps) => {
  const { target, variantName } = props;

  return (
    <div
      className="max-w-[800px] bg-[#fffaeb] mb-10 rounded-lg border border-gray-200 shadow-slate-700 shadow-2xl dark:bg-gray-800 dark:border-gray-700"
      key={target}
    >
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            {variantName}
          </h5>
        </a>
      </div>
      <canvas
        className="w-full rounded-md"
        id={"canvasImagen" + (target + 1).toString()}
      ></canvas>
    </div>
  );
};
