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

import { create } from "zustand";

export interface InterviewData {
  resumeText: string;
  interviewType: "behavioral" | "technical" | "";
  jobRole: string;
  company: string;
}

interface InterviewStore {
  interviewData: InterviewData;
  setResumeText: (text: string) => void;
  setInterviewType: (type: "behavioral" | "technical") => void;
  setJobRole: (role: string) => void;
  setCompany: (company: string) => void;
  clearData: () => void;
  isFormValid: () => boolean;
}

const initialData: InterviewData = {
  resumeText: "",
  interviewType: "",
  jobRole: "",
  company: "",
};

export const useInterviewStore = create<InterviewStore>((set, get) => ({
  interviewData: initialData,
  
  setResumeText: (text: string) =>
    set((state) => ({
      interviewData: { ...state.interviewData, resumeText: text },
    })),
  
  setInterviewType: (type: "behavioral" | "technical") =>
    set((state) => ({
      interviewData: { ...state.interviewData, interviewType: type },
    })),
  
  setJobRole: (role: string) =>
    set((state) => ({
      interviewData: { ...state.interviewData, jobRole: role },
    })),
  
  setCompany: (company: string) =>
    set((state) => ({
      interviewData: { ...state.interviewData, company: company },
    })),
  
  clearData: () => set({ interviewData: initialData }),
  
  isFormValid: () => {
    const { interviewData } = get();
    return !!(
      interviewData.resumeText &&
      interviewData.interviewType &&
      interviewData.jobRole.trim() &&
      interviewData.company.trim()
    );
  },
}));