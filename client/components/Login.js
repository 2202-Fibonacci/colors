import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput} from "react-native";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import * as SecureStore from 'expo-secure-store';
import AUTH_TOKEN from "../../constants"
// import 'dotenv/config' => this causes error with 'fs'



const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
        $email:String!
        $password:String!
        $username:String!
    ) {
        signup(
            email: $email,
            password: $password,
            username: $username,
        ) {
            token
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email, 
            password: $password
        ){
            token
        }
    }
`;

const Login = () => {
    const client = useApolloClient()
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        username: ''
    });

    async function login ({email, password} ){
        try {
            const res = await client.mutate({
            mutation:LOGIN_MUTATION,
            variables:{
                email, password
            }
        })
        console.log('logged in!')
        await SecureStore.setItemAsync("key", res.data.signup.token);
        }catch (e){
            console.log(e)
        }
    }

    async function signup ({username, email, password} ){
        try {
            const res = await client.mutate({
            mutation:SIGNUP_MUTATION,
            variables:{
                username, email, password
            }
        })
        await SecureStore.setItemAsync("key", res.data.signup.token);
        console.log('signed up!')
        }catch (e){
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{fontSize: "50", fontWeight: "bold"}}>
                {formState.login ? <Text>Login</Text> : <Text>Sign Up</Text>}
            </View>
                {!formState.login ? (
                    <TextInput
                        value={formState.username}
                        onChangeText={(username) => 
                            // console.log(e.nativeEvent.text, e.target.value) || 
                            setFormState({
                                ...formState,
                                username
                            })
                        }
                        placeholder='Username'
                    />
                ) : null }
                <TextInput 
                    value = {formState.email}
                    onChangeText= {(email)=> 
                        setFormState({
                            ...formState,
                            email
                        })
                    }
                    placeholder='email'
                />
                <TextInput
                    value={formState.password}
                    onChangeText={(password)=>
                        setFormState({
                            ...formState,
                            password
                        })
                    }
                    placeholder='password'
                />
            <Pressable style={{backgroundColor: "powderblue", padding:3, borderRadius: 10}}
                onPress={
                    async ()=>
                        {
                            try {
                                await formState.login ? login : signup(        
                                    {
                                        username: formState.username,
                                        email: formState.email,
                                        password: formState.password
                                    }
                                )
                            } catch (e) {
                                console.log('mutation error')
                                console.error(e)
                            } 
                }}>
                {formState.login ? <Text>login</Text> : <Text>create account</Text>}

            </Pressable>
            <Pressable style={{backgroundColor:  "steelblue", padding:3, borderRadius: 10}} onPress={() =>
                    setFormState({
                        ...formState,
                        login: !formState.login
                    })
                }
            >
                    {formState.login
                        ? <Text>need to create an account?</Text>
                        : <Text>already have an account?</Text>}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      color: "#00ffff",
      margin: "0%",
      justifyContent: "space-evenly",
      padding:100,
    },
  });

export default Login;

