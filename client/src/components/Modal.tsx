import { useState } from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background: white;
  padding: 20px;
  width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 20px;
  color: ${(p) => p.color};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonCancel = styled.button`
  border: solid 2px;
  padding: 10px;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f8f4f4;
  }
`;

const ButtonConfirm = styled.button`
  border: solid 2px ${(p) => p.color};
  padding: 10px;
  color: ${(p) => p.color};
  background: transparent;
  cursor: pointer;
  &:hover {
    background: #f8f4f4;
  }
`;

const Modal = ({ onClose, color, title, children }) => {
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    if (onClose) onClose();
    setOpen(false);
  }

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ lineHeight: 0 }}>
        {children}
      </span>
      {open && (
        <Backdrop>
          <Container>
            <Title color={color ? color : null}>{title}</Title>
            <ButtonContainer>
              <ButtonCancel onClick={() => setOpen(false)}>Cancel</ButtonCancel>
              <ButtonConfirm
                color={color ? color : null}
                onClick={() => handleConfirm()}>
                Confirm
              </ButtonConfirm>
            </ButtonContainer>
          </Container>
        </Backdrop>
      )}
    </>
  );
};

export default Modal;
