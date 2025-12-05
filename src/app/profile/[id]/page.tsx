export default async function UserProfile({params}: any) {
    const {id} = await params
    return (
        <div className="flex flex-col min-h-screen justify-center items-center py-2 bg-gray-800">
            <h1 className="text-white text-5xl font-bold mb-15">Profile Page</h1>
            <hr />
            <p className="text-2xl text-gray-300">My Profile Page : {id}</p>

        </div>
    )
}