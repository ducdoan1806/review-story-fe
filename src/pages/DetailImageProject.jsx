import { useEffect, useState } from "react";
import "../assets/css/detailImageProject.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createContentAndImage,
  detailProjectImgApi,
} from "../features/projectImg/api";
import { useLocation } from "react-router-dom";
import { getLanguage, translateApi } from "../features/translation/api";
import { useDebounced } from "../utils/utils";
import AudioPlayer from "../components/AudioPlayer";
import { faDownload, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createVideoApi } from "../features/video/api";
import SpinLoading from "../components/SpinLoading";

const DetailImageProject = () => {
  const [downloadLoading, setDownLoadLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [input, setInput] = useState("");

  const [selectLang, setSelectLang] = useState({
    slText: "en",
    slTranslate: "vi",
  });
  const location = useLocation();
  const projectId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { currentProject } = useSelector((state) => state.projectDetailImg);
  const { result: output, loading: translationLoading } = useSelector(
    (state) => state.translation
  );

  const { languages, loaded: loadedLanguages } = useSelector(
    (state) => state.language
  );

  const inputDebounced = useDebounced((input) => {
    setInput(input.trim());
    dispatch(
      translateApi({
        text: input.trim() || "",
        from: selectLang.slText,
        lang: selectLang.slTranslate,
        project_id: currentProject?.id,
      })
    );
  }, 700);
  const handleChangeInput = (e) => {
    inputDebounced(e.target.value);
  };
  const dispatch = useDispatch();
  const handleChangeLang = (e) => {
    setSelectLang({ ...selectLang, [e.target.name]: e.target.value });
  };
  const handleChangeImages = (e) => {
    const files = Array.from(e.target.files);
    setImages([...files, ...images]);
    const previews = files.map((file) => ({
      file_path: URL.createObjectURL(file),
    }));
    setPreviewImages([...previews, ...previewImages]);
  };
  const handleRemoveImage = (index) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setImages(updatedFiles);
    setPreviewImages(updatedPreviews);
  };
  const handleClickSave = () => {
    const inputArr = input.split("//");
    const outputArr = output?.translated_text.split("//");
    if (input && output && selectLang?.slText && selectLang?.slTranslate)
      dispatch(
        createContentAndImage({
          project_id: currentProject?.id,
          images,
          contents: inputArr.map((item, idx) => ({
            text: item.trim() || "",
            from: selectLang.slText,
            lang: selectLang.slTranslate,
            text_translate: outputArr[idx],
          })),
        })
      );
  };
  const handleExportVideo = async () => {
    setDownLoadLoading(true);
    const videos = await Promise.all([
      createVideoApi({
        voice_type: selectLang.slText,
        texts: input.split("//"),
        images,
      }),
      createVideoApi({
        voice_type: selectLang.slTranslate,
        texts: output?.translated_text.split("//"),
        images,
      }),
    ]);

    videos.forEach((video, index) => {
      const videoBlob = new Blob([video.data], { type: "video/mp4" });
      const videoURL = URL.createObjectURL(videoBlob);
      const link = document.createElement("a");
      link.href = videoURL;
      link.download = `video${index + 1}.mp4`; // Tên file khi tải về
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    setDownLoadLoading(false);
  };
  useEffect(() => {
    dispatch(detailProjectImgApi(projectId));
    dispatch(getLanguage());
  }, [dispatch, projectId]);

  useEffect(() => {
    if (currentProject?.images && projectId) {
      setImages([...currentProject.images]);
      setPreviewImages([...currentProject.images]);
    }
    if (currentProject?.contents)
      setInput(currentProject?.contents.map((item) => item.text).join("//"));
  }, [currentProject, projectId]);
  return (
    <div className="detailImageProject flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-lg font-semibold mb-1 block">
            {currentProject?.title || "--"}
          </span>
          {currentProject?.description && (
            <p>{currentProject?.description || "--"}</p>
          )}
        </div>
        <div className="detailImageProject__control">
          <button onClick={handleClickSave}>
            Lưu <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
          <button
            onClick={() => {
              !downloadLoading && handleExportVideo();
            }}
          >
            Export video{" "}
            {downloadLoading ? (
              <div className="detailImageProject__loading">
                <SpinLoading background={"#fff"} size={20} />
              </div>
            ) : (
              <FontAwesomeIcon icon={faDownload} />
            )}
          </button>
        </div>
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
                src={src?.file_path}
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
            <div className="flex items-center justify-between">
              <label htmlFor="text">Nhập nội dung text:</label>

              <AudioPlayer
                translationLoading={translationLoading}
                lang={selectLang.slText}
                text={input}
              />
            </div>
            <select
              name="slText"
              value={selectLang.slText}
              onChange={handleChangeLang}
              disabled={downloadLoading}
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
              defaultValue={input}
              disabled={downloadLoading}
            ></textarea>
          </div>
        </div>
        <div className="detailImageProject__box">
          <div className="detailImageProject__input">
            <div className="flex items-center justify-between">
              <label htmlFor="translate">Nội dung translate text:</label>
              <AudioPlayer
                translationLoading={translationLoading}
                lang={selectLang.slTranslate}
                text={output?.translated_text ?? ""}
              />
            </div>
            <select
              name="slTranslate"
              value={selectLang.slTranslate}
              onChange={handleChangeLang}
              disabled={downloadLoading}
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
              disabled={downloadLoading}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailImageProject;
