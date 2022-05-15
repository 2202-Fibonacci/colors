import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput} from "react-native";
import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql `
    mutation SignupMutation(
        $email:String!
        $password:String!
        $username:String!
    ) {
        signup(
            email: $email
            password: $password
            username: $username
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
        login(email: $email, password: $password){
            token
        }
    }
`;

const Login = () => {
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        username: ''
    });

    return (
        <View style={styles.container}>
                {!formState.login ? <Text>Login</Text> : <Text>Sign Up</Text>}
                {formState.login ? (
                    <TextInput
                        value={formState.username}
                        onChange={(e) => 
                            setFormState({
                                ...formState,
                                username: e.target.value
                            })
                        }
                        placeholder='Username'
                    />
                ) : null }
                <TextInput 
                    value = {formState.email}
                    onChange= {(e)=> 
                        setFormState({
                            ...formState,
                            email: e.target.value
                        })
                    }
                    placeholder='email'
                />
                <TextInput
                    value={formState.password}
                    onChange={(e)=>
                        setFormState({
                            ...formState,
                            password: e.target.value
                        })
                    }
                    placeholder='password'
                />
            <Pressable>
                {formState.login ? <Text>login</Text> : <Text>create an account</Text>}
            </Pressable>
            <Pressable onPress={() =>
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
    //   alignItems: "center",
      justifyContent: "flex-end",
      padding:100,
    },
  });

export default Login;

