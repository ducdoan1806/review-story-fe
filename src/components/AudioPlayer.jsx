import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_URL } from "../app/http";
import SpinLoading from "./SpinLoading";

const AudioPlayer = ({ lang, text, translationLoading }) => {
  const textArr = text.split(" // ");
  text = textArr.join(" ");
  const [voice, setVoice] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getVoice = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${API_URL}text_to_voice`,
          JSON.stringify({ lang, text }),
          { headers: { "Content-Type": "application/json" } }
        );
        setVoice("data:audio/wav;base64," + res.data?.voice);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getVoice();
  }, [lang, text]);
  return (
    <div className="audio-player" style={{ width: 200, height: 30 }}>
      {translationLoading || loading ? (
        <div className="flex justify-end">
          <SpinLoading />
        </div>
      ) : (
        <audio src={voice} style={{ width: 200, height: 30 }} controls></audio>
      )}
    </div>
  );
};
AudioPlayer.propTypes = {
  lang: PropTypes.string,
  text: PropTypes.string,
  translationLoading: PropTypes.bool,
};
export default AudioPlayer;
