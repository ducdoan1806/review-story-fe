import { useEffect, useState } from "react";
import "../assets/css/detailImageProject.css";
import { useDispatch, useSelector } from "react-redux";
import { detailProjectImgApi } from "../features/projectImg/api";
import { useLocation } from "react-router-dom";
import { getLanguage, translateApi } from "../features/translation/api";
import { useDebounced } from "../utils/utils";

const DetailImageProject = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectLang, setSelectLang] = useState({
    slText: "en",
    slTranslate: "vi",
  });
  const location = useLocation();
  const projectId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { currentProject } = useSelector((state) => state.projectDetailImg);
  const { result: output } = useSelector((state) => state.translation);

  const { languages, loaded: loadedLanguages } = useSelector(
    (state) => state.language
  );
  const inputDebounced = useDebounced((input) => {
    dispatch(
      translateApi({
        text: input,
        from: selectLang.slText,
        lang: selectLang.slTranslate,
        project_id: currentProject?.id,
      })
    );
  }, 5000);
  const handleChangeInput = (e) => {
    inputDebounced(e.target.value);
  };
  const dispatch = useDispatch();
  const handleChangeLang = (e) => {
    setSelectLang({ ...selectLang, [e.target.name]: e.target.value });
  };
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
  useEffect(() => {
    dispatch(getLanguage());
  }, [dispatch]);
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
            <select
              name="slText"
              value={selectLang.slText}
              onChange={handleChangeLang}
            >
              {loadedLanguages &&
                languages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.language}
                  </option>
                ))}
            </select>
            <textarea
              name="text"
              id="text"
              rows={5}
              onChange={handleChangeInput}
            ></textarea>
          </div>
        </div>
        <div className="detailImageProject__box">
          <div className="detailImageProject__input">
            <label htmlFor="translate">Nội dung translate text:</label>
            <select
              name="slTranslate"
              value={selectLang.slTranslate}
              onChange={handleChangeLang}
            >
              {loadedLanguages &&
                languages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.language}
                  </option>
                ))}
            </select>
            <textarea
              name="translate"
              id="translate"
              rows={5}
              defaultValue={output?.translated_text ?? ""}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailImageProject;
