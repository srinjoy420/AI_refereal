import { useEffect, useRef, useState } from "react";
import { FileText, FileUp, LoaderCircle, RefreshCw, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

const acceptedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const maxFileSize = 5 * 1024 * 1024;

const ResumeManager = () => {
  const inputRef = useRef(null);
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchResume = async () => {
      try {
        const response = await axiosInstance.get("resume/getresume");
        if (isMounted) setResume(response.data.resume);
      } catch (error) {
        if (error.response?.status !== 404 && isMounted) {
          toast.error(error.response?.data?.message || "Could not load your resume.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchResume();
    return () => {
      isMounted = false;
    };
  }, []);

  const uploadResume = async (file) => {
    if (!file) return;
    if (!acceptedTypes.includes(file.type)) {
      toast.error("Choose a PDF, DOC, or DOCX file.");
      return;
    }
    if (file.size > maxFileSize) {
      toast.error("Your resume must be 5 MB or smaller.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    setIsUploading(true);

    try {
      const response = resume
        ? await axiosInstance.put("resume/replaceresume", formData)
        : await axiosInstance.post("resume/upload", formData);
      setResume(response.data.resume);
      toast.success(resume ? "Resume updated successfully." : "Resume uploaded successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not upload your resume.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleFileSelection = (event) => {
    uploadResume(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    uploadResume(event.dataTransfer.files?.[0]);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-7">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700">
          <FileText className="size-5" />
        </span>
        <div>
          <h2 className="text-base font-semibold">Your resume</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            Upload a resume to get started. You can view or replace it anytime.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
          <LoaderCircle className="mr-2 size-4 animate-spin" />
          Checking for your resume...
        </div>
      ) : resume ? (
        <div className="flex flex-col gap-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white text-emerald-700 shadow-sm">
              <FileText className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">{resume.fileName}</p>
              <p className="mt-1 text-xs text-slate-500">Resume uploaded and ready to view</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
            >
              View resume
            </a>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-700 px-3.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUploading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <RefreshCw className="size-4" />
              )}
              Change
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-xl border-2 border-dashed px-5 py-9 text-center transition ${
            isDragging
              ? "border-violet-500 bg-violet-50"
              : "border-slate-300 bg-slate-50/70 hover:border-violet-300 hover:bg-violet-50/40"
          }`}
        >
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-violet-700 shadow-sm">
            <FileUp className="size-5" />
          </span>
          <p className="mt-4 text-sm font-semibold text-slate-800">Drop your resume here</p>
          <p className="mt-1 text-sm text-slate-500">PDF, DOC, or DOCX · up to 5 MB</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isUploading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            {isUploading ? "Uploading..." : "Choose a file"}
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileSelection}
        className="sr-only"
        aria-label="Choose a resume file"
      />
      <p className="mt-4 text-xs leading-5 text-slate-400">
        Your resume is private and is only used to support your job search.
      </p>
    </section>
  );
};

export default ResumeManager;
