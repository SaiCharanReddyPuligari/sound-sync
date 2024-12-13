"use client";

import { SessionProvider } from "next-auth/react";

//when using themese, recoil , we wrap content in Sesstion Providers
//we can ideally do this in layout but it has to be client component
//so rather then rendering layout everytime, we just create an extra file
export function Providers({children}: {children: React.ReactNode}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}