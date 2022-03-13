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

const ListCategories = ({setCategory}) => {
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
          onPress={() => {
            setCategory(category.name);
            setSelectedCategoryIndex(index);
          }}
        >
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex == index
                  ? COLORS.blueBlack
                  : COLORS.secondary,
              ...style.categoryBtn,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                marginLeft: 15,
                color:
                  selectedCategoryIndex == index
                    ? COLORS.lightViolate
                    : COLORS.pink,
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
    height: 30,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 30,
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
    height: 30,
    marginRight: 15,
    paddingRight: 10,
    width: 'auto',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
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

/* import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import categories from '../utils/catagories';
import COLORS from '../utils/colors';

const ListCategories = ({navigation}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState('0');

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
          onPress={() => {
              navigation.push('Category', {
              category: `${category.name}`,
            });

            setSelectedCategoryIndex(index);
          }}
        >
          <View>   
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                borderWidth: 1,
                borderColor: 'black',
                margin: 10,
                borderRadius: 10,
                color:
                  selectedCategoryIndex == index ? COLORS.blue : COLORS.grey,
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
    height: 30,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 30,
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
    height: 20,
    marginRight: 7,
    paddingRight: 10,
    width: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },

});

export default ListCategories;
 */
