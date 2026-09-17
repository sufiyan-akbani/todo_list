import React from "react";

export const Model = ({ modelTitle, todoId, children, onClose }) => {
  return (
    <div
      className="modal fade"
      id={`${modelTitle}Modal-${todoId}`}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-white text-start">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {modelTitle} Todo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
