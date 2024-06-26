import { forwardRef } from "react";

interface InfoModalProps {
  message: { raw: string; clean: string };
}

const InfoModal = forwardRef<HTMLDialogElement, InfoModalProps>(
  ({ message }, ref) => {
    return (
      <dialog ref={ref} className="modal" id="info_modal">
        <div className="modal-box">
          <h1 className="font-bold text-xl">Response</h1>
          <p className="py-4"></p>
          <h3 className="font-bold text-lg">Raw:</h3>
          <p className="py-4">{message.raw}</p>
          <h3 className="font-bold text-lg">Plain (After Decrypt):</h3>
          <p className="py-4">{message.clean}</p>
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
