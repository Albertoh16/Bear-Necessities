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
import { useEffect, useRef, useState, memo } from "react";
import vegaEmbed from "vega-embed";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import {
  FunctionDeclaration,
  LiveServerToolCall,
  Modality,
  Type,
} from "@google/genai";
import { useLocation } from "react-router-dom";

const declaration: FunctionDeclaration = {
  name: "render_altair",
  description: "Displays an altair graph in json format.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      json_graph: {
        type: Type.STRING,
        description:
          "JSON STRING representation of the graph to render. Must be a string, not a json object",
      },
    },
    required: ["json_graph"],
  },
};

type AltairProps = {
  resumeContext?: string;
};

function AltairComponent() {
  const [jsonString, setJSONString] = useState<string>("");
  const { client, setConfig, setModel } = useLiveAPIContext();
  const location = useLocation();
  const { resumeContext, interviewType, jobRole, company } = location.state || {};

  useEffect(() => {
    setModel("models/gemini-2.0-flash-exp");
    let baseText =
      'I am someone interested in improving my job interviewing skills. '
      + 'You are a helpful assistant that will help hone my skills by playing the part of an interview recuiter. '
      + 'Any time I ask you or talk to you about subjects unreleated to either improving my interviewing skills, about the job / field I am interviewing for, or just unreleated to the context of interview prep, please try to redirect the conversation back to the subject of interviews. '
      + 'If I keep going out of topic, please point this out to me. If this pattern repeats frequently, you may restart the entire conversation with the context of helping me with interview prep in mind. '
      + 'Dont ask for additional information just make your best judgement. '
      + 'If I provide you with a resume, use the information within your questions and responses for both reference and structure. '
      + 'If I provide you with a resume, use the information whenever possible to tailor your feedback. '
      + 'If I provide you with a resume, please start the conversation by greeting the user using the name from the resume. '
      + 'Please make sure to keep your questions and responses concise and to the point. '
      + 'When asking me questions, please try to simulate a real interview as closely as possible. '
      + 'Before starting the interview, please ask me what job or field I am interviewing for and any other relevant context. '
      + 'Ask me one question at a time and wait for my response before asking the next question. '
      + 'If the conversation lasts for more than 15 exchanges, please summarize the key points and provide constructive feedback on how I can improve. '
      + 'This full conversation should not last more than 20 exchanges. '
      + 'If we reach this limit, please provide a final summary and feedback on my performance. '
      + 'If the user tries to continue the conversation after this point, please remind them that the interview session has ended and provide a summary of the key points and feedback. '
      + 'Make sure to provide feedback in a constructive manner, highlighting both strengths and areas for improvement. ';
    
    baseText = `You are an experienced ${interviewType || 'interview'} interviewer conducting a practice interview session. `;
    
    if (jobRole && company) {
      baseText += `The candidate is interviewing for a ${jobRole} position at ${company}. `;
    }
    
    if (interviewType === 'behavioral') {
      baseText += `Focus on behavioral questions using the STAR method (Situation, Task, Action, Result). Ask about past experiences, leadership, teamwork, problem-solving, and conflict resolution. `;
    } else if (interviewType === 'technical') {
      baseText += `Focus on technical questions relevant to the role. Ask about technical skills, problem-solving approaches, system design, coding concepts, and industry best practices. `;
    }
    
    baseText += `Keep the conversation focused on interview preparation. If the candidate goes off-topic, gently redirect them back to interview-related discussions. Provide constructive feedback and ask follow-up questions to help them improve their responses. Don't ask for additional information - make your best judgment based on the context provided.`;

    const instructionText = resumeContext
      ? `${baseText}\n\nResume context: ${resumeContext}`
      : baseText;

    setConfig({
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
      },
      systemInstruction: {
        parts: [
          {
            text: instructionText,
          },
        ],
      },
      tools: [
        { googleSearch: {} },
        { functionDeclarations: [declaration] },
      ],
    });
  }, [setConfig, setModel, resumeContext, interviewType, jobRole, company]);

  useEffect(() => {
    const onToolCall = (toolCall: LiveServerToolCall) => {
      if (!toolCall.functionCalls) {
        return;
      }
      const fc = toolCall.functionCalls.find(
        (fc) => fc.name === declaration.name
      );
      if (fc) {
        const str = (fc.args as any).json_graph;
        setJSONString(str);
      }
      if (toolCall.functionCalls.length) {
        setTimeout(
          () =>
            client.sendToolResponse({
              functionResponses: toolCall.functionCalls?.map((fc) => ({
                response: { output: { success: true } },
                id: fc.id,
                name: fc.name,
              })),
            }),
          200
        );
      }
    };
    client.on("toolcall", onToolCall);
    return () => {
      client.off("toolcall", onToolCall);
    };
  }, [client]);

  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedRef.current && jsonString) {
      try {
        vegaEmbed(embedRef.current, JSON.parse(jsonString));
      } catch (e) {
        // Optionally handle Vega errors here
      }
    }
  }, [embedRef, jsonString]);

  return (
    <div className="vega-embed" ref={embedRef}>
      {!jsonString && (
        <div className="text-gray-400 text-center p-8">
          No graph loaded yet. Interact with the agent to generate a graph.
        </div>
      )}
    </div>
  );
}

export const Altair = memo(AltairComponent);
