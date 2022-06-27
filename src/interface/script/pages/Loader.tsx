// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ServerIcon from "../components/ServerIcon";

type LoaderDisplayText = { top: string; bottom?: string };
type LoaderState = {
  progress: number;
  text: LoaderDisplayText;
};

export function Loader() {
  const [state, setState] = useState<LoaderState>({
    progress: 0,
    text: { top: "Initializing" },
  });

  useEffect(() => {
    if ("alt" in window === false) return;

    alt.on("app:req:loader", setReadiness);
    function setReadiness() {
      alt.emit("app:res:loader");
      alt.off("app:req:loader", setReadiness);
    }

    const receivePayload = (payload: LoaderState) => setState(payload);
    alt.on("loader:payload", receivePayload);

    return function cleanup() {
      alt.off("loader:payload", receivePayload);
    };
  });
  // const navigate = useNavigate();

  return (
    <div className="rLoader">
      <div className="_wrapper">
        <div className="_icon">
          <ServerIcon />
        </div>
        <div className="_displayArea">
          <div className="_progressBarWrapper">
            <div style={{ width: `${state.progress}%` }} className="_progress"></div>
          </div>
          <div className="_text">
            <div className="_topText">{state.text.top || "..."}</div>
            <div className="_bottomText">{state.text.bottom || "..."}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
