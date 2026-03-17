import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { TaskType } from '../../components/DropDowns';

export default function CategorySelector() {
    const [categories, setCategories] = useState([]);
    //const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    

    const sendRequest = async () => {
        const url = 'http://192.168.1.110:8000/mobile/task-categories/';
        const headers = {'Content-Type': 'application/json',};

        try {
            const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            credentials: 'include', 
            });

            console.log('SERVER RESPONSE STATUS: ',response.status);
            const responseData = await response.json();//text();
            const parentCategories = responseData.context.categories;
            setCategories(parentCategories);

        } 
        catch (error) {
            console.error('Error:', error);
        }
    };
  
    useEffect(()=>{ sendRequest()},[])

    const handleCategoryChange = (categoryID) => {
        //setSelectedCategory(categoryID);
        const category = categories.find(cat => cat.id === categoryID);
        setSubcategories(category ? category.subcategories : []);
    };

    console.log({categories})

    return (
    <View>
        <Text>Избери раздел на задачата:</Text>
        
        <SelectList 
            data={categories.map(cat => ({ key: cat.id, value: cat.name }))}
            setSelected={handleCategoryChange}
            placeholder='Раздел'
        />
        
        {subcategories.length > 0 && (
            <>
                <Text>Избери категория:</Text>
                <SelectList 
                    data={subcategories.map(sub => ({ key: sub.id, value: sub.name }))}
                    setSelected={setSelectedSubcategory}
                    placeholder='Категория'
                    save='value'
                />
            </>
        )}

        
    </View>
    );   
}
  
  const styles = StyleSheet.create({
    task:{
          paddingVertical:3,
          paddingLeft: 4,
          borderColor: 'black',
          width: '100%',
          borderWidth: 2,
          backgroundColor: '#801EFF',
          fontSize: 14,
          
    },
    label:{
          color: 'white',
    }
  })
  

/**
 *     <SelectList 
            setSelected={(val) => setSelectedCategory(val)} 
            onSelect={()=>console.log(selected)}
            data={categories} 
            save="value"
            placeholder='Категория'
        />
 * 

    const handleCategoryChange = (categoryName) => {
        setSelectedCategory(categoryName);
        const category = categories.find(cat => cat.name === categoryName);
        setSubcategories(category ? category.subcategories : []);
    };
 * 
 * useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.key === selectedCategory);
      if (category && category.subcategories) {
        setSubcategories(category.subcategories.map(subcat => ({ key: subcat.name, value: subcat.name })));
      }
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);
 * 
 * 
 * 
 *         <SelectList 
            data={categories}
            setSelected={handleCategoryChange}
        />
        
        {subcategories.length > 0 && (
            <>
                <Text>Select SubCategory:</Text>
                <SelectList 
                    data={subcategories.map(sub => ({ key: sub.id, value: sub.name }))}
                    setSelected={setSelectedSubcategory}
                />
            </>
        )}
 * 
 * 
 */
  

/**
 * return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <Text style={styles.label}> Област: {item.key} </Text>
              
            </View>
          )}
        />
      </View>
    )
 * 
 * 
 * import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';

const CategorySelector = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    useEffect(() => {
        // Fetch categories from Django API
        fetch('http://your-django-api-url/categories/')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        const category = categories.find(cat => cat.id === categoryId);
        setSubcategories(category ? category.subcategories : []);
    };

    return (
        <View>
            <Text>Select Category:</Text>
            <SelectList 
                data={categories.map(cat => ({ key: cat.id, value: cat.name }))}
                setSelected={handleCategoryChange}
            />
            
            {subcategories.length > 0 && (
                <>
                    <Text>Select SubCategory:</Text>
                    <SelectList 
                        data={subcategories.map(sub => ({ key: sub.id, value: sub.name }))}
                        setSelected={setSelectedSubcategory}
                    />
                </>
            )}
        </View>
    );
};

export default CategorySelector;

 * @returns 
 */


function OLDCategorySelector(){
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    axios.get('http://192.168.1.110:8000/mobile/task-categories/')
      .then(response => {
        data = response.data
        console.log('RESPONSE DATA:',data)
        parsed = JSON.parse(data)
        console.log('JSON PARSED:',parsed)
        //setCategories(data)
        //const filteredCategories = response.data.filter(category => category.subcategories.length > 0);
        // setCategories(data.map(cat => ({
        //       key: cat.name, 
        //       value: cat.name, 
        //       subcategories: cat.subcategories })));
        // 
        //console.log(categories)
        })
      .catch(error => {
        console.error(error);
      });
  }, []);

//   useEffect(() => {
//     if (selectedCategory) {
//       const category = categories.find(cat => cat.key === selectedCategory);
//       if (category && category.subcategories) {
//         setSubcategories(category.subcategories.map(subcat => ({ key: subcat.id, value: subcat.name })));
//       }
//     } else {
//       setSubcategories([]);
//     }
//   }, [selectedCategory, categories]);

  return (
    <View>
      <Text>Select a category:</Text>
      {/* <SelectList
        setSelected={(val) => setSelectedCategory(val)}
        data={categories}
        placeholder="Select a category"
      /> */}

      
    </View>
  );
};

{/* {subcategories.length > 0 && (
        <>
          <Text>Select a subcategory:</Text>
          <SelectList
            setSelected={setSelectedSubcategory}
            data={subcategories}
            placeholder="Select a subcategory"
          />
        </>
      )} */}
