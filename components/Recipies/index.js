import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import { Divider, Text } from '@ui-kitten/components';


export default function Recipies() {
    const [data, setData] = useState();

    const appId = "bfbec9ca";
    const appKey = "bceb3f26e3205fd55cb6dcd979c8f609";
    const recipieId = "6245fdcbb8c11fc1784df27c4d3426c5";
    const url = `https://api.edamam.com/api/recipes/v2/${recipieId}?type=public&app_id=${appId}&app_key=${appKey}`;

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setData(response.data);
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    return(
        <>
            <View style={{flexDirection:'row'}}>
                {
                    data &&  <Image source={data.recipe.image} width={150} height={150} alt="image"/>
                }

                <View style={{width: '50%'}}>
                    {
                        data &&  <Text style={[styles.textLayout, styles.fontSizeLarge, styles.textBolden]}>{data.recipe.label}</Text>
                    }

                    {
                        data &&  <Text style={[styles.textLayout, styles.fontSizeLarge, styles.textBolden]}>{data.recipe.cuisineType}</Text>
                    }

                    {
                        data &&  <Text style={[styles.textLayout, styles.fontSizeMedium]}>Calories: {data.recipe.calories.toFixed(0)}</Text>
                    }

                    {
                        data &&  <Text style={[styles.textLayout, styles.fontSizeMedium]}>Serves: {data.recipe.yield}</Text>
                    }

                    {
                    data &&  <Text style={[styles.textLayout, styles.fontSizeMedium]}>{data.recipe.totalTime} min</Text>
                    }
                </View>
            </View>
            <Text style={[styles.fontSizeMedium, styles.recipeInfo, styles.textBolden]}>Ingredients:</Text>
            <Divider color="red"/>
            {
                data && data.recipe.ingredients.map((a, index) => {
                    return(
                    <View key={index} style={styles.ingredientsLayout}>
                        <Text style={[styles.fontSizeMedium, styles.recipeInfo]}>
                            {a.food} 
                        </Text>
                        <Text style={[styles.fontSizeMedium, styles.recipeInfo]}>{a.quantity.toFixed(1)} {a.measure}</Text>
                    </View>
                    )
                })
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLayout: {
        width: '100%',
        textAlign: 'right',
        lineHeight: 30
    },
    fontSizeLarge: {
        fontSize: 20,
    },
    fontSizeMedium: {
        fontSize: 17,
    },
    textBolden: {
        fontWeight: '700'
    },
    recipeInfo: {
        lineHeight: 20,
        paddingTop: 20
    }, 
    ingredientsLayout: {
        flexDirection:'row',
        justifyContent: 'space-between'
    }
});


// {
//     "_links": {
//        "self": {
//           "href": "https://api.edamam.com/api/recipes/v2/6245fdcbb8c11fc1784df27c4d3426c5?type=public&app_id=bfbec9ca&app_key=bceb3f26e3205fd55cb6dcd979c8f609",
//           "title": "Self"
//        }
//     },
//     "recipe": {
//        "calories": 2695.40,
//        "cautions": ["Sulfites", "FODMAP"],
//        "co2EmissionsClass": "G",
//        "cuisineType": ["Mexican"],
//        "dietLabels": ["High-Fiber"],
//        "digest": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]],
//        "dishType": ["Salad"],
//        "healthLabels": ["Gluten-Free", "Wheat-Free", "Egg-Free", "Peanut-Free", "Tree-Nut-Free", "Soy-Free", "Fish-Free", "Shellfish-Free", "Pork-Free", "Crustacean-Free", "Celery-Free", "Mustard-Free", "Sesame-Free", "Lupine-Free", "Mollusk-Free", "Alcohol-Free", "Sulfite-Free"],
//        "image": "https://edamam-product-images.s3.amazonaws.com/web-img/cf3/cf35e9533e63190fa9d4ace033b8ec2a.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVz-LWVhc3QtMSJGMEQCIGWhrHZm1biota8e1GotKtiQvK5ciju1GnplkFJqg75dAiBk19%2FiEs8hsw%2FmW1yw9IijITXUepriuyzo1S5u3K9UkCq5BQhrEAAaDDE4NzAxN7kwhrDhzRsj15FeYgR9%2FGsNH2Tfs587LEuQCTDL6grZu3x7T42YbiRLZJDfkB3kQ7ITOIY1m0F25eCM1%2Bi8iAIxCrWEmZewvvUQVq8tgEuP2OTZVZ0IN3XJCpNbHyNDAxM9cAcckS8LgwZfOz3zzrtrxDcU9uFhZJOWC3xBDZv%2FfKHn3rOlJ0SSqldHq8jjiG%2FkKRZjmUxPRo6MGDBfAqEUalcLEeC32JQBiubj2pDR12WAFrelcw1Rb16b6eLBZ3FkJN8qScrpAr%2F19wgwxBdMa0DSmFoRxaHyxu4cOigjCjSeAn4fAUFOR9ev4%2B2FfZ8JK6BRaN3AuGh5kIgv%2BpstaP6sDj3WDDdQf3ogCJZFFC6xYNYCqLYnLDu4%2BVgE0GoGOhWhk1xuxN8ABGvb8F0xNz4UJnRgvORM7QRMBLq0HkfTVmScMB7EFXM1QEkAnVM1VOE%2BbtUZ5HvlJrBLx3JTzEtMOsVT%2BkVGTGGGINsF3MNyS1fdKTfLYSUfEvDcMOhoRtXaXvdWTWIYvYbfRDsAWzf8T%2BfdOuFHHtLYJZ50jaqMplv%2Fb%2B9RjPwE%2BYbnR9Jl5%2B%2FoZegHFa2hG1QHloPvWyUVS0IFrYJF9WbRgmAlNhGHIiOSnDEX0HyHjlzNpBRyZcHwR9XzBKNNueZVODjD2%2FqWHlOQmfqA7bULeGdNgUq%2FwNe3ULYuv9mqf%2B0cVFbVQBCH2HMIw0mF6mwh1kbLMM%2FtfGRd8AoObIY6BZP0GRPrGOYuRd62mEkBDxIlL7DMwL6Znql%2BrdG4rNgNT6AOgdfkLaEtP06%2FOvqZKjbAZBIsh7MwmCjGm881%2BObIXXMVBiXEcW3PeIutOI1bHJu6AuG%2FiyIw8JfnqQY6sgHyqyStr6DqOhc9pR6jwqRmLDobo4xyPeFshEG4PB8ve7Xw0RTFbHgqTCWDKTAy1SKiOa9m%2BBthTFMsei5G7bLITR3em%2F6ngBxOIprIyVgfQZSkYxra8NYxyt1J1rsgsiaJjdt4E0bGJPGAH9Wz2Szd7pmiOlbBmrmekGJ38wsNbSuq6b%2Fd7GiinTcTrYYgtz6oWBN07HaIJ20uJEes%2FFSzApdNEobAoFVucFBLv8ZYHx9Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231026T031613Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFB42PYWGR%2F20231026%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7b6ee03f7eda5820f780873b8271f5186d1ffd562b406cd30a185d1529a8981d",
//        "images": {
//           "REGULAR": [Object],
//           "SMALL": [Object],
//           "THUMBNAIL": [Object]
//        },
//        "ingredientLines": [
//           "12 oz. lean ground beef",
//           "1 pkt (1.25 oz) 40%-less-sodium taco seasoning mix",
//           "1 can kidney beans",
//           "⅓ c. bottled ranch salad dressing",
//           "⅓ c. salsa",
//           "8 c. bagged salad greens",
//           "2 c. broken tortilla chips",
//           "1 c. cherry tomatoes",
//           "½ c. shredded reduced-fat Cheddar cheese",
//           "¼ c. chopped red onion"
//        ],
//        "ingredients": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]],
//        "label": "Taco Salad",
//        "mealType": ["lunch/dinner"],
//        "shareAs": "http://www.edamam.com/recipe/taco-salad-6245fdcbb8c11fc1784df27c4d3426c5/-",
//        "source": "Good Housekeeping",
//        "totalCO2Emissions": 36747.72,
//        "totalDaily": {
//           "CA": [Object],
//           "CHOCDF": [Object],
//           "CHOLE": [Object],
//           "ENERC_KCAL": [Object],
//           "FASAT": [Object],
//           "FAT": [Object],
//           "FE": [Object],
//           "FIBTG": [Object],
//           "FOLDFE": [Object],
//           "K": [Object],
//           "MG": [Object],
//           "NA": [Object],
//           "NIA": [Object],
//           "P": [Object],
//           "PROCNT": [Object],
//           "RIBF": [Object],
//           "THIA": [Object],
//           "TOCPHA": [Object],
//           "VITA_RAE": [Object],
//           "VITB12": [Object],
//           "VITB6A": [Object],
//           "VITC": [Object],
//           "VITD": [Object],
//           "VITK1": [Object],
//           "ZN": [Object]
//        },
//        "totalNutrients": {
//           "CA": [Object],
//           "CHOCDF": [Object],
//           "CHOCDF.net": [Object],
//           "CHOLE": [Object],
//           "ENERC_KCAL": [Object],
//           "FAMS": [Object],
//           "FAPU": [Object],
//           "FASAT": [Object],
//           "FAT": [Object],
//           "FATRN": [Object],
//           "FE": [Object],
//           "FIBTG": [Object],
//           "FOLAC": [Object],
//           "FOLDFE": [Object],
//           "FOLFD": [Object],
//           "K": [Object],
//           "MG": [Object],
//           "NA": [Object],
//           "NIA": [Object],
//           "P": [Object],
//           "PROCNT": [Object],
//           "RIBF": [Object],
//           "SUGAR": [Object],
//           "THIA": [Object],
//           "TOCPHA": [Object],
//           "VITA_RAE": [Object],
//           "VITB12": [Object],
//           "VITB6A": [Object],
//           "VITC": [Object],
//           "VITD": [Object],
//           "VITK1": [Object],
//           "WATER": [Object],
//           "ZN": [Object]
//        },
//        "totalTime": 15,
//        "totalWeight": 1704.80,
//        "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_6245fdcbb8c11fc1784df27c4d3426c5",
//        "url": "http://www.goodhousekeeping.com/food-recipes/a12694/taco-salad-121640/",
//        "yield": 4
//     }
//  }
 

