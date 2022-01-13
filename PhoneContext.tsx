import React from "react";

export type defaultContext = {
    phoneNumber: string | undefined
    setPhoneNumber?: (num: string | undefined) => void
}

export const PhoneContext = React.createContext<defaultContext>({phoneNumber: undefined});

export default PhoneContext;