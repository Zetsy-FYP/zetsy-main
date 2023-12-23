/* eslint-disable react/prop-types */
import "./fileUploader.scss";
const FileUploader = ({
  label,
  images,
  MAX_COUNT,
  setFileLimit,
  setImages,
  fileLimit,
}) => {
  const handleUploadFiles = (files) => {
    const uploaded = [...images];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setImages(uploaded);
  };

  const handleFileEvent = (e) => {
    /**
     *@dev convert objects of files to array
     */
    const choosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(choosenFiles);
  };

  console.log(images);

  return (
    <>
      <input
        type="file"
        id="fileElem"
        name={"images"}
        style={{
          position: "absolute",
          height: "1px",
          width: "1px",
          overflow: "hidden",
          clip: "rect(1px, 1px, 1px, 1px)",
        }}
        onChange={handleFileEvent}
        disabled={fileLimit}
      />
      <label htmlFor={"fileElem"}>
        <a>{label}</a>
      </label>
    </>
  );
};

export default FileUploader;
