import { useEffect, useState } from "react";
import "../assets/css/detailImageProject.css";
import { useDispatch, useSelector } from "react-redux";
import { detailProjectImgApi } from "../features/projectImg/api";
import { useLocation } from "react-router-dom";

const DetailImageProject = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const location = useLocation();
  const projectId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { currentProject } = useSelector((state) => state.projectDetailImg);

  const dispatch = useDispatch();
  const handleChangeImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };
  const handleRemoveImage = (index) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setImages(updatedFiles);
    setPreviewImages(updatedPreviews);
  };
  useEffect(() => {
    dispatch(detailProjectImgApi(projectId));
  }, [dispatch, projectId]);
  return (
    <div className="detailImageProject flex flex-col gap-3">
      <div>
        <span className="text-lg font-semibold mb-1 block">
          {currentProject?.title || "--"}
        </span>
        {currentProject?.description && (
          <p>{currentProject?.description || "--"}</p>
        )}
      </div>
      <div className="detailImageProject__box">
        <div className="text-base mb-3 font-semibold">Tải ảnh:</div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChangeImages}
        />
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {previewImages.map((src, index) => (
            <div className="relative w-28 overflow-hidden" key={index}>
              <img
                className="block"
                width={200}
                height={200}
                src={src}
                alt={`Preview ${index}`}
              />
              <button
                className="absolute right-1 top-1 text-xs font-semibold rounded-full w-4 h-4 bg-white text-black"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 items-start">
        <div className="detailImageProject__box">
          <div className="detailImageProject__input">
            <label htmlFor="text">Nhập nội dung text:</label>
            <select name="slText">
              <option>English</option>
              <optgroup label="Alaskan/Hawaiian Time Zone">
                <option value="AK">Alaska</option>
                <option value="HI">Hawaii</option>
              </optgroup>
              <optgroup label="Pacific Time Zone">
                <option value="CA">California</option>
                <option value="NV">Nevada</option>
                <option value="OR">Oregon</option>
                <option value="WA">Washington</option>
              </optgroup>
            </select>
            <textarea name="text" id="text" rows={5}></textarea>
          </div>
        </div>
        <div className="detailImageProject__box">
          <div className="detailImageProject__input">
            <label htmlFor="translate">Nội dung translate text:</label>
            <select name="slTranslate">
              <option>English</option>
              <optgroup label="Alaskan/Hawaiian Time Zone">
                <option value="AK">Alaska</option>
                <option value="HI">Hawaii</option>
              </optgroup>
              <optgroup label="Pacific Time Zone">
                <option value="CA">California</option>
                <option value="NV">Nevada</option>
                <option value="OR">Oregon</option>
                <option value="WA">Washington</option>
              </optgroup>
            </select>
            <textarea name="translate" id="translate" rows={5}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailImageProject;
