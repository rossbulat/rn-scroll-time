import React, { useState, useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import { styles } from './styles'
import moment from 'moment'
import { View } from 'react-native';

export const Slider = (props: any) => {

  const scrollRef: any = React.createRef();

  const { schedule, handleScheduleTime } = props;

  const SCROLLER_WIDTH = 3400;
  const TOTAL_INDEXES = 480;

  const [scrollerPos, setScrollerPos] = useState(0);
  const [scrollerContainerWidth, setScrollerContainerWidth] = useState(0);
  const [scrollerTime, setScrollerTime]: any = useState(schedule.scheduleTimeLocal);

  // initial ScrollView resizes as the component mounts
  useEffect(() => {
    if (schedule !== undefined && scrollerContainerWidth !== 0) {
      const percentIn = schedule.scheduleTimeLocal / (86400 * 0.01);
      const newScrollerPos = ((SCROLLER_WIDTH - scrollerContainerWidth) * 0.01) * percentIn;
      setScrollerPos(newScrollerPos);
    }
  }, [scrollerContainerWidth]);

  // update the scroller position in conjunction with width resizes
  useEffect(() => {
    const animated = !(scrollerPos === 0);
    if (scrollRef.current !== null) {
      scrollRef.current.scrollTo({ x: scrollerPos, animated: animated });
    }
  }, [scrollerPos])


  const handleScrollChange = (val) => {
    const maxScroll = SCROLLER_WIDTH;
    const currentScroll = val.nativeEvent.contentOffset.x >= maxScroll
      ? maxScroll
      : val.nativeEvent.contentOffset.x;

    const percentIn = currentScroll / ((maxScroll - scrollerContainerWidth) * 0.01);

    let newTime = 86400 * (percentIn * 0.01);
    if (newTime > 86399) {
      newTime = 86399; //11.59pm
    }
    if (newTime < 0) {
      newTime = 0;
    }
    setScrollerTime(newTime);
  }


  const indicatorWidth = ((SCROLLER_WIDTH) - scrollerContainerWidth) / (TOTAL_INDEXES - 1);
  let indicators = [];
  for (let i = 0; i < TOTAL_INDEXES; i++) {

    // check if current indicator is on the hour
    let hourInterval = (i % 20 === 0 || i === TOTAL_INDEXES - 1);

    indicators.push(
      <View
        key={i}
        style={{
          ...styles.indicator,
          width: indicatorWidth,
          height: hourInterval ? '80%' : '25%',
        }}>
      </View>
    );
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
          scrollEventThrottle={100}
          onScrollEndDrag={() => {
            handleScheduleTime(scrollerTime);
          }}
          onMomentumScrollEnd={() => {
            handleScheduleTime(scrollerTime);
          }}
          contentOffset={{ x: scrollerPos, y: 0 }}
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