import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom'

const NavBar = () => {
  const user = useSelector((store) => store.user)
  console.log(user)

  return (
    <>
      <div class="navbar bg-base-300 shadow-sm">
        <div class="flex-1">
          <Link to="/" class="btn btn-ghost text-xl">DevTinder </Link>
        </div>
        {user &&
          <div class="flex gap-2">
            <div class="dropdown dropdown-end mx-5 flex">
              <p className="px-4">Welcome, {user.firstName}</p>
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to='/profile' class="justify-between">
                    Profile
                    <span class="badge">New</span>
                  </Link>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>

          </div>
        }
      </div>
    </>
  )
}

export default NavBar;