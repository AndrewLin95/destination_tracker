<script lang="ts">
  import axios from "axios";

  export default {
    name: "LoginView",
    data () {
      return {
        signUpToggle: false as boolean,

        loginEmail: "" as string,
        loginPassword: "" as string,
        loginValidation: false as boolean,

        signupFirstName: "" as string,
        signupLastName: "" as string,
        signupEmail: "" as string,
        signupPassword: "" as string,
        signupValidation: false as boolean,
      }
    },
    methods: {
      handleSignUpToggle(boolState: boolean) {
        this.signUpToggle = boolState;
      },
      async handleLogin() {
        const loginObject = {
          username: this.loginEmail,
          password: this.loginPassword,
        }
      
        try {
          const response = await axios.post("/api/log-in", loginObject) 
          console.log(response);
        } catch (err) {
          console.log(err);
        }

      }
    },
  }
</script>

<template>
  <div className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
    <div className="h-5/12 w-1/5 flex flex-col py-12 px-8 border border-blue-200">
      <div v-if="!signUpToggle" className="flex justify-center text-5xl"> Welcome </div>
      <div v-else className="flex justify-center text-5xl"> Sign Up </div>
      <div className="flex w-full h-auto justify-center my-4">
        <img alt="Destination Tracker Logo" src="../assets/destination.png" className="h-32 w-32 my-12">
      </div>
      <!-- Login -->
      <div v-if="!signUpToggle" className="w-full">
        <input className="w-full my-2 p-2"
          placeholder="Email"
          type="email"
          v-model="loginEmail"
        />
        <input className="w-full my-2 p-2" 
          placeholder="Password"
          type="password"
          v-model="loginPassword"
        />
        <button className="mt-4 w-full"
          @click="handleLogin()"
        >
          Login
        </button>
        <div className="flex justify-center pt-3">
          Don't have an account? &nbsp; 
          <span className="font-bold text-blue-300"
            @click="handleSignUpToggle(true)"
          >
            Sign Up
          </span>
        </div>
      </div>
      <!-- Signup -->
      <div v-else className="w-full">
        <div className="flex flex-row justify-around">
          <input className="w-[50%] my-2 p-2 mr-2"
            placeholder="First Name"
            v-model="signupFirstName"
          />
          <input className="w-[50%] my-2 p-2"
            placeholder="Last Name"
            v-model="signupLastName"
          />
        </div>
        <input className="w-full my-2 p-2"
          placeholder="Email"
          type="email"
          v-model="signupEmail"
        />
        <input className="w-full my-2 p-2" 
          placeholder="Password"
          type="password"
          v-model="signupPassword"
        />
        <button className="mt-2 w-full">
          Sign Up
        </button>
        <div className="flex justify-center pt-3">
          Already have an account? &nbsp;
          <span className="font-bold text-blue-300"
            @click="handleSignUpToggle(false)"
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  </div>
</template>