import z from "zod";
import { registerSchema } from "../forms-vadations";
import axios from "axios";


type registerFormData = z.infer<typeof registerSchema>;

export const onSubmit = async (data: registerFormData) => {


    try {

        const { password, email } = data

        const post = await axios({
            method: "POST",
            url: "/api/auth/register",
            data
        });

        console.log(post)


        if (password && email) {

            //console.log(data)

            return
        }


        //reset();

    } catch (error) {

console.log(error)

    }
};