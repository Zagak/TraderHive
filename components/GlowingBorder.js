import { Animated } from 'react-native';
import { useMemo,useEffect } from 'react';

const GlowingBorder = ({ children, color }) => {
  const shadow = useMemo(() => {
    return {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 15,
    };
  }, [color]);

  const borderRadius = useMemo(() => {
    return {
      borderRadius: 10,
      overflow: 'hidden',
    };
  }, []);

  const animatedShadow = useMemo(() => {
    return {
      shadowOpacity: new Animated.Value(0),
      shadowRadius: new Animated.Value(0),
    };
  }, []);

  const animateShadow = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animatedShadow.shadowOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedShadow.shadowRadius, {
          toValue: 15,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const styles = useMemo(() => {
    return [
      shadow,
      borderRadius,
      {
        backgroundColor: '#fff',
        padding: 1,
        borderWidth: 5,
        borderColor: color,
        
      },
      {
        shadowOpacity: animatedShadow.shadowOpacity,
        shadowRadius: animatedShadow.shadowRadius,
      },
    ];
  }, [shadow, borderRadius, color, animatedShadow]);

  useEffect(() => {
    animateShadow();
  }, []);

  return <Animated.View style={styles}>{children}</Animated.View>;
};

export default GlowingBorder;
