import React, { useState, useCallback } from 'react';
import Canvas from '../components/Canvas';
import Direction from '../components/Direction';
import Result from '../components/Result';
import { getRandomCategory } from '../global/categories';

const DrawContainer = () => {
  const [category, setCategory] = useState(() => getRandomCategory());
  const [canvas, setCanvas] = useState();
  const [eq, setEq] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState([]);

  // 캔버스에 그리기 처리
  const drawCanvas = useCallback((el) => {
    const ctx = el.getContext('2d');
    ctx.lineWidth = 10;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 498, 498);
    ctx.lineCap = 'round';

    setCanvas(el);

    let isDraw = false; // 선을 그릴 수 없음
    el.removeEventListener('mousedown', downHandler);
    el.removeEventListener('mousemove', moveHandler);
    el.removeEventListener('mouseup', upHandler);
    el.addEventListener('mousedown', downHandler);
    el.addEventListener('mousemove', moveHandler);
    el.addEventListener('mouseup', upHandler);

    function downHandler(e) {
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);

      isDraw = true;
    }

    function moveHandler(e) {
      if (!isDraw) return;

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }

    function upHandler(e) {
      isDraw = false;
    }
  }, []);

  /**
   * 캔버스에 그려진 이미지를 jpeg  dataURL -> blob로 변환
   * 서버로 전송
   */
  const onConfirmDrawing = useCallback(() => {
    const apiHost = process.env.REACT_APP_API_URL;
    canvas.toBlob(
      (blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'canvas.jpg');

        setLoading(true);
        fetch(`${apiHost}/quickdraw/predict`, {
          method: 'POST',
          body: formData,
          signal: AbortSignal.timeout(3 * 60000),
        })
          .then((res) => res.json())
          .then((items) => {
            setEq(items[0][0] === category[0]);
            setPredictions(items);
            setLoading(false);
          });
      },
      'image/jpeg',
      1,
    );
  }, [canvas, category]);
  const onRefresh = useCallback(() => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect = '0,0,498,498';
    setCategory(getRandomCategory());
    setEq(false);
    setPredictions();
  }, [canvas]);

  return (
    <>
      <Direction category={category} />
      <Canvas callback={drawCanvas} />
      <Result
        onClick={onConfirmDrawing}
        onRefresh0={onRefresh}
        eq={eq}
        predictions={predictions}
        category={category}
        loading={loading}
      />
    </>
  );
};

export default React.memo(DrawContainer);
