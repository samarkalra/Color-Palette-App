import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const PalettePreview = ({ handlePress, colorPalette }) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.heading}>{colorPalette.paletteName}</Text>
            <FlatList
                style={styles.list}
                data={colorPalette.colors.slice(0, 5)}
                keyExtractor={item => item.colorName}
                renderItem={({ item }) => (
                    <View style={[styles.color, { backgroundColor: item.hexCode }]} />
                )}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontWeight: 'bold',
        fontSize: 18
    },
    list: {
        flexDirection: 'row',
        marginBottom: 30
    },
    color: {
        height: 40,
        width: 40,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        // for android
        elevation: 2,
    }
});

export default PalettePreview;
