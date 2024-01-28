import React, { useCallback, useState } from 'react';
import arrowIcon from '../../../../assets/arrow-icon.svg';
import camera from '../../../../assets/trading/camera-fill.svg';
import closeButtonIcon from '../../../../assets/close-button.svg';
import styled from 'styled-components';

type SetImgState = (value: File[] | ((prevImgState: File[]) => File[])) => void;

interface TradingImageProps {
  imgState: File[];
  setImgState: SetImgState;
}

const TradingImage = ({ imgState, setImgState }: TradingImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRemoveImage = (index: number) => {
    setImgState(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      setImgState(prev => [...prev, ...filesArray]);
    }
  }, []);

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imgState.length);
  };

  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + imgState.length) % imgState.length);
  };

  return (
    <ImgWrapper>
      {imgState.length > 3 && currentIndex !== 0 && (
        <PrevButton onClick={prevImage}>
          <img src={arrowIcon} style={{ width: '23px', height: '23px', marginLeft: '8px' }} />
        </PrevButton>
      )}
      <SelectWrapper>
        <SelectImg>
          <input
            key={imgState.join()}
            onChange={handleImageChange}
            type={'file'}
            accept="image/*"
            style={{ display: 'none' }}
            multiple
          />
          <img src={camera} alt={'camera'} />
        </SelectImg>
      </SelectWrapper>
      {imgState.length > 0 &&
        imgState.slice(currentIndex, currentIndex + 3).map((file, index) => (
          <UploadImgWrapper key={index}>
            <UploadImg src={URL.createObjectURL(file)} />
            <CloseButton onClick={() => handleRemoveImage(index)} src={closeButtonIcon} />
          </UploadImgWrapper>
        ))}
      {imgState.length > 3 && currentIndex !== imgState.length - 3 && (
        <NextButton onClick={nextImage}>
          <img src={arrowIcon} style={{ width: '23px', height: '23px', transform: 'scaleX(-1)', marginLeft: '8px' }} />
        </NextButton>
      )}
    </ImgWrapper>
  );
};

export default TradingImage;

const ImgWrapper = styled.div`
  position: relative;
  width: 800px;
  display: flex;
  flex-direction: row;
  margin-top: 28px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 166px;
  height: 166px;
  background-color: #f1f7e8;
  border-radius: 8px;
  margin-right: 14px;
`;

const SelectImg = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const UploadImgWrapper = styled.div`
  display: flex;
  position: relative;
`;

const CloseButton = styled.img`
  position: absolute;
  cursor: pointer;
  z-index: 10;
  right: 5px;
  top: -10px;
`;

const UploadImg = styled.img`
  width: 166px;
  height: 166px;
  margin-right: 14px;
  border-radius: 8px;
`;

const PrevButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  border: 1px solid #e3e3e3;
  cursor: pointer;
  left: -50px;
  top: 40%;
  border-radius: 50%;
  width: 44px;
  height: 44px;
`;

const NextButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 40px;
  top: 40%;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  border: 1px solid #e3e3e3;
  cursor: pointer;
`;
