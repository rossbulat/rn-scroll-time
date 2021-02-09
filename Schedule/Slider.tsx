import React, { useState, useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import { styles } from './styles'
import moment from 'moment'
import { View } from 'react-native';

const SCROLLER_WIDTH = 3400;
const TOTAL_INDEXES = 480;

export const Slider = (props: any) => {

  const scrollRef: any = React.createRef();
  const { schedule, handleScheduleTime } = props;

  const [initialScrollerPos, setInitialScrollerPos] = useState(0);
  const [scrollerContainerWidth, setScrollerContainerWidth] = useState(0);
  const [scrollerTime, setScrollerTime]: any = useState(schedule.scheduleTimeLocal);

  /*
   * View's onLayout event will trigger this effect.
  * This signals that the layout has changed, therefore
  * the scroller width will be different and need to be
  * recalibrated. */
  useEffect(() => {

    // check if container has been rendered
    if (scrollerContainerWidth !== 0) {

      // calculate how far in based on 24 hours
      const percentIn = schedule.scheduleTimeLocal / (86400 * 0.01);

      // calculate correct scroll position based on percentage
      const newScrollerPos = ((SCROLLER_WIDTH - scrollerContainerWidth) * 0.01) * percentIn;

      // update state with current scroller position
      setInitialScrollerPos(newScrollerPos);
    }
  }, [scrollerContainerWidth]);


  /* 
  * React to container width resizes. This will be an effect
  * of the previous effect, and will actually animate the
  * scroll view to the correct position. */
  useEffect(() => {

    // check if animation is needed, e.g. position is not zero
    const animated = !(initialScrollerPos === 0);

    // check if scrollRef has been initialised
    if (scrollRef.current !== null) {

      // animate the scroller to current position
      scrollRef.current.scrollTo({ x: initialScrollerPos, animated: animated });
    }
  }, [initialScrollerPos])


  /* onScroll handler function that re-calculates percentIn and 
   * sets the new scroller time. This updates the time displayed
   * above the indicators.
   */
  const handleScrollChange = (val) => {

    // do not calculate anything above max scroller width
    const currentScroll = val.nativeEvent.contentOffset.x >= SCROLLER_WIDTH
      ? SCROLLER_WIDTH
      : val.nativeEvent.contentOffset.x;

    // recalculate percent in
    const percentIn = currentScroll / ((SCROLLER_WIDTH - scrollerContainerWidth) * 0.01);

    // calculate new time (seconds) based on percent in
    let newTime = 86400 * (percentIn * 0.01);
    if (newTime > 86399) {
      newTime = 86399; //11.59pm
    }
    if (newTime < 0) {
      newTime = 0;
    }

    // update state with new time
    setScrollerTime(newTime);
  }


  /* construct the indicator components, giving those that  
   * represent hours a taller indicator.
   * above the indicators. */
  const indicatorWidth = ((SCROLLER_WIDTH) - scrollerContainerWidth) / (TOTAL_INDEXES - 1);
  let indicators = [];
  for (let i = 0; i < TOTAL_INDEXES; i++) {

    // check if current indicator is on the hour or is the last index
    let hourInterval = (i % 20 === 0 || i === TOTAL_INDEXES - 1);

    indicators.push(<View
      key={i}
      style={{
        ...styles.indicator,
        width: indicatorWidth,
        height: hourInterval ? '80%' : '25%',
      }}>
    </View>);
  }

  return (
    <>
      <View style={styles.time}>
        <Text style={styles.text}>
          {moment().startOf('day').add(scrollerTime, 'seconds').format('h:mm A')}
        </Text>
      </View>
      <View
        style={styles.container}
        onLayout={event => setScrollerContainerWidth(event.nativeEvent.layout.width)}
      >
        <View style={styles.selector}></View>
        <ScrollView
          ref={scrollRef}
          horizontal={true}
          contentContainerStyle={{ ...styles.scrollview, width: SCROLLER_WIDTH, }}
          showsHorizontalScrollIndicator={false}
          onScroll={data => handleScrollChange(data)}
          decelerationRate='fast'
          scrollEventThrottle={50}
          onScrollEndDrag={() => {
            handleScheduleTime(scrollerTime);
          }}
          onMomentumScrollEnd={() => {
            handleScheduleTime(scrollerTime);
          }}
          contentOffset={{ x: initialScrollerPos, y: 0 }}
        >
          <View style={{ width: (scrollerContainerWidth * 0.5) - (indicatorWidth - 1) }}></View>
          {indicators}
          <View style={{ width: (scrollerContainerWidth * 0.5) }}></View>
        </ScrollView>
      </View>
    </>
  )
}

export default Slider;