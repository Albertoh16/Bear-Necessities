/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CompanyAbout from "./components/company-about/CompanyAbout";
import CompanyInfoDisplayPage from "./components/company-about/CompanyInfoDisplayPage";
import Quiz from "./components/quizs/quiz";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { Altair } from "./components/altair/Altair";
import ControlTray from "./components/control-tray/ControlTray";
import Navbar from "./components/navbar/Navbar";
import cn from "classnames";
import { LiveClientOptions } from "./types";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const apiOptions: LiveClientOptions = {
  apiKey: API_KEY,
};

function App() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <div className="App">
      <LiveAPIProvider options={apiOptions}>
        <Router>
          <div className="bg-neutral-15 text-gray-300 flex flex-col h-screen w-screen">
            <Navbar />
            <main className="relative flex flex-col items-center justify-center flex-grow gap-4 max-w-full overflow-hidden">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/agent"
                  element={
                    <>
                      <div className="flex flex-1 items-center justify-center">
                        {/* APP goes here */}
                        <Altair />
                        <video
                          className={cn("flex-grow max-w-[90%] rounded-[32px] max-h-fit", {
                            hidden: !videoRef.current || !videoStream,
                          })}
                          ref={videoRef}
                          autoPlay
                          playsInline
                        />
                        </div>
                      <ControlTray
                        videoRef={videoRef}
                        supportsVideo={true}
                        onVideoStreamChange={setVideoStream}
                        enableEditingSettings={false}
                      >
                      {/* put your own buttons here */}
                    </ControlTray>
                  </>
                  }
                />
                <Route path="/about-company" element={<CompanyAbout />} />
                <Route path="/about-company-info" element={<CompanyInfoDisplayPage />} />
                <Route path="/quiz" element={<Quiz />} />
              </Routes>
            </main>
          </div>
        </Router>
      </LiveAPIProvider>
    </div>
  );
}

export default App;
