import PropTypes from "prop-types";

function TextFileOutput({ text }) {
  return (
    <div className="h-1239 w-full overflow-auto rounded-md bg-black shadow-md">
      <div
        className="w-300 whitespace-pre-wrap p-4 font-sans text-base leading-5 shadow-md"
        style={{ fontFamily: "Menlo, 'Courier New', monospace" }}
      >
        {text}
      </div>
    </div>
  );
}

TextFileOutput.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextFileOutput;
