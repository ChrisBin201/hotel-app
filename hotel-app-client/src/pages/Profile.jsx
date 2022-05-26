
export default function Profile() {

  return (
    <div className="flex" >
      <div className="flex w-full md:w-1/2 px-2 m-auto">
        <div className="flex w-full flex-col rounded shadow-lg p-4">
          <form><div className="flex flex-wrap">
            <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
              <label for="company">Company</label>
              <input className="my-1 p-2 rounded bg-gray-200" type="text" id="company" placeholder="NothingWorks Inc" value="NothingWorks Inc." />
            </div>
            <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
              <label for="title">Title</label>
              <input className="my-1 p-2 rounded bg-gray-200" type="text" id="title" placeholder="Developer" value="Developer" />
            </div>
          </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
                <label for="username">User Name</label>
                <input className="my-1 p-2 rounded bg-gray-200" type="text" id="username" placeholder="@adamwathan" value="@adamwathan" />
              </div>
              <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
                <label for="email">Email</label>
                <input className="my-1 p-2 rounded bg-gray-200" type="text" id="email" placeholder="example@domain.com" value="example@domain.com" />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
                <label for="firstName">First Name</label>
                <input className="my-1 p-2 rounded bg-gray-200" type="text" id="firstName" placeholder="Adam" value="Adam" />
              </div>
              <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
                <label for="lastName">Last Name</label>
                <input className="my-1 p-2 rounded bg-gray-200" type="text" id="lastName" placeholder="Wathan" value="Wathan" />
              </div>
            </div>
            
            <button type="submit" className="rounded-full py-2 px-4 text-md border-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  )
}