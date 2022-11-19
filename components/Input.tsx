type InputProps = {
  selectTool: () => void;
  idInput: string;
};

export const Input = (props: InputProps) => {
  const { selectTool, idInput } = props;

  return (
    <button className="bg-rojo/80 hover:bg-rojo text-white fixed left-10 top-4 font-bold py-2 px-4 rounded h-11 w-36 cursor-pointer">
      Subir Imágen
      <input
        onChange={selectTool}
        className="h-11 w-36 absolute top-0 left-0 opacity-0 cursor-pointer"
        type="file"
        id={idInput}
        accept=".jpg, .jpeg, .png"
      />
    </button>
  );
};
