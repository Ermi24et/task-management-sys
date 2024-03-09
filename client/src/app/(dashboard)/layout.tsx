import React from "react";
import {TaskProvider} from "@/contexts/useTask";
import { Toaster } from "@/components/ui/toaster"

const AppLayout = ({ children }: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="">
            {/*<Navigation user={user} />*/}
            <TaskProvider>
                <main>{children}</main>
                <Toaster />
            </TaskProvider>
        </div>
    )
}

export default AppLayout