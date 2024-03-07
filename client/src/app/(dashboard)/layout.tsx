import React from "react";
import {TaskProvider} from "@/contexts/useTask";

const AppLayout = ({ children }: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="">
            {/*<Navigation user={user} />*/}
            <TaskProvider>
                <main>{children}</main>
            </TaskProvider>
        </div>
    )
}

export default AppLayout