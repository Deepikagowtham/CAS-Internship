export default function LoginPage() {
    return(
        <>
        <div className="login-page bg-pink-600 text-pink-200 p-3 m-2.5 w-[50vw] h-[50vh]">
            <div className="flex flex-col justify-center items-center">
            <label className="block ">Username</label>
            <input className="m-1 bg-amber-50 p-0.5 " type="text"/><br/>
            </div>
            <div className="flex flex-col justify-center items-center">
            <label className="block ">Password</label>
            <input className="m-1 bg-amber-50 p-0.5 " type="text"/>
            </div>      
            </div>
        </>
    )
}