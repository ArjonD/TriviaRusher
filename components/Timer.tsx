import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
    duration: number; 
    onTimeUp: () => void;
    isActive: boolean;
    onReset?: () => void;
};

export default function Timer({ duration, onTimeUp, isActive, onReset }: Props) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const scaleAnim = new Animated.Value(1);
    const pulseAnim = new Animated.Value(1);

    useEffect(() => {
        setTimeLeft(duration);
        scaleAnim.setValue(1);
        pulseAnim.setValue(1);
    }, [duration, onReset]);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    onTimeUp();
                    return 0;
                }
                
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                ]).start();
                
                if (prev <= 5) {
                    Animated.loop(
                        Animated.sequence([
                            Animated.timing(pulseAnim, {
                                toValue: 1.15,
                                duration: 300,
                                useNativeDriver: true,
                            }),
                            Animated.timing(pulseAnim, {
                                toValue: 1,
                                duration: 300,
                                useNativeDriver: true,
                            }),
                        ]),
                        { iterations: 1 }
                    ).start();
                }
                
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isActive, onTimeUp]);

    const getTimerColor = () => {
        if (timeLeft <= 3) return '#F44336'; 
        if (timeLeft <= 5) return '#FF9800'; 
        return '#4CAF50'; 
    };

    const getProgressWidth = () => {
        return `${(timeLeft / duration) * 100}%`;
    };

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.timerContainer,
                    {
                        transform: [
                            { scale: scaleAnim },
                            { scale: timeLeft <= 5 ? pulseAnim : 1 }
                        ]
                    }
                ]}
            >
                <Text style={[styles.timerText, { color: getTimerColor() }]}>
                    {timeLeft}
                </Text>
                
                {timeLeft <= 3 && (
                    <View style={styles.warningOverlay}>
                        <Text style={styles.warningText}>⚠️</Text>
                    </View>
                )}
            </Animated.View>
            
            <View style={styles.progressBarContainer}>
                <Animated.View 
                    style={[
                        styles.progressBar, 
                        { 
                            width: `${(timeLeft / duration) * 100}%` as any,
                            backgroundColor: getTimerColor()
                        }
                    ]} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    timerContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1B263B',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#415A77',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    progressBarContainer: {
        width: 200,
        height: 6,
        backgroundColor: '#2C3E50',
        borderRadius: 3,
        marginTop: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 3,
    },
    warningOverlay: {
        position: 'absolute',
        top: -15,
        right: -15,
    },
    warningText: {
        fontSize: 20,
    },
});
