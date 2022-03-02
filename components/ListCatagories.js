import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import categories from '../utils/catagories';
import COLORS from '../utils/colors';

const ListCategories = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.categoriesListContainer}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryIndex(index)}
        >
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex == index
                  ? COLORS.blue
                  : COLORS.lightViolate,
              ...style.categoryBtn,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
                color:
                  selectedCategoryIndex == index ? COLORS.white : COLORS.white,
              }}
            >
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },

  /* card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  }, */
});

export default ListCategories;
