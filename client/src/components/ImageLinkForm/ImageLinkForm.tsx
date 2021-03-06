import "./ImageLinkForm.css";

interface Props {
  input: string;
  updateInput: (value: string) => void;
  onButtonSubmit: () => void;
}

const Imagelinkform: React.FC<Props> = ({
  input,
  updateInput,
  onButtonSubmit,
}) => {
  return (
    <div>
      <p className="f3 center">
        {"This magic brain will detect faces in your pictures. Give it a try"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="tex"
            placeholder="Input a url to an image"
            value={input}
            onChange={({ target }) => updateInput(target.value)}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Imagelinkform;
