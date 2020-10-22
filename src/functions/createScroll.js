import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ScrollBar from '@better-scroll/scroll-bar';
BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

function createScroll(contentIndex, wrapper, onScroll) {
  const probeType = onScroll ? 3 : 0;
  const scroll = new BScroll(wrapper, {
    scrollY: true,
    mouseWheel: true,
    scrollbar: true,
    probeType: probeType,
    tap: 'tap',
    specifiedIndexAsContent: contentIndex
  });
  const barStyle = scroll.plugins.scrollbar.indicators[0].elStyle;
  const wrapperStyle = scroll.plugins.scrollbar.indicators[0].wrapperStyle;
  barStyle.border = 'none';
  wrapperStyle.width = '5px';
  if (onScroll) {
    scroll.on('scroll', onScroll);
  }
  return scroll;
}

export default createScroll;
