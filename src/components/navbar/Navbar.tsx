import React from 'react'
import { icons } from 'src/assets/navbar'
import { NavLink } from 'react-router-dom'


function Navbar() {
  const navbarIcon = [
    { id: 'Home', link: '/', fill: icons.homeActive, empty: icons.home },
    { id: 'Knit', link: '/feed', fill: icons.knitActive, empty: icons.knit },
    { id: 'Board', link: '/board', fill: icons.boardActive, empty: icons.board },
    { id: 'MyPage', link: '/my-page', fill: icons.myPageActive, empty: icons.myPage },
  ]

  const navbarBtns = navbarIcon.map((icon) => {
    return (
      <NavLink
        key={icon.id}
        to={icon.link}>
        {
          ({ isActive }) => (
            isActive ?
              <div className="flex h-[2.875rem] w-[2.25rem] flex-col items-center gap-[0.35rem]">
                <img src={icon.fill} alt="" />
                <p className='text-[0.625rem] font-semibold text-green-50'>{icon.id}</p>
              </div>
              :

              <img src={icon.empty} alt="" />
          )
        }
      </NavLink >
    )
  })


  return (
    <div className="fixed inset-x-0 bottom-0 flex h-[7.5rem] w-screen items-center justify-evenly border-t-[0.0313rem] bg-white align-middle">
      {navbarBtns}
    </div>

  )
}

export default Navbar