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
import Notification from "../components/Notification";

const DetailImageProject = () => {
  const [downloadLoading, setDownLoadLoading] = useState(false);
  const [notificaton, setNotification] = useState({ text: "", isError: false });
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [selectLang, setSelectLang] = useState({
    slText: "en",
    slTranslate: "vi",
  });
  const location = useLocation();
  const projectId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { currentProject, loading: currentProjectLoading } = useSelector(
    (state) => state.projectDetailImg
  );

  const { result: output, loading: translationLoading } = useSelector(
    (state) => state.translation
  );

  const { languages } = useSelector((state) => state.language);

  const inputDebounced = useDebounced((input) => {
    setInput(input.trim());
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
    const base64Strings = [];
    const fileReaders = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        base64Strings.push({ img_data: reader.result });
        setImages([...images, ...base64Strings]);
      };
      reader.readAsDataURL(file);
      fileReaders.push(reader);
    });
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);
  };
  const handleClickSave = () => {
    if (input && output && selectLang?.slText && selectLang?.slTranslate)
      dispatch(
        createContentAndImage({
          project_id: currentProject?.id,
          images,
          content: input.trim() || "",
          lang: selectLang?.slText || "",
        })
      );
  };
  const handleExportVideo = async () => {
    console.log(input);
    setDownLoadLoading(true);
    const videos = await Promise.all([
      createVideoApi({
        voice_type: selectLang.slText,
        texts: input.split("//").map((text) => text.trim()),
        images,
      }),
      createVideoApi({
        voice_type: selectLang.slTranslate,
        texts: output?.translated_text.split("//"),
        images,
      }),
    ]);

    videos.forEach((video, index) => {
      if (video?.data) {
        const videoBlob = new Blob([video.data], { type: "video/mp4" });
        const videoURL = URL.createObjectURL(videoBlob);
        const link = document.createElement("a");
        link.href = videoURL;
        link.download = `video${index + 1}.mp4`; // Tên file khi tải về
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
    if (videos.every((video) => video?.data)) {
      setNotification({ text: "Video đã tạo thành công", isError: false });
    } else {
      setNotification({ text: "Tạo video thất bại", isError: true });
    }
    setDownLoadLoading(false);
  };

  useEffect(() => {
    dispatch(detailProjectImgApi(projectId));
    dispatch(getLanguage());
  }, [dispatch, projectId]);
  useEffect(() => {
    if (currentProject?.images64) {
      setImages(currentProject?.images64);
    }

    setInput(currentProject?.content || "");

    if (currentProject?.lang) {
      setSelectLang({ slTranslate: "vi", slText: currentProject?.lang });
    }
  }, [currentProject?.images64, currentProject?.content, currentProject?.lang]);

  useEffect(() => {
    dispatch(
      translateApi({
        text: input.trim() || "",
        from: selectLang.slText,
        lang: selectLang.slTranslate,
        project_id: currentProject?.id,
      })
    );
  }, [
    dispatch,
    input,
    currentProject?.id,
    selectLang.slText,
    selectLang.slTranslate,
  ]);
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
          <button
            onClick={() => {
              !currentProjectLoading && handleClickSave();
            }}
          >
            Lưu{" "}
            {currentProjectLoading ? (
              <div className="detailImageProject__loading">
                <SpinLoading background={"#fff"} size={20} />
              </div>
            ) : (
              <FontAwesomeIcon icon={faFloppyDisk} />
            )}
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
        <div className="detailImage__list">
          {images.map((src, index) => (
            <div
              className="relative w-28 max-w-28 min-w-28 overflow-hidden"
              key={index}
            >
              <img
                className="block"
                width={200}
                height={200}
                src={src?.img_data}
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
              {languages?.length &&
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
              {languages?.length &&
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
              disabled
              value={output?.translated_text ?? ""}
              onChange={() => {}}
            ></textarea>
          </div>
        </div>
      </div>
      {notificaton?.text && (
        <Notification
          text={notificaton.text}
          isError={notificaton.isError}
          close={() => {
            setNotification({ text: "", isError: false });
          }}
        />
      )}
    </div>
  );
};

export default DetailImageProject;
