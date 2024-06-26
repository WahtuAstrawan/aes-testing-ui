import { forwardRef } from "react";

interface InfoModalProps {
  message: string;
}

const InfoModal = forwardRef<HTMLDialogElement, InfoModalProps>(
  ({ message }, ref) => {
    return (
      <dialog ref={ref} className="modal" id="info_modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Response</h3>
          <p className="py-4">{message}</p>
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
