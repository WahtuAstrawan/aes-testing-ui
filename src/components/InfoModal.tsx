import { forwardRef } from "react";

interface InfoModalProps {
  message: { raw: string; clean: string };
}

const InfoModal = forwardRef<HTMLDialogElement, InfoModalProps>(
  ({ message }, ref) => {
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        alert("Text copied to clipboard!");
      });
    };

    return (
      <dialog ref={ref} className="modal" id="info_modal">
        <div className="modal-box">
          <h1 className="font-bold text-3xl">Response</h1>
          <div className="py-7">
            <h3 className="font-bold text-lg">Raw (Before Decrypt):</h3>
            <div className="flex justify-between items-center">
              <code className="block w-full truncate bg-gray-100 p-2 rounded text-black">
                {message.raw}
              </code>
              <button
                className="btn btn-sm ml-2"
                onClick={() => copyToClipboard(message.raw)}
              >
                Copy
              </button>
            </div>
          </div>
          <div className="py-4">
            <h3 className="font-bold text-lg">Plain (After Decrypt):</h3>
            <div className="flex justify-between items-center">
              <code className="block w-full truncate bg-gray-100 p-2 rounded text-black">
                {message.clean}
              </code>
              <button
                className="btn btn-sm ml-2"
                onClick={() => copyToClipboard(message.clean)}
              >
                Copy
              </button>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

export default InfoModal;
