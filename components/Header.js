import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';


const Header = props => {
    return (
        <View style={styles.header} >
            <Text style={styles.headerTitle} >{props.title}</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        paddingTop: 30,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerTitle: {
        color: 'black',
        fontSize: 23,
        paddingBottom: 15,
        fontFamily: 'open-sans-bold'
    }
});