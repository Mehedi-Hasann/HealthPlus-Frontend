import { toast } from "sonner";

/**
 * Show a concise error toast.
 * If an Error object or a server response with a `message` field is passed,
 * the function extracts the message; otherwise it falls back to a generic text.
 */
export function toastError(errorOrMessage: unknown, options?: Parameters<typeof toast.error>[1]) {
  let message = "Error";
  if (typeof errorOrMessage === "string") {
    message = errorOrMessage;
  } else if (errorOrMessage && typeof errorOrMessage === "object") {
    // @ts-ignore – we just attempt to read possible fields
    if ("message" in (errorOrMessage as any) && typeof (errorOrMessage as any).message === "string") {
      message = (errorOrMessage as any).message;
    } else if ("error" in (errorOrMessage as any) && typeof (errorOrMessage as any).error === "string") {
      message = (errorOrMessage as any).error;
    }
  }
  toast.error(message, options);
}
