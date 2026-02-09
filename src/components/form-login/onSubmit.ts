import z from "zod";
import { signInSchema } from "../forms-vadations";


type signInFormData = z.infer<typeof signInSchema>;

export const onSubmit = async (data: signInFormData) => {


    try {

        const { password, email } = data




        if (password && email) {

            console.log(data)



            return
        }


        //reset();

    } catch (error) {



    }
};