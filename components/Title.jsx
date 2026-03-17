import * as React from 'react';
import { Text  } from 'react-native';

export default function Title({text}){
    return(

            <Text style={{
                    fontSize:50, 
                    backgroundColor:'red', 
                    color:"white",
                    fontWeight:'bold'
                }}
            >
                {text}
            </Text>
    )
}
