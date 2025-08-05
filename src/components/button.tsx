import { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>
    );
}
export default Button;