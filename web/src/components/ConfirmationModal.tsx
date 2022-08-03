/* eslint-disable react/react-in-jsx-scope */
import { X } from 'phosphor-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Button } from './Button';

interface PropTypes {
  title: string;
  description?: string;
  handleConfirmModal: () => void;
  setModal: (modal: boolean) => void;
}

export const ConfirmationModal = ({ title, description, handleConfirmModal, setModal }: PropTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  function closeModal(event: MouseEvent<HTMLDivElement>) {
    if (event.target === modalRef.current) {
      closeIt ();
    }
  }

  function closeIt ()
  {
    setClosing(true);
    setTimeout(()=>{setModal(false)}, 500)
  }

  function confirmIt ()
  {
    setClosing(true);
    setTimeout(handleConfirmModal, 500)
  }

  useEffect(() => {
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape') {
          setModal(false);
        }
      },
      false,
    );
  }, []);

  return (
    <div
      className="modal-confirm"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className={!closing?"modal-open":"modal-close"}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-header-dark">{title}</h3>
          <X
            weight="bold"
            className="w-6 h-6 text-icon-dark-200"
            onClick={closeIt}
          />
        </div>
        <p className="my-5 px-5 text-sm text-center text-paragraph-dark font-medium">
          {description != undefined ? description : "Esta ação efetuará a transação. deseja continuar?"}
        </p>
        <div className="mb-5 flex justify-center gap-5">
          <Button
            category="cancel"
            label="Cancelar"
            onClick={closeIt}
          />
          <Button
            label="Confirmar"
            onClick={confirmIt}
          />
        </div>
      </div>
    </div>
  );
};