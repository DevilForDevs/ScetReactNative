import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Topic } from '../../../utils/apis';


const { width } = Dimensions.get('window');

type PosterCarouselProps = {
    images: Topic[]; // array of image URIs
    onPosterPress: (index: Topic) => void; // callback when poster is pressed
    onCategorySelect: (index: number) => void;
    categories: string[]
};


export default function PosterCarousel({ images, onPosterPress, categories, onCategorySelect }: PosterCarouselProps) {




    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectCatgory, setSelectedCatgory] = useState(1);

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    };

    const viewConfig = { viewAreaCoveragePercentThreshold: 50 };

    const categorySelectionHandler = (pileId: number) => {
        setSelectedCatgory(pileId)
        onCategorySelect(pileId)

    }

    return (
        <View>
            {/* White background carousel */}
            <View style={styles.body}>
                <FlatList
                    data={images}
                    keyExtractor={(item) => item.topic_id.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode='contain' />
                            <View>
                                <View style={styles.titleAndArrow}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <TouchableOpacity onPress={()=>onPosterPress(item)}>
                                        <Ionicons name="chevron-forward" size={24} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.subtitle}>{item.language}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>

            {/* Dots outside white area */}
            <View style={styles.dotsContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: index === currentIndex ? '#000' : '#ccc' }
                        ]}
                    />
                ))}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.catgeoryList}
            >
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index} // use index as key since it's a string array
                        onPress={() => categorySelectionHandler(index)} // pass index to handler
                    >
                        <View
                            style={
                                selectCatgory === index
                                    ? styles.selectedPileCard
                                    : styles.pileCard
                            }
                        >
                            <Text
                                style={
                                    selectCatgory === index
                                        ? styles.categoryName
                                        : styles.categoryNameSelected
                                }
                            >
                                {category}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>


        </View>
    );

}

const styles = StyleSheet.create({
    body: {
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal:40,
        paddingBottom: 20,
    },
    slide: {
        width: width - 80, // matches marginHorizontal
        alignItems: "center",
    },
    image: {
        width: 310,
        height: 310,
    },
    titleAndArrow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: "Montserrat-Medium"
    },
    subtitle: {
        fontFamily: "Montserrat-Light",
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 6,
        justifyContent: "center"

    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    pileCard: {
        backgroundColor: '#f2f2f2', // <-- add this
        height: 40,
        width: 120,
        borderRadius: 20,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryName: {
        color: "#242A38",
        fontSize: 16,
        fontFamily: "Montserrat-Medium"
    },
    catgeoryList: {
        marginTop: 20
    },
    selectedPileCard: {
        backgroundColor: '#DEDEDE', // slightly darker
        height: 40,
        width: 122,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryNameSelected: {
        color: "grey",
        fontSize: 16,
        fontFamily: "Montserrat-Medium"
    }

});