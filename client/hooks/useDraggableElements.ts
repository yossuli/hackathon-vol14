import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type Point = {
  x: number;
  y: number;
};

type MouseStatus = {
  isDown: boolean;
  isMove: boolean;
  isUp: boolean;
};

type DraggingElementStatus = {
  translate: Point;
  mouseStatus: MouseStatus;
  draggingElement: (EventTarget & Element) | null;
};

type Handler = (e: MouseEvent) => void;

const useDraggableElements = (
  isStyleTransform: boolean = true,
): [DraggingElementStatus, (e: React.MouseEvent<EventTarget & HTMLElement>) => void, Handler] => {
  // ドラッグしている要素の移動量
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });

  // 現在のマウスイベントの状態
  const [mouseStatus, setMouseStatus] = useState<MouseStatus>({
    isDown: false,
    isMove: false,
    isUp: false,
  });

  // マウスを押し込んだときのカーソルの座標
  const startPoint = useRef<Point>({ x: 0, y: 0 });

  // 前回の translate
  const prevTranslate = useRef<Point>({ x: 0, y: 0 });

  // ドラッグしている要素
  const draggingElement = useRef<(EventTarget & HTMLElement) | null>(null);

  // .draggableが追加されていない要素がドラッグされないようにする
  const isDraggable = (): boolean =>
    draggingElement.current ? draggingElement.current.classList.contains('draggable') : false;

  // mousedownが発生したときに実行する関数
  const handleDown = useCallback((e: React.MouseEvent<EventTarget & HTMLElement>): void => {
    draggingElement.current = e.currentTarget;
    if (!isDraggable()) return;

    const matrix = new DOMMatrix(getComputedStyle(draggingElement.current).transform);

    prevTranslate.current = {
      x: matrix.translateSelf().e,
      y: matrix.translateSelf().f,
    };

    const draggableElements = document.getElementsByClassName(
      'draggable',
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < draggableElements.length; i++) {
      draggableElements[i].style.zIndex = `1000`;
    }

    draggingElement.current.style.position = 'relative';
    draggingElement.current.style.zIndex = `1001`;

    const x = e.pageX;
    const y = e.pageY;

    startPoint.current = { x, y };

    setMouseStatus((prevMouseStatus) => ({
      ...prevMouseStatus,
      isUp: false,
      isDown: true,
    }));
  }, []);

  // mousemoveが発生したときに実行する関数
  const handleMove = (e: MouseEvent): void => {
    e.preventDefault();
    if (!draggingElement.current) return;
    if (!isDraggable()) return;

    const differenceX = e.pageX - startPoint.current.x;
    const differenceY = e.pageY - startPoint.current.y;

    setTranslate({
      x: prevTranslate.current.x + differenceX,
      y: prevTranslate.current.y + differenceY,
    });

    setMouseStatus((prevMouseStatus) => ({
      ...prevMouseStatus,
      isMove: true,
    }));
  };

  // mouseupが発生したときに実行する関数
  const handleUp = (_e: MouseEvent): void => {
    if (!draggingElement.current) return;
    if (!isDraggable()) return;

    draggingElement.current = null;

    setMouseStatus((prevMouseStatus) => ({
      ...prevMouseStatus,
      isDown: false,
      isMove: false,
      isUp: true,
    }));
  };

  // 要素を動かす
  useLayoutEffect(() => {
    if (!isStyleTransform) return;
    if (!draggingElement.current) return;

    draggingElement.current.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0)`;
  }, [translate]);

  // mousemove, mouseup, mouseleaveイベントが発生したときに実行されるようにする
  useEffect(() => {
    document.body.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseup', handleUp);
    document.body.addEventListener('mouseleave', handleUp);

    return () => {
      document.body.removeEventListener('mousemove', handleMove);
      document.body.removeEventListener('mouseup', handleUp);
      document.body.removeEventListener('mouseleave', handleUp);
    };
  }, []);

  return [
    {
      translate,
      mouseStatus,
      draggingElement: draggingElement.current,
    },
    handleDown,
    handleMove, // handleMoveを戻り値として追加
  ];
};

export default useDraggableElements;
